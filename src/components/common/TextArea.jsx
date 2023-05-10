import React, { forwardRef } from 'react';
import ErrorText from './ErrorText';

const TextArea = forwardRef(
  ({ className, onBlur, handleChange, error, label, type, required, minRows = 2, ...otherProps }, ref) => {
    return (
      <div className={`form-input-group ${className}`} style={otherProps.style}>
        {label ? (
          <p>
            {label}
            <span className='text-red-400 font-bold text-lg'>{required && '*'}</span>
          </p>
        ) : null}
        <textarea
          className='form-control textarea'
          minRows={minRows}
          onChange={handleChange}
          onBlur={onBlur}
          {...otherProps}
          ref={ref}
          type={type}
        />
        {error ? <ErrorText>{error}</ErrorText> : null}
      </div>
    );
  }
);

export default TextArea;
