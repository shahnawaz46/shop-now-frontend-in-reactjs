import { ErrorMessage } from 'formik';

const FormikErrorMsg = ({ name }) => {
  return (
    <ErrorMessage name={name}>
      {(msg) => (
        <span
          style={{
            color: 'red',
            fontWeight: 'bold',
            marginTop: '5px',
            fontSize: '0.8125rem',
          }}
        >
          {msg}
        </span>
      )}
    </ErrorMessage>
  );
};

export default FormikErrorMsg;
