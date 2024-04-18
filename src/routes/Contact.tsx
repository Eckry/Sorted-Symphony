import { Link } from "react-router-dom";
import "./styles/Contact.css";
import { CheckIcon, ErrorIcon, RightArrowIcon, SendIcon } from "../icons";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Loading } from "../components/Loading";

const templateId = import.meta.env.VITE_TEMPLATE_ID;
const serviceId = import.meta.env.VITE_SERVICE_ID;
const publicKey = import.meta.env.VITE_PUBLIC_KEY;

const states = {
  NULL: <SendIcon />,
  LOADING: <Loading />,
  SUCCESS: <CheckIcon />,
  ERROR: <ErrorIcon />,
};

type loadingStates = keyof typeof states;

export const Contact = () => {
  const [isLoading, setIsLoading] = useState<loadingStates>(() => {
    const wasSend = localStorage.getItem("SENT");
    if (wasSend) return "SUCCESS";
    return "NULL";
  });
  const form = useRef<HTMLFormElement>(null);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading === "SUCCESS") return;
    setIsLoading("LOADING");
    if (form.current) {
      emailjs
        .sendForm(serviceId, templateId, form.current, {
          publicKey: publicKey,
        })
        .then(() => {
          setIsLoading("SUCCESS");
          localStorage.setItem("SENT", "true");
        })
        .catch((e) => {
          setIsLoading("ERROR");
          console.error(e);
        });
    }
  };

  return (
    <main className="contact-container">
      <h1 className="contact-title">Contact</h1>
      <h6 className="contact-email">My email is ericktorresagui@gmail.com</h6>
      <form ref={form} className="contact-form" onSubmit={handleOnSubmit}>
        <label className="contact-label" htmlFor="input-name">
          Name
          <input
            required
            name="from-name"
            className="contact-input"
            id="input-name"
            type="text"
          />
        </label>
        <label className="contact-label" htmlFor="input-email">
          Email
          <input
            required
            name="reply_to"
            className="contact-input"
            id="input-email"
            type="email"
          />
        </label>
        <label className="contact-label" htmlFor="input-message">
          Message
          <textarea
            required
            name="message"
            className="contact-input"
            id="input-message"
            cols={30}
            rows={10}
          ></textarea>
        </label>
        <button className="contact-button">Send {states[isLoading]}</button>
      </form>
      <Link to="/" className="link-orchestra">
        Go to homepage <RightArrowIcon />
      </Link>
    </main>
  );
};
