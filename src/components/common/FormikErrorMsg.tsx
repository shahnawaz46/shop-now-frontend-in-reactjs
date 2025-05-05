import { ErrorMessage } from 'formik';

interface IErroMsgProps {
  msg: string;
}

interface IFromikErroMsgProps {
  name: string;
}

export const ErrorMsg = ({ msg }: IErroMsgProps) => {
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

const FormikErrorMsg = ({ name }: IFromikErroMsgProps) => {
  return (
    <ErrorMessage name={name}>{(msg) => <ErrorMsg msg={msg} />}</ErrorMessage>
  );
};

export default FormikErrorMsg;
