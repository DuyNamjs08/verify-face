import React from 'react';

const FormSelect = ({ ...props }) => {
  return (
    <select
      size={props.size}
      className={props.className}
      value={props.value}
      onChange={props.onChange}
      style={props.style}
    >
      {props.children}
    </select>
  );
};

export default FormSelect;
