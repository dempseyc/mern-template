import { useRef } from "react";
import { useStoreActions } from "../store/store";
import CarouselForm from "./CarouselForm";

const CarouUserForm = (props) => {
  const {createMode} = props;
  const createUser = useStoreActions((actions) => actions.users.createUser);
  const loginUser = useStoreActions((actions) => actions.users.loginUser);

  const handleSubmitPassword = (values) => {
    console.log("loginUser")
    loginUser({
      email: values[0],
      password: values[1],
    });
  };

  const handleSubmitCreate = (values) => {
    if (values[2] === values[1]) {
      console.log("createUser")
      createUser({
        email: values[0],
        password: values[1],
      });
    } else {
      console.log("didnt match");
    }
  };

  const fields = [
    {
      name: "email",
      valid: (value) => { return value.match(/\S+@\S+\.\S+/) ; },
      error: "Enter a valid email.",
      ref: useRef(),
    },
    {
      name: "password",
      valid: (value) => { return value.length > 1 ;  },
      error: "Password must be more than 1 characters.",
      ref: useRef(),
    },
    {
      name: "verify password",
      valid: (value, password) => { return value.length > 1 ; },
      error: "Password must be more than 1 characters.",
      ref: useRef(),
    }
  ];

  return (
    <CarouselForm
      fields={createMode ? fields : fields.slice(0,2)}
      handleSubmit={createMode ? handleSubmitCreate : handleSubmitPassword}
    />
  );

};

export default CarouUserForm;
