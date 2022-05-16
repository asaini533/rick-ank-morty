import React from "react";
import { BiError } from "react-icons/bi";

import "./ErrorModal.css";

const ErrorModal = () => {
  return (
    <div className="errorModal__conatiner">
      <BiError />
      <span>Oh Snap!</span>
      <p>
        Something went wrong. Please try refreshing the page or come back later.
      </p>
    </div>
  );
};

export default ErrorModal;
