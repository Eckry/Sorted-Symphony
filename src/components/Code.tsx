import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./styles/Code.css";
import { useState } from "react";
import { useSelected } from "../hooks/useSelected";
import { Language } from "../types";
import { languages } from "../consts";
import { CppIcon, JavaIcon, JavaScriptIcon, PythonIcon } from "../icons";

export const Code = () => {
  const [languageSelected, setLanguageSelected] = useState<Language>(
    languages.JavaScript
  );
  const { code } = useSelected();
  const [copied, setCopied] = useState(false);

  let timeoutId: number;

  const changeLanguage = (language: Language) => {
    setLanguageSelected(language);
  };

  const handleCopyToClipboard = () => {
    clearTimeout(timeoutId);
    setCopied(true);
    navigator.clipboard.writeText(code[languageSelected]);
    timeoutId = setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const customStyle = {
    backgroundColor: "transparent",
  };

  const Icons = {
    "C++": <CppIcon />,
    JavaScript: <JavaScriptIcon />,
    Python: <PythonIcon />,
    Java: <JavaIcon />,
  };

  return (
    <section className="code-container">
      <header className="code-header">
        <ul className="codes-container">
          {Object.entries(languages).map(([key, val], idx) => {
            return (
              <li
                className={val === languageSelected ? "code-selected" : "code"}
                key={idx}
                onClick={() => changeLanguage(val)}
              >
                {Icons[key]}
              </li>
            );
          })}
        </ul>
        <button className="copy-clipboard" onClick={handleCopyToClipboard}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </header>
      <SyntaxHighlighter
        showLineNumbers
        language={languageSelected.toLowerCase()}
        style={atomOneDarkReasonable}
        customStyle={customStyle}
      >
        {code[languageSelected]}
      </SyntaxHighlighter>
    </section>
  );
};
