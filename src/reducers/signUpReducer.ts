import type { InputErrorType } from "components/elements/Input/Input";

const emailRegex = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
);

type SignUpFormType = {
  form: {
    email: string;
    lastName: string;
    password: string;
    firstName: string;
    confirmPassword: string;
  };
  error: InputErrorType[];
};

const signUpReducer = (
  state: SignUpFormType,
  newState: Partial<SignUpFormType>
) => {
  let errors = [...state.error];

  // validate email
  if (newState?.form?.email) {
    const error = !emailRegex.test(newState?.form?.email)
      ? {
          field: "email",
          message: "Invalid email",
        }
      : null;

    if (error) {
      // add error if it doesn't exist
      if (!errors.find((e) => e.field === "email")) {
        errors.push(error);
      }
    }

    if (!error) {
      errors = errors.filter((e) => e.field !== "email");
    }
  }

  if (!newState?.form?.email) {
    errors = errors.filter((e) => e.field !== "email");
  }

  // validate password
  if (newState.form?.password) {
    const error =
      newState?.form?.password.length <= 5
        ? {
            field: "password",
            message: "Password must be at least 6 characters",
          }
        : null;

    if (error) {
      // add error if it doesn't exist
      if (!errors.find((e) => e.field === "password")) {
        errors.push(error);
      }
    }

    if (!error) {
      errors = errors.filter((e) => e.field !== "password");
    }
  }

  if (!newState?.form?.password) {
    errors = errors.filter((e) => e.field !== "password");
  }

  // validate confirm password
  if (newState?.form?.confirmPassword) {
    const error =
      newState?.form?.confirmPassword.length <= 5
        ? {
            field: "confirmPassword",
            message: "Passwords do not match",
          }
        : null;

    if (error) {
      // add error if it doesn't exist
      if (!errors.find((e) => e.field === "confirmPassword")) {
        errors.push(error);
      }
    }

    if (!error) {
      errors = errors.filter((e) => e.field !== "confirmPassword");
    }
  }

  if (!newState?.form?.confirmPassword) {
    errors = errors.filter((e) => e.field !== "confirmPassword");
  }

  // validate first name
  if (newState?.form?.firstName) {
    const error =
      newState?.form?.firstName.length <= 2
        ? {
            field: "firstName",
            message: "First name and last name must be at least 2 characters",
          }
        : null;

    if (error) {
      // add error if it doesn't exist
      if (!errors.find((e) => e.field === "firstName")) {
        errors.push(error);
      }
    }

    if (!error) {
      errors = errors.filter((e) => e.field !== "firstName");
    }
  }

  if (!newState?.form?.firstName) {
    errors = errors.filter((e) => e.field !== "firstName");
  }

  // validate last name
  if (newState?.form?.lastName) {
    const error =
      newState?.form?.lastName && newState.form.lastName.length <= 2
        ? {
            field: "lastName",
            message: "Last name and last name must be at least 2 characters",
          }
        : null;

    if (error) {
      // add error if it doesn't exist
      if (!errors.find((e) => e.field === "lastName")) {
        errors.push(error);
      }
    }

    if (!error) {
      errors = errors.filter((e) => e.field !== "lastName");
    }
  }

  if (!newState?.form?.lastName) {
    errors = errors.filter((e) => e.field !== "lastName");
  }

  return { ...state, ...newState, error: errors };
};

export default signUpReducer;
