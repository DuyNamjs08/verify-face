import { useState, useEffect } from 'react';
import { FaAngleDown } from 'react-icons/fa';
const Accordion = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (props.open) {
      setActive(props.open);
    }
  }, [props.open]);

  return (
    <div className={`accordion ${active ? 'active' : ''}`}>
      <h2 className='title accordion__title' onClick={() => setActive(!active)}>
        {props.icontitle}
        <span>{props.title}</span>
        <div className='accordion__icon'>
          <FaAngleDown />
        </div>
      </h2>
      {active && <div className='accordion__content'>{props.content}</div>}
    </div>
  );
};

export default Accordion;
