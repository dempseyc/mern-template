import React, { useState } from "react";
import Button from "@mui/material/Button";

import StatusCircle from './StatusCircle';

const CarouselPanels = (props) => {
  const { index, children } = props;
  const panelsStyle = {
    // position: "fixed" as "fixed",
    height: "25vh",
    width: "80vw",
    margin: "0 auto",
    overflow: "hidden", 
    // textAlign: "center",
  };
  const panelsWrapperStyle = {
    position: "relative" as "relative",
    // width: `${100 * children.length}%`,
    width: "100%",
    left: `${-100 * index}%`,
    display: "inline-flex",
    // flexDirection: "column"
  };
  return (
    <div className="panels" style={panelsStyle}>
      <div className="panels-wrapper" style={panelsWrapperStyle}>
        {children}
      </div>
    </div>
  );
};

const FormTabs = (props) => {
  const { fields, validity, touched, refs, index, changeFocus } = props;
  
  let tabs = fields.map((field, idx) => {
    const valid = validity[idx];
    const touch = touched[idx];
    const ref = refs[idx];
    const getStatus = () => {
      if (!touch) { return "false"; }
      if (valid) { return "valid"; }
      else if (idx === index) { return "current"; }
      else { return "error"; }
    };
    let classes = ["form-tab"];
    let tabname = field.name;
    if (idx === index) {
      classes.push("focus");
    }
    let li = (
      <li
        key={`tab-${idx}`}
        className={classes.join(" ")}
        onClick={() => {
          ref.current.focus();
        }}
      >
        <StatusCircle key={idx} status={getStatus()} />{`${tabname}`}
      </li>
    );
    return li;
  });

  return (
    <ul className="form-tabs">{tabs}</ul>
  );
};

const FieldInput = (props) => {
  const {
    fieldRef,
    field,
    idx,
    index,
    changeValid,
    changeValue,
    changeFocus,
    children
  } = props;

  const [value, setValue] = useState("");
  const [valid, setValid] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    if (field.valid(e.target.value)) {
      setValid(true);
      changeValid(idx, true);
      changeValue(idx, e.target.value);
    } else {
      setValid(false);
      changeValid(idx, false);
    }
  }

  const handleOnFocus = (e) => {
    e.preventDefault();
    changeFocus(idx,fieldRef);
    // hack to get safari and chrome to do the same thing
    e.target.parentElement.parentElement.parentElement.scrollTo(0,0);
  }

  return (
    <label>
      <input
        ref={fieldRef}
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={handleOnFocus}
        
      />
      {valid ? null : <p>{ field.error }</p>}
      {children}
    </label>
  )
}

const CarouselForm = (props) => {
  const { fields, handleSubmit } = props; // array
  const [validity, setValidity] = useState(fields.map(f => 0));
  const [values, setValues] = useState(fields.map(f => ""));
  const [touched, setTouched] = useState(fields.map((f,i) => i === 0 ? 1 : 0));
  const [index, setIndex] = useState(0);
  const refs = fields.map(f => f.ref);

  const changeTouched = (idx,value) => {
    let newTouched = [...touched];
    newTouched[idx] = value;
    setTouched(newTouched);
  };

  const changeFocus = (idx, ref) => {
    console.log(ref, idx);
    setIndex(idx);
    changeTouched(idx, 1);
  };

  const changeValid = (idx,value) => {
    let newValidity = [...validity];
    newValidity[idx] = value;
    setValidity(newValidity);
  };

  const changeValue = (idx,value) => {
    let newValues = [...values];
    newValues[idx] = value;
    setValues(newValues);
  }

  const checkValid = () => {
    console.log(validity);
    return (validity.every(item => item == true));
  }

  const fieldInputs = fields.map((field, idx) => {
    return (
      <React.Fragment key={`fi-${idx}-${fields.length}`}>
        <FieldInput
          fieldRef={refs[idx]}
          field={field}
          idx={idx}
          index={index}
          changeValid={changeValid}
          changeValue={changeValue}
          changeFocus={changeFocus}
        >
        {
          (idx === fields.length-1) && 
          <Button
            color="primary" 
            variant="outlined" 
            type="submit" 
            value="Submit">
              Submit
          </Button>
        }</FieldInput>
      </React.Fragment>
    )
  });

  return (
    <div className="carou-user-form-and-tabs">
        <FormTabs
          fields={fields}
          validity={validity}
          touched={touched}
          refs={refs}
          index={index}
          changeFocus={changeFocus}
        />
        <form onSubmit={(e) => {
            e.preventDefault();
            if (checkValid()) {
              handleSubmit(values);
            }
          }}>
          <CarouselPanels index={index}>
              {fieldInputs}
          </CarouselPanels>
        </form>
    </div>
  )
}

export default CarouselForm;
