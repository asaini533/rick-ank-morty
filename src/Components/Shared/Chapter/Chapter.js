import React from "react";

import "./Chapter.css";

const Chapter = (props) => {
  return (
    <div className={`{props.className} chapter__conatainer`}>
      {props.chapter}
    </div>
  );
};

export default Chapter;
