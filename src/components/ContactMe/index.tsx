import React from 'react';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { sender } from "../../App";

const ContactMe : React.FC = () => {

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    emailjs.sendForm(sender.serviceID, sender.templateID, e.currentTarget as HTMLFormElement, sender.publicKey)
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  return (
    <form onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};

export default ContactMe;