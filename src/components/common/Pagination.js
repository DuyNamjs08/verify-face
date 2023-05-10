import React from 'react';
import cx from 'classnames';
import FormSelect from './FormSelect';
import { Link } from 'react-router-dom';
export function noop() {}

export const Pagination = ({
  currentPage,
  lastPage,
  selector,
  pageSize,
  onChangePage,
  onChangePageSize,
  pageSizeOptions = [10, 15, 100],
  hideIfSinglePage = true,
  onGoToLast = noop,
  isFetching,
  ...divProps
}) => {
  const [lastSelected, setLastSelected] = React.useState(null);

  if (hideIfSinglePage && lastPage <= 1) {
    return null;
  }

  const goNext = () => {
    onChangePage(currentPage + 1);
    setLastSelected('next');
    if (disableNext) {
      onChangePage(currentPage);
    }
  };
  const disableNext = currentPage === lastPage;
  const goPrev = () => {
    onChangePage(currentPage - 1);
    setLastSelected('prev');
    if (disablePrev) {
      onChangePage(currentPage);
    }
  };
  const disablePrev = currentPage <= 1;
  return (
    <div className='custom-pagination'>
      {!selector && (
        <div className='d-flex justify-content-between align-items-center'>
          {/* <span style={{ minWidth: '150px' }}> Số bản ghi hiển thị:</span> */}
          {/* <FormSelect
            size='xs'
            className='form-control'
            // value="last-week"
            style={{ width: '70px', height: '40px', marginLeft: 10 }}
            value={pageSize}
            onChange={(e) => {
              onChangePageSize(parseInt(e.target.value));
              setLastSelected(null);
            }}
          >
            {pageSizeOptions.map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </FormSelect> */}
        </div>
      )}

      <nav aria-label='Page navigation example' style={{ marginTop: '5px' }}>
        <ul className='pagination justify-content-last'>
          <li
            className={cx('page-item text-secondary', disablePrev ? 'disabled' : '')}
            role={disablePrev ? '' : 'button'}
            onClick={() => {
              onChangePage(1);
              setLastSelected('first');
            }}
          >
            <Link className='page-link' aria-label='Previous'>
              <span aria-hidden='true'>&laquo;</span>
              <span className='sr-only'>Previous</span>
            </Link>
          </li>
          <li className={cx('page-item text-secondary', disablePrev ? 'disabled' : '')} onClick={goPrev} role='button'>
            <Link className='page-link' aria-label='Previous'>
              <span aria-hidden='true'>&lsaquo;</span>
              <span className='sr-only'>Previous</span>
            </Link>
          </li>

          {getPageOptions(currentPage, lastPage).map((page) => (
            <li
              onClick={() => {
                if (page !== currentPage) {
                  onChangePage(page);
                  setLastSelected(page);
                }
              }}
              className={`page-item page-link text-secondary ${page === currentPage ? 'active-pages' : undefined}`}
              // isLoading={isFetching && lastSelected === page}

              key={page}
            >
              <Link style={{ color: page === currentPage && '' }}>
                {page}
              </Link>
            </li>
          ))}
          <li
            className={cx('page-item text-secondary', disableNext ? 'disabled' : '')}
            role={disableNext ? '' : 'button'}
            onClick={goNext}
          >
            <Link className='page-link' aria-label='Next'>
              <span aria-hidden='true'>&rsaquo;</span>
              <span className='sr-only'>Next</span>
            </Link>
          </li>
          <li
            className={cx('page-item text-secondary', disableNext ? 'disabled' : '')}
            role={disableNext ? '' : 'button'}
            onClick={() => {
              onGoToLast();
              setLastSelected('last');
            }}
          >
            <Link className='page-link' aria-label='Next'>
              <span aria-hidden='true'>&raquo;</span>
              <span className='sr-only'>Next</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 150];

const MAX_OPTIONS_COUNT = 5;

const mapOption = (_, index) => index + 1;
const half = Math.floor(MAX_OPTIONS_COUNT / 2);

const getPageOptions = (current, max) => {
  if (max <= MAX_OPTIONS_COUNT) {
    return createArray(max).map(mapOption);
  }

  if (current <= MAX_OPTIONS_COUNT - half) {
    return createArray(MAX_OPTIONS_COUNT).map(mapOption);
  }

  if (max - current <= half) {
    return createArray(MAX_OPTIONS_COUNT)
      .map((_, index) => max - index)
      .reverse();
  }

  return createArray(MAX_OPTIONS_COUNT).map((_, index) => current + index - half);
};

const createArray = (length, filler) => {
  const result = [];
  for (let index = 0; index < length; index++) {
    result.push(filler);
  }
  return result;
};
