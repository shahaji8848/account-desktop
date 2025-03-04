import React from "react";

function Input({
  value,
  label,
  placeholder,
  name,
  handleValueKeyDown,
  handleValueChange,
  dataRef,
  style = {},
  inputType = "text",
  disabled = false,
}: {
  value: string;
  label: string;
  placeholder: string;
  name: string;
  handleValueKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dataRef: any;
  style?: React.CSSProperties;
  nextRefName?: string;
  inputType?: string;
  disabled?: boolean;
}) {
  return (
    <div
      className={name === "sales_no" ? "salesNo d-flex align-items-center" : ""}
    >
      <div className="d-flex align-items-center">
        <label
          style={style ? style : { background: "#2a66b0", color: "white" }}
          className="px-5 me-2"
        >
          {label}
        </label>
        <p>{placeholder}</p>
        <input
          value={value}
          type={inputType}
          onChange={handleValueChange}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleValueKeyDown(e)
          }
          disabled={disabled}
          style={{ outline: "none" }}
          name={name}
          className="ms-2"
          ref={dataRef}
        />
        {/* <p
                      className="ps-4 font-bold"
                      style={{ fontWeight: "bold" }}
                    >
                      2
                    </p> */}
      </div>
      {name === "naming_series" && (
        <div className="d-flex align-items-center ps-1 ms-1">
          <label
            className="ps-1 pe-3"
            style={{
              background: "transparent",
              color: "#747573",
              fontStyle: "italic",
            }}
          >
            status
          </label>
          <p
            style={{
              fontStyle: "italic",
            }}
          >
            :{" "}
          </p>
          <p className="ps-2 font-bold" style={{ fontWeight: "bold" }}>
            {disabled ? "Draft" : "null"}
          </p>
        </div>
      )}
    </div>
  );
}

export default Input;
