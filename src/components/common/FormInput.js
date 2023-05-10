import React, { forwardRef } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const FormInput = forwardRef(
  (
    {
      className,
      isGroup,
      styleInput,
      style,
      active,
      setActive,
      handleChange,
      label,
      type,
      bottom,
      required,
      classInput,
      ...otherProps
    },
    ref
  ) => {
    if (isGroup === false) {
      return (
        <input
          className={`form-control ${classInput}`}
          style={styleInput}
          onChange={handleChange}
          {...otherProps}
          ref={ref}
          type={type}
        />
      );
    } else {
      return (
        <div className={`form-input-group ${className}`} style={{ position: 'relative', ...style }}>
          {label ? (
            <p>
              {label}
              <span className='text-red-400 font-bold text-lg'>{required && ' *'}</span>
            </p>
          ) : null}

          {type === 'password' && (
            <>
              {active ? (
                <AiFillEye
                  style={{
                    position: 'absolute',
                    marginTop: '11px',
                    zIndex: '100',
                    right: '10px',
                    fontSize: '16px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setActive(false);
                  }}
                />
              ) : (
                <AiFillEyeInvisible
                  style={{
                    position: 'absolute',
                    marginTop: '11px',
                    zIndex: '100',
                    right: '10px',
                    fontSize: '16px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setActive(true);
                  }}
                />
              )}
            </>
          )}
          {otherProps.boxText ? (
            otherProps.boxText
          ) : (
            <input
              className={`form-control ${classInput}`}
              style={{ ...styleInput }}
              onChange={handleChange}
              {...otherProps}
              ref={ref}
              type={!active ? type : 'text'}
            />
          )}
        </div>
      );
    }
  }
);

export default FormInput;
