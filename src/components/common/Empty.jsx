import React from 'react';
import Heading from './Heading';
import { BiFileFind } from 'react-icons/bi';
const Empty = (props) => {
  return (
    <div className='empty text-center'>
      <BiFileFind />
      <Heading type='h2'>{props.description}</Heading>
    </div>
  );
};

export default Empty;
