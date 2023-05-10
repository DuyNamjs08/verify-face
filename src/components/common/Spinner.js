import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loaddingLogin } from '../../features/login/authSlice';

const Spinner = ({ heading }) => {
  // const [loading, setLoadding] = useState('false');
  const loginLoadding = useSelector(loaddingLogin);
  // useEffect(() => {
  //   function checkUserData() {
  //     const loading123 = localStorage.getItem('loadding');

  //     if (loading123) {
  //       setLoadding(loading123);
  //     }
  //   }

  //   window.addEventListener('storage', checkUserData);

  //   return () => {
  //     window.removeEventListener('storage', checkUserData);
  //   };
  // }, []);

  const loading =
    loginLoadding
  return (
    <div
      id='upload-loading'
      className='loading'
      style={{
        display: `${loading === false ? 'none' : 'flex'}`,
        top: '50vh',
        backgroundColor: 'gray',
        zIndex: '20000',
        opacity: '0.5',
        position: 'fixed',
      }}
    >
      <div className='box-text-loading'>
        {heading && (
          <h3 className='title text-center' style={{ fontSize: 28 }}>
            {heading}
          </h3>
        )}
        <i style={{ marginTop: 50 }} className='spinning-loader'></i>
      </div>
    </div>
  );
};

export default Spinner;
