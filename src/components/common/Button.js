import React, { useRef } from 'react';

const Button = (props) => {
  const btnRef = useRef();

  // useEffect(() => {
  //   const btnWidth = btnRef.current.clientWidth + 29;
  //   btnRef.current.style.width = btnWidth + 'px';
  // }, []);

  return (
    <button disabled={props.disabled} type={props.type} ref={btnRef} className={`btn ${props.className}`} style={props.style} onClick={props.onClick} onBlur={props.onBlur}>
      {props.icon && (
        <span className={`spinner ${props.loading ? 'active' : ''}`}>
          <svg className='animate-spin h-5 w-5 mr-3 ...' viewBox='0 0 24 24'></svg>
        </span>
      )}

      {props.children}
    </button>
  );
};

export default Button;
