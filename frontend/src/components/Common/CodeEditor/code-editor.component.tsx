import { FunctionComponent } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

export const CodeEditor: FunctionComponent<any> = ({ value, onChange }: any) => {
  return (
    <CodeMirror
      value={value}
      height="100%"
      extensions={[javascript({ jsx: true, typescript: true })]}
      onChange={onChange}
    />
  );
};
