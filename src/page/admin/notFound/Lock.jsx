import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Look.scss';

const Lock = () => {
  const navigate = useNavigate();
  var scene = document.getElementById('scene');

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 10000);
  }, []);
  return (
    <div>
      <nav>
        <div className='menu'>
          {/* <p className='website_name'>LOGO</p> */}
          <div className='menu_links'>
            <a href='' className='link'>
              about
            </a>
            <a href='' className='link'>
              projects
            </a>
            <a href='' className='link'>
              contacts
            </a>
          </div>
          <div className='menu_icon'>
            <span className='icon'></span>
          </div>
        </div>
      </nav>

      <section className='wrapper'>
        <div className='container'>
          <div id='scene' className='scene' data-hover-only='false'>
            <div className='circle' data-depth='1.2'></div>

            <div className='one' data-depth='0.9'>
              <div className='content'>
                <span className='piece'></span>
                <span className='piece'></span>
                <span className='piece'></span>
              </div>
            </div>

            <div className='two' data-depth='0.60'>
              <div className='content'>
                <span className='piece'></span>
                <span className='piece'></span>
                <span className='piece'></span>
              </div>
            </div>

            <div className='three' data-depth='0.40'>
              <div className='content'>
                <span className='piece'></span>
                <span className='piece'></span>
                <span className='piece'></span>
              </div>
            </div>

            {/* <p className='p404' data-depth='0.50'>
              500
            </p>
            <p className='p404' data-depth='0.10'>
              500
            </p> */}
          </div>

          <div className='text'>
            <article>
              <p>Công ty của bạn tạm thời bị khóa . </p> <br />
              <p>vui lòng đăng nhập lại sau!</p>
              <button
                onClick={() => {
                  navigate('/login');
                }}
              >
                {' '}
                login
              </button>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lock;
