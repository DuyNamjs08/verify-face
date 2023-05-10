import React, { forwardRef } from 'react';
import Select from 'react-select';
const CustomReactSelect = forwardRef(
  (
    {
      className,
      isGroup,
      styleInput,
      style,

      onChange,
      label,

      required,
      ...otherProps
    },
    ref
  ) => {
    
    if (isGroup === false) {
      return <Select className='form-control' onChange={onChange} {...otherProps} ref={ref} />;
    } else {
      return (
        <div className={`form-input-group ${className}`} style={{ position: 'relative', ...style }}>
          {label ? (
            <p>
              {label}
              <span className='text-red-400 font-bold text-lg'>{required && ' *'}</span>
            </p>
          ) : null}

          <Select className='form-control' styles={{ ...styleInput }} onChange={onChange} {...otherProps} ref={ref} />
        </div>
      );
    }
  }
);

export default CustomReactSelect;
