import { Link } from "react-router-dom";
import "./styles/Contact.css"
import { RightArrowIcon, SendIcon } from "../icons";

export const Contact = () => {
  const handleOnSubmit = () => {};

  return (
    <main className="contact-container">
      <h1 className="contact-title">Contact</h1>
      <form className="contact-form" onSubmit={handleOnSubmit}>
        <label className="contact-label" htmlFor="input-name">
          Name
          <input className="contact-input" id="input-name" type="text" />
        </label>
        <label className="contact-label" htmlFor="input-email">
          Email
          <input className="contact-input" id="input-email" type="email" />
        </label>
        <label className="contact-label" htmlFor="input-message">
          Message
          <textarea className="contact-input" id="input-message" cols={30} rows={10}></textarea>
        </label>
        <button className="contact-button">Send <SendIcon /></button>
      </form>
      <Link to="/" className="link-orchestra">Go to homepage <RightArrowIcon /></Link>
    </main>
  );
};
