// components
import './style.css';
import { MdOutlineDone } from 'react-icons/md';
import { ISteeperItem } from '../../../types/interfaces';

interface IStepper {
  data: ISteeperItem[];
  currentStep: number;
}

const Stepper = ({ data, currentStep }: IStepper) => {
  return (
    <div className="stepper_container">
      {data.map((item, index) => (
        <div
          key={item.id}
          className="stepper_process"
          style={{ width: index + 1 === data.length ? '32px' : '100%' }}
        >
          {/* circle */}
          <div style={{ position: 'relative' }}>
            <div
              className="stepper_number"
              style={{
                backgroundColor:
                  currentStep > index + 1
                    ? '#3ec43e'
                    : currentStep == index + 1
                    ? 'var(--tertiary-color)'
                    : '#a9cdf9',
              }}
            >
              {currentStep > index + 1 ? <MdOutlineDone /> : index + 1}
            </div>
            <span className="stepper_title">{item.title}</span>
          </div>

          {/* progress line */}
          {index < data?.length - 1 && (
            <div className="stepper_progress_bar">
              <div
                className="stepper_progress"
                style={{
                  transform:
                    currentStep > index + 1
                      ? 'translate(0)'
                      : 'translate(-100%)',
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
