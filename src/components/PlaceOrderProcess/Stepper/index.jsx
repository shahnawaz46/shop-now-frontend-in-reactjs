import React from 'react';

// components
import './style.css';
import { MdOutlineDone } from 'react-icons/md';

const Stepper = ({ data, currentStep }) => {
  return (
    <div className='stepper_container'>
      {data.map((item, index) => (
        <div
          key={index}
          className='stepper_process'
          style={{ width: index + 1 === data.length ? '32px' : '100%' }}
        >
          <div style={{ position: 'relative' }}>
            <div
              className='stepper_number'
              style={{
                backgroundColor:
                  currentStep > index + 1
                    ? '#3ec43e'
                    : currentStep == index + 1
                    ? '#60A5FA'
                    : '#a9cdf9',
              }}
            >
              {currentStep > index + 1 ? <MdOutlineDone /> : index + 1}
            </div>
            <span className='stepper_title'>{item.title}</span>
          </div>
          {index + 1 !== data?.length && (
            <div className='stepper_progress_bar'>
              <div
                className='stepper_progress'
                style={{ width: currentStep > index + 1 ? '100%' : 0 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
