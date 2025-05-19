import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import "./style.css";

interface ICustomSelectInputProps {
  value: string;
  onSelect: (value: string) => void;
  options: string[];
  disabled: boolean;
}

const CustomSelectInput = ({
  value,
  options,
  onSelect,
  disabled,
}: ICustomSelectInputProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef}>
      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        <input
          readOnly
          value={value}
          onClick={() => setShowOptions((prev) => !prev)}
          style={{ paddingRight: "30px" }}
          disabled={disabled}
        />

        {showOptions ? (
          <MdKeyboardArrowUp className="input-locality-icon" />
        ) : (
          <MdKeyboardArrowDown className="input-locality-icon" />
        )}
      </div>

      {showOptions && (
        <div className="address-form-show-locality-box">
          {options.length > 0 &&
            options.map((value, index) => {
              return (
                <span
                  key={index}
                  className="address-form-show-locality"
                  onClick={() => {
                    onSelect(value);
                    setShowOptions(false);
                  }}
                >
                  {value}
                </span>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default CustomSelectInput;
