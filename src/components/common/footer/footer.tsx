/* eslint-disable linebreak-style */
import { FC, Fragment } from "react";
import logo5 from "../../../assets/images/faces/logo5.png";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <Fragment>
        <footer className="watermark-footer">
        <img
          src={logo5}
          alt="Watermark Logo"
          className="watermark-image mt-3"
        />
      </footer>
    </Fragment>
  );
};

export default Footer;
