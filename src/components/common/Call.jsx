import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { showMessageError } from '../../features/alert/alert-message';
import { selectStatusCall, startCall } from '../../features/call/callSlice';
const Call = (props) => {
  const dispatch = useDispatch();
  const statusCall = useSelector(selectStatusCall);

  const handleCall = (phone) => {
    if (statusCall.registered === 'unregistered') {
      setTimeout(() => {
        dispatch(showMessageError('Chưa kết nối đến tổng đài'));
      }, 500);
      return;
    }
    if (phone) {
      dispatch(startCall(phone));
    }
  };
  return (
    <>
      <div style={props.style} onClick={() => handleCall(props.phone)} data-tip={props.tooltip}>
         {props.children}
      </div>
      <ReactTooltip />
    </>
  );
};

export default Call;
