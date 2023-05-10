import React, { useState } from 'react';
import { AiOutlineFileExcel, AiOutlineMessage, AiOutlinePhone } from 'react-icons/ai';
import { BiMailSend, BiMessageAltDetail, BiMessageDetail } from 'react-icons/bi';
import { BsBoxArrowRight } from 'react-icons/bs';
import { HiOutlineTicket } from 'react-icons/hi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { RiUserAddLine, RiUserSharedLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { showMessageError } from '../../features/alert/alert-message';
import { selectStatusCall, startCall } from '../../features/call/callSlice';
import { active } from '../../features/diglog/diglog';
import CreateTicket from '../../page/admin/Ticket/component/createTicket';
import DiglogCreateOrderFast from '../componentConfiguration/diglogCreateOrderFast';
import DiglogSendSms from '../componentConfiguration/diglogSendSms';

const FeatureDiglog = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, listfeature, data, nameText, Component } = props;

  const [activeSendEms, setActiveSendEms] = useState(false);
  const [activeCreate, setActiveCreate] = useState(false);
  const [activeUpdateDetail, setActiveUpdateDetail] = useState(false);

  const statusCall = useSelector(selectStatusCall);

  const handleCall = (phone) => {
    if (statusCall.registered === 'unregistered') {
      setTimeout(() => {
        dispatch(showMessageError('Chưa kết nối đến tổng đài'));
      }, 500);
      return;
    }
    if (phone) {
      dispatch(startCall(phone));
    }
  };
  return (
    <div className='feature' style={{ height: `${230 - (150 - 28 * list?.length)}px` }}>
      {activeSendEms && <DiglogSendSms setActiveSendEms={setActiveSendEms} phone={data.phone} />}
      {activeCreate && <CreateTicket setActiveCreate={setActiveCreate} />}
      {activeUpdateDetail && (
        <Component setActiveUpdateDetail={setActiveUpdateDetail} id={data?.idDetail} bigData={data} />
      )}
      <div className='featureFast flex_item'>
        {listfeature.includes(1) && (
          <div className='center'>
            <AiOutlinePhone
              data-tip='gọi điện'
              className='IconFeature featurePhone'
              onClick={() => handleCall(data?.phone)}
            />
          </div>
        )}
        {listfeature.includes(2) && (
          <div className='center'>
            <AiOutlineMessage
              data-tip='nhắn tin'
              className='IconFeature '
              onClick={() => {
                setActiveSendEms(true);
              }}
            />
          </div>
        )}
        {listfeature.includes(3) && (
          <div className='center'>
            <BiMailSend data-tip='gửi mail' className='IconFeature ' />
          </div>
        )}
        {listfeature.includes(4) && (
          <div className='center'>
            <HiOutlineTicket
              data-tip='tạo ticket'
              className='IconFeature '
              onClick={() => {
                setActiveCreate(true);
              }}
            />
          </div>
        )}
        {listfeature.includes(5) && (
          <div className='center'>
            <IoNotificationsOutline data-tip='thông báo' className='IconFeature ' />
          </div>
        )}

        <ReactTooltip />
      </div>
      {list.includes(1) && (
        <div className='featureBlockChild flex_item'>
          <span>
            <BsBoxArrowRight className='IconFeature ' />
          </span>{' '}
          <span className='textFeature'>Xem chi tiết ở tab mới</span>
        </div>
      )}

      {list.includes(2) && (
        <div
          className='featureBlockChild flex_item'
          onClick={() => {
            navigate(`/admin/datalist/${data?.unique_id}`);
          }}
        >
          <span>
            <BiMessageAltDetail className='IconFeature ' />
          </span>{' '}
          <span className='textFeature'>Xem chi Tiết {nameText}</span>
        </div>
      )}

      {list.includes(3) && (
        <div
          className='featureBlockChild flex_item'
          onClick={() => {
            setActiveUpdateDetail(true);
          }}
        >
          <span>
            <RiUserAddLine className='IconFeature ' />
          </span>
          <span className='textFeature'>Cập nhật thông tin</span>
        </div>
      )}

      {list.includes(4) && (
        <div className='featureBlockChild flex_item'>
          <span>
            <RiUserSharedLine className='IconFeature ' />
          </span>
          <span className='textFeature'>Chuyển người phụ trách</span>
        </div>
      )}

      {list.includes(5) && (
        <div className='featureBlockChild flex_item'>
          <span>
            <AiOutlineFileExcel className='IconFeature ' />
          </span>
          <span className='textFeature'> Xuất file nhà nước</span>
        </div>
      )}
    </div>
  );
};
FeatureDiglog.defaultProps = {
  phone: 0,
  mail: '',
  list: [1, 2, 3, 4, 5],
  listfeature: [1, 2, 3, 4, 5],
  data: null,
  nameText: 'khách hàng',
  Component: null,
};

export default FeatureDiglog;
