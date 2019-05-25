import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { initMCE } from "../../initMce";
const InputField = ({ id, type, placeholder, value, name, onChange, error }) => {
  return (
    <div className="textarea-field">
      <Editor initialValue={value ? value : "<p>Description</p>"} init={initMCE} onEditorChange={onChange} />
      {/* <textarea id="textarea" type={type} placeholder={placeholder} value={value} name={name} onChange={onChange} /> */}
      {error ? <span className="error">{error}</span> : ""}
    </div>
  );
};

export default InputField;
