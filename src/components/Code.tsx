import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./styles/Code.css";
import { useState } from "react";
import { Language } from "../types";
import { codeImports, languages } from "../consts";
import {
  ClipboardCheckedIcon,
  ClipboardIcon,
  CppIcon,
  JavaIcon,
  JavaScriptIcon,
  PythonIcon,
} from "../icons";
import { useSelected } from "../hooks/useSelected";

export const Code = () => {
  const [languageSelected, setLanguageSelected] = useState<Language>(
    languages.JavaScript
  );
  const [copied, setCopied] = useState(false);
  const { selected } = useSelected();

  const code = codeImports[selected][languageSelected]

  let timeoutId: number;

  const changeLanguage = (language: Language) => {
    setLanguageSelected(language);
  };

  const handleCopyToClipboard = () => {
    clearTimeout(timeoutId);
    setCopied(true);
    navigator.clipboard.writeText(code);
    timeoutId = setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const customStyle = {
    backgroundColor: "transparent",
    border: "2px solid var(--secondary-color)",
    borderTop: "none",
    color: "var(--tertiary-brighty-color)",
  };

  const Icons = {
    "C++": <CppIcon />,
    JavaScript: <JavaScriptIcon />,
    Python: <PythonIcon />,
    Java: <JavaIcon />,
  };

  const lineNumberStyle = {
    color: "var(--tertiary-color)",
  };

  return (
    <>
      <h1 className="implementation-title">Implementation</h1>
      <section className="code-container">
        <header className="code-header">
          <ul className="codes-container">
            {Object.entries(languages).map(([key, val], idx) => {
              return (
                <li
                  className={
                    val === languageSelected ? "code-selected" : "code"
                  }
                  key={idx}
                  onClick={() => changeLanguage(val)}
                >
                  {Icons[key as keyof typeof languages]}
                </li>
              );
            })}
          </ul>
          <button
            className={copied ? "copy-clipboard-copied" : "copy-clipboard"}
            onClick={handleCopyToClipboard}
          >
            {copied ? <ClipboardCheckedIcon /> : <ClipboardIcon />}
          </button>
        </header>
        <SyntaxHighlighter
          showLineNumbers
          wrapLines
          lineNumberStyle={lineNumberStyle}
          language={languageSelected.toLowerCase()}
          style={atomOneDarkReasonable}
          customStyle={customStyle}
        >
          {code}
        </SyntaxHighlighter>
      </section>
    </>
  );
};
