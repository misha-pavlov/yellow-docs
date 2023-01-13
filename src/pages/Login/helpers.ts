type Values = { email?: string; firstName?: string; lastName?: string; password?: string };

export const validate = (values: Values, isSignIn?: boolean) => {
  const errors: Values = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length > 20) {
    errors.password = 'Must be 20 characters or less';
  } else if (values.password.length < 4) {
    errors.password = 'Must be 4 characters or more';
  }

  if (!isSignIn) {
    if (!values.firstName) {
      errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
      errors.firstName = 'Must be 15 characters or less';
    } else if (values.firstName.length < 3) {
      errors.firstName = 'Must be 3 characters or more';
    }

    if (!values.lastName) {
      errors.lastName = 'Required';
    } else if (values.lastName.length > 20) {
      errors.lastName = 'Must be 20 characters or less';
    } else if (values.lastName.length < 3) {
      errors.lastName = 'Must be 3 characters or more';
    }
  }

  return errors;
};
