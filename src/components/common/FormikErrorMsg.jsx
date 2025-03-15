import { ErrorMessage } from 'formik';

export const ErrorMsg = ({ msg }) => {
  return (
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
  );
};

const FormikErrorMsg = ({ name }) => {
  return (
    <ErrorMessage name={name}>{(msg) => <ErrorMsg msg={msg} />}</ErrorMessage>
  );
};

export default FormikErrorMsg;
