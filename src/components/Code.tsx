import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./styles/Code.css";
import { useState } from "react";
import { useSelected } from "../hooks/useSelected";
import { Language } from "../types";
import { languages } from "../consts";

export const Code = () => {
  const [languageSelected, setLanguageSelected] = useState<Language>(
    languages.JavaScript
  );
  const { code } = useSelected();

  const changeLanguage = (language: Language) => {
    setLanguageSelected(language);
  };

  return (
    <section className="code-container">
      <ul className="codes-container">
        {Object.entries(languages).map(([key, val], idx) => {
          return (
            <li
              className={val === languageSelected ? "code-selected" : "code"}
              key={idx}
              onClick={() => changeLanguage(val)}
            >
              {key}
            </li>
          );
        })}
      </ul>
      <SyntaxHighlighter
        showLineNumbers
        language={languageSelected.toLowerCase()}
        style={atomOneDarkReasonable}
      >
        {code[languageSelected]}
      </SyntaxHighlighter>
    </section>
  );
};
