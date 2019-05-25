import React from "react";

const InputField = ({ id, type, placeholder, value, name, onChange, error }) => {
  return (
    <div className="input-field">
      <input type={type} placeholder={placeholder} value={value} name={name} onChange={onChange} />
      {error ? <span className="error">{error}</span> : ""}
    </div>
  );
};

export default InputField;
