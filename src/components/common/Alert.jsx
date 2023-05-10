import React from 'react';
import { SuccessIcon } from '../icon/SuccessIcon';
import { CloseIcon } from '../icon/CloseIcon';
import {IoIosWarning} from "react-icons/io";
const Alert = ({ msg, type }) => {

  const bgStatus = (type) => {
    if(type === 'success'){
      return `bg-success-call`
    }
    if(type === 'error'){
      return `bg-error-call`
    }
    if(type === 'warning'){
      return `bg-warning`
    }
  }

  return (
    <div className={`alert ${bgStatus(type)}`}>
      <div className="notification-image">
        {
          type === 'success' &&  <SuccessIcon />
            
        }
        {
          type === 'error' &&  <CloseIcon />
        }
        {
          type === 'warning' &&  <IoIosWarning />
        }

      </div>
     
        
        <p className="text-message">{msg}</p>
     
    </div>
  );
};

export default Alert;
