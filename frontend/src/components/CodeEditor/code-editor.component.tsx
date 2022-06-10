import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import "highlight.js/styles/github.css";

import styles from "./code-editor.styles.module.css";

hljs.registerLanguage("javascript", javascript);

export const CodeEditor: FunctionComponent = () => {
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      hljs.highlightElement(ref.current);
    }
  }, [value]);

  return (
    <>
      <textarea
        className={styles.editing}
        name="code"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />

      <pre className={styles.highlighting} aria-hidden>
        <code ref={ref} className="language-javascript">
          {value}
        </code>
      </pre>
    </>
  );
};
