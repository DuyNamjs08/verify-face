import React from 'react';
import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa';
const FormCheckBox = (props) => {
  const inputRef = React.useRef(null);

  // const onChange = () => {
  //   if (props.onChange) {
  //     props.onChange(inputRef.current);
  //   }
  // };
  return (
    <label className='custom-checkbox'>
      {props.pos === 'left' && (
        <>
          <input name={props.name} type='checkbox' ref={inputRef} onChange={props.onChange} checked={props.checked} />
          <span className='custom-checkbox__checkmark'>{props.checked && <FaCheck className='bx bx-check' />}</span>
          <span>{props.label}</span>
        </>
      )}

      {props.pos === 'right' && (
        <>
          <span>{props.label}</span>
          <input name={props.name} type='checkbox' ref={inputRef} onChange={props.onChange} checked={props.checked} />
          <span className='custom-checkbox__checkmark'>{props.checked && <FaCheck className='bx bx-check' />}</span>
        </>
      )}
    </label>
  );
};

FormCheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default FormCheckBox;
