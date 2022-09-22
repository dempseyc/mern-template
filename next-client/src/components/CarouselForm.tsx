import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { useStoreActions } from "../store/store";

const FormTabs = (props) => {
  const { refs, index, changeFocus } = props;

  let tabs = [];
  const tabNames = ["email", "password", "verify password"];

  refs.forEach((ref, idx) => {
    let classes = ["form-tab"];
    let tabname = tabNames[idx];
    if (idx === index) {
      classes.push("focus");
    }
    let li = (
      <li
        key={`tab-${idx}`}
        className={classes.join(" ")}
        onClick={() => changeFocus(ref, idx)}
      >
        {`${tabname}:`}
      </li>
    );
    tabs.push(li);
  });

  return <ul className="form-tabs">{tabs}</ul>;
};

const EmailForm = (props) => {
  return (
    <form key="em">
      <label>
        <input
          ref={props.EMinputRef}
          type="text"
          value={props.email}
          onChange={props.setEmail}
          onFocus={() => props.changeFocus(props.EMinputRef, 0)}
        />
      </label>
    </form>
  );
};

const PasswordForm = (props) => {
  return (
    <form key="pw" onSubmit={props.handleSubmitPassword}>
      <label>
        <input
          ref={props.PWinputRef}
          type="text"
          value={props.password}
          onChange={props.setPassword}
          onFocus={() => props.changeFocus(props.PWinputRef, 1)}
        />
      </label>
      {!props.createMode ? (
        <Button color="primary" variant="outlined" type="submit" value="Submit">
          Submit
        </Button>
      ) : null}
    </form>
  );
};

const VerifyForm = (props) => {
  return props.createMode ? (
    <form key="vp" onSubmit={props.handleSubmitPassword}>
      <label>
        <input
          ref={props.VPinputRef}
          type="text"
          value={props.verify}
          onChange={props.setVerify}
          onFocus={() => props.changeFocus(props.VPinputRef, 2)}
        />
      </label>
      <Button color="primary" variant="outlined" type="submit" value="Submit">
        Submit
      </Button>
    </form>
  ) : null;
};

const CarouselPanels = (props) => {
  const { index, children } = props;
  const panelsStyle = {
    height: "100%",
    width: "100vw",
    overflow: "hidden",
  };
  const panelsWrapperStyle = {
    display: "inline-flex",
    // did not work on chrome with translateX
    left: `${index * -100}%`,
  };
  return (
    <div className="panels" style={panelsStyle}>
      <div className="panels-wrapper" style={panelsWrapperStyle}>
        {children}
      </div>
    </div>
  );
};

const CarouselForm = (props) => {
  const { createMode } = props;
  const [index, setIndex] = useState(0);
  const [verify, setVerify] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const EMinputRef = useRef();
  const PWinputRef = useRef();
  const VPinputRef = useRef();

  const refs = createMode
    ? [EMinputRef, PWinputRef, VPinputRef]
    : [EMinputRef, PWinputRef];

  const createUser = useStoreActions((actions) => actions.users.createUser);
  const loginUser = useStoreActions((actions) => actions.users.loginUser);

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    loginUser({
      email: email,
      password: password,
    });
  };

  const handleSubmitCreate = (event) => {
    event.preventDefault();
    if (verify === password) {
      createUser({
        email: email,
        password: password,
      });
    } else {
      console.log("didnt match");
    }
  };

  const changeFocus = (ref, index) => {
    console.log(ref, index);
    setIndex(index);
    ref.current.focus();
  };

  return (
    <div className="carou-user-form-and-tabs">
      <FormTabs
        refs={refs}
        index={index}
        changeFocus={changeFocus}
        createMode={createMode}
      />
      <CarouselPanels index={index}>
        <EmailForm
          EMinputRef={EMinputRef}
          changeFocus={changeFocus}
          email={email}
          setEmail={(e) => setEmail(e.target.value)}
          createMode={createMode}
        />
        <PasswordForm
          PWinputRef={PWinputRef}
          changeFocus={changeFocus}
          password={password}
          setPassword={(e) => setPassword(e.target.value)}
          createMode={createMode}
          handleSubmitPassword={
            createMode
              ? () => {
                  changeFocus(VPinputRef, 2);
                }
              : handleSubmitPassword
          }
        />
        <VerifyForm
          VPinputRef={VPinputRef}
          changeFocus={changeFocus}
          verify={verify}
          setVerify={(e) => setVerify(e.target.value)}
          createMode={createMode}
          handleSubmitPassword={handleSubmitCreate}
        />
      </CarouselPanels>
    </div>
  );
};

export default CarouselForm;
