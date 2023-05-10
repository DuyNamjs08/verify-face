import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { showMessageSuccess } from '../../features/alert/alert-message';
import { selectfunction } from '../../features/diglog/diglog';
import Button from './Button';

const Modan = (props) => {
  const { deleteClient, setActive } = props;
  const dispatch = useDispatch();
  const functiondelete = useSelector(selectfunction);
  console.log('functiondelete', functiondelete);
  const handleCreateClient = () => {
    deleteClient();
  };

  return (
    <div className='content'>
      <div>Bạn có muốn xóa hay không</div>
      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'row-reverse', gap: '10px' }}>
        <Button className='bg-theme' onClick={handleCreateClient}>
          xóa
        </Button>
        <Button
          className='bg-theme'
          onClick={() => {
            setActive(false);
          }}
        >
          hủy
        </Button>
      </div>
    </div>
  );
};

export default Modan;
