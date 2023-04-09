import React from "react";
import LoaderAnimation from "../../asset/Hourglass.gif";

const Loading = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <img src={LoaderAnimation} alt="loader" />
    </div>
  );
};

export default Loading;
