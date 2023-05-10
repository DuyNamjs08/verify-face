import React, { useState, useEffect, useRef } from 'react';
import { FaExpand, FaExpandAlt, FaTimes } from 'react-icons/fa';
const Modal = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    active && (
      <>
        <div className='modal-overlay'></div>
        <div id={props.id} className={`modal-popup_style2 ${active ? 'open' : ''}`}>
          {props.children}
        </div>
      </>
    )
  );
};

export const ModalContent = (props) => {
  const [expand, setExpand] = useState(false);
  const contentRef = useRef(null);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove('active');
    if (props.onClose) props.onClose();
  };

  return (
    <div
      ref={contentRef}
      className={`popup-container pu-general ${props.className}`}
      style={{
        maxWidth: expand && 1070,
      }}
    >
      <h3 className='pu-heading'>{props.heading}</h3>
      {props.isExpand && (
        <div className='popup-expand' onClick={() => setExpand(!expand)}>
          <FaExpandAlt />
        </div>
      )}
      <div className='popup-close' onClick={closeModal}>
        <span className='fa fa-times'>
          <FaTimes style={{ color: '#fff', fontSize: 16, display: 'inline-block' }} />
        </span>
      </div>
      {props.children}
    </div>
  );
};

export default Modal;
