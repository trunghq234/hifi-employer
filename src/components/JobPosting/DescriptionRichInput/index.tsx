import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Label from "../Label";
import { formats, modules } from "./data";
interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}
const DescriptionRichInput: React.FC<IProps> = ({ value, onChange }) => {
  return (
    <div>
      <Label text="Job Description" />
      <ReactQuill
        theme="snow"
        onChange={onChange}
        value={value}
        modules={modules}
        formats={formats}
        placeholder={"Write job description"}
        className="bg-white"
      />
      {/* Use this when display html */}
      {/* <ReactQuill value={body} readOnly={true} theme={'bubble'} /> */}
    </div>
  );
};

export default DescriptionRichInput;
