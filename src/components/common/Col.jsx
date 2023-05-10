import React from 'react';

const Col = (props) => {
  return (
    <div className={`col-${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Col;
