
import * as React from 'react';

export function HelpText(props) {
  const { status } = props;
  return (
    <span
      {...props}
      className={`text-sm font-normal leading-4 ${status ? colorByStatus[status] : ''}`}
    />
  );
}

const colorByStatus = {
  error: 'text-red-400',
  warning: 'text-yellow-800',
  success: 'text-success-800'
};
