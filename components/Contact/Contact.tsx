import React from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import ContactItem from "./ContactItem";

type Props = {};

const Contact = (props: Props) => {
  return (
    <div id="contact" className="mt-10 pb-20">
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black">
        Contact
      </h3>
      <p className="leading-normal">Get in touch with me.</p>
      <ul className="pt-3">
        <ContactItem
          href="mailto:me@phong.se"
          text="me@phong.se"
          icon={faEnvelope}
        />
        <ContactItem
          href="https://linkedin.com/in/phongse"
          text="LinkedIn"
          icon={faLinkedin}
        />
        <ContactItem
          href="https://github.com/phongse"
          text="GitHub"
          icon={faGithub}
        />
      </ul>
    </div>
  );
};

export default Contact;
