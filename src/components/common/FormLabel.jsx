import React from 'react';

const FormLabel = ({ ...props }) => {
  return (
    <p className='label-name' style={props.style}>
      {props.label}
      {props.children}
      {props.required && <span className='text-red-400 font-bold text-lg'> *</span>}
    </p>
  );
};

export default FormLabel;
