import React, { useEffect, useState, useRef } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { useOnOutsideClick } from '../../hooks/use-outside';
import FormCheckBox from './FormCheckBox';
const CustomSelectMultiColor = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [active, setActive] = useState(false);
  const { innerBorderRef } = useOnOutsideClick(() => setIsOpen(false));

  const arrList = useRef();

  const handlnCheckBox = async (e) => {
    if (e.currentTarget.checked) {
      const arr = await arrList.current;
      await arr.push(e.target.name);

      arrList.current = arr;
      setActive(!active);
      props.handleChange(props?.name, arrList.current);
    } else {
      const arr = await arrList.current;
      await arr?.splice(arrList.current.indexOf(e.target.name), 1);
      arrList.current = arr;
      setActive(!active);
      props.handleChange(props?.name, arrList.current);
    }
  };

  useEffect(() => {
    arrList.current = [];
  }, []);

  if (props?.isGroup === true) {
    return (
      <div className='form-input-group'>
        {props.label ? <p>{props?.label}</p> : null}
        <div className={`custom-select-drp ${props.className} ${isOpen ? 'open' : ''} `} onClick={() => setIsOpen(true)}>
          <span className='cus-icon-select'>{!isOpen ? <BiChevronDown /> : <BiChevronUp />}</span>
          <span className='select-box'>{selectedOption?.label || props.label}</span>

          <ul className='drp-list' ref={innerBorderRef}>
            {props.options?.map((option, index) => {
              return (
                <li className='active' key={index}>
                  <FormCheckBox
                    pos={'left'}
                    name={option?.value}
                    onChange={handlnCheckBox}
                    checked={arrList?.current?.includes(option?.value) || false}
                    label={
                      <>
                        <div className='swatch' style={{ verticalAlign: 'middle' }}>
                          <div
                            className='swatch-color'
                            style={{
                              background: `rgba(${option?.color?.r}, ${option?.color?.g}, ${option?.color?.b}, ${option?.color?.a})`,
                            }}
                          />
                        </div>
                        {option.label}
                      </>
                    }
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
};

export default CustomSelectMultiColor;
