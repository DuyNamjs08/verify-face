import React from 'react';

export const Section = (props) => {
  return (
    <div className={`section ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};
