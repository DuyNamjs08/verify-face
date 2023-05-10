import React, { useEffect, useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { useOnOutsideClick } from '../../hooks/use-outside';
const CustomSelect = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    props.options?.find((v) => v.value === props?.defaultValue) || null
  );

  const { innerBorderRef } = useOnOutsideClick(() => setIsOpen(false));

  const handleSelected = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
    props.handleChange(props?.name, value?.value);
  };

  useEffect(() => {
    if (props.defaultValue && selectedOption) {
      props.handleChange(props?.name, selectedOption?.value);
    }
  }, [props.defaultValue]);

  useEffect(() => {
    if (props?.filter === 'object' && Object?.keys(props?.filter)?.length) {
      setSelectedOption(props?.label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.filter]);

  if (props?.isGroup === true) {
    return (
      <div className='form-input-group'>
        {props.label ? <p>{props?.label}</p> : null}
        <div className={`custom-select-drp ${props.className} ${isOpen ? 'open' : ''} `} onClick={() => setIsOpen(!isOpen)}>
          <span className='cus-icon-select'>{!isOpen ? <BiChevronDown /> : <BiChevronUp />}</span>
          <span className='select-box'>{selectedOption?.label || props.label}</span>

          <ul className='drp-list'>
            {props.options.map((option, index) => {
              return (
                <li className='active' key={index} onClick={() => handleSelected(option)}>
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`custom-select-drp ${props.className} ${isOpen ? 'open' : ''} `} onClick={() => setIsOpen(!isOpen)}>
        <span className='cus-icon-select'>{!isOpen ? <BiChevronDown /> : <BiChevronUp />}</span>
        <span className='select-box'>{selectedOption?.label || props.label}</span>

        <ul className='drp-list' ref={innerBorderRef}>
          {props.options.map((option, index) => {
            return (
              <li className='active' key={index} onClick={() => handleSelected(option)}>
                {option.label}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default CustomSelect;
