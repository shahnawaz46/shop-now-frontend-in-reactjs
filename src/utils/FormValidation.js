import moment from 'moment';

export const FormValidation = (data) => {
  for (let value in data) {
    if (data[value] === '')
      return {
        validation: false,
        msg: `${value.split('_').join(' ')} is required`,
      };
  }

  if (data.phone_no.length !== 10)
    return {
      validation: false,
      msg: 'Phone number must be 10 digit',
    };

  // Users cannot select a date of birth that indicates an age is less than 10 years
  // if user still able to select dob then this check will work
  const dob = moment(data.dob);
  const age = moment().diff(dob, 'years');
  if (age < 10) {
    return {
      validation: false,
      msg: 'You must be at least 10 years old to create an account',
    };
  }

  if (data.password.length < 8)
    return {
      validation: false,
      msg: 'Password must be at least 8 character long',
    };

  let UC = 0;
  let LC = 0;
  //   let SC = 0;
  let Number = 0;

  for (let i = 0; i < data.password.length; i++) {
    if (data.password.charCodeAt(i) >= 97 && data.password.charCodeAt(i) <= 122)
      LC++;
    else if (
      data.password.charCodeAt(i) >= 65 &&
      data.password.charCodeAt(i) <= 90
    )
      UC++;
    else if (
      data.password.charCodeAt(i) >= 48 &&
      data.password.charCodeAt(i) <= 57
    )
      Number++;
  }

  if (UC === 0)
    return {
      validation: false,
      msg: 'Atleast 1 Capital Character Required',
    };

  if (LC === 0)
    return {
      validation: false,
      msg: 'Atleast 1 Small Character Required',
    };

  if (Number === 0)
    return {
      validation: false,
      msg: 'Atleast 1 Number Required',
    };

  if (data.password !== data.confirm_password)
    return {
      validation: false,
      msg: 'Password not matched',
    };

  return { validation: true };
};
