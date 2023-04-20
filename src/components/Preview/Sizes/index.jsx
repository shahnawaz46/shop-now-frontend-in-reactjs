import React, { useState } from "react";
import './style.css'

const Sizes = ({productSize, setProductSize}) => {
  const sizeDescription = {
    XS: "Your body measurements for Extra Small are Bust: 32 in, Waist: 24 in, Hip: 34 in",
    S: "Your body measurements for Small are Bust: 33-34 in, Waist: 25-26 in, Hip: 35-36 in",
    M: "Your body measurements for Medium are Bust: 35-36 in, Waist: 27-28 in, Hip: 37-38 in",
    L: "Your body measurements for Large are Bust: 37-38 in, Waist: 29-30 in, Hip: 39-40 in",
    XL: "Your body measurements for Extra Large are Bust: 40-41 in, Waist: 32-33 in, Hip: 42-43 in",
  };

  return (
    <>
      <div className="preview-size-button-box">
        <button
          onClick={() => setProductSize("XS")}
          className={
            productSize === "XS"
              ? "preview-size-button background-color-black"
              : "preview-size-button"
          }
        >
          XS
        </button>
        <button
          onClick={() => setProductSize("S")}
          className={
            productSize === "S"
              ? "preview-size-button background-color-black"
              : "preview-size-button"
          }
        >
          S
        </button>
        <button
          onClick={() => setProductSize("M")}
          className={
            productSize === "M"
              ? "preview-size-button background-color-black"
              : "preview-size-button"
          }
        >
          M
        </button>
        <button
          onClick={() => setProductSize("L")}
          className={
            productSize === "L"
              ? "preview-size-button background-color-black"
              : "preview-size-button"
          }
        >
          L
        </button>
        <button
          onClick={() => setProductSize("XL")}
          className={
            productSize === "XL"
              ? "preview-size-button background-color-black"
              : "preview-size-button"
          }
        >
          XL
        </button>
      </div>

      <div className="preview-size-detail-box">
        {sizeDescription[productSize]}
      </div>
    </>
  );
};

export default Sizes;
