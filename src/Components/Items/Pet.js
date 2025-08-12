import React, { useState } from "react";

const Pet = () => {
  const [message, setMessage] = useState("Hello!");

  const handleMouseOver = () => {
    setMessage("Pet me!");
  };

  const handleMouseOut = () => {
    setMessage("Hello!");
  };

  const handleClick = () => {
    setMessage("Thanks for the pet!");
  };

  return (
    <div
      style={{ position: "fixed", bottom: "80px", left: "10px", zIndex: 1000 }}
    >
      <div style={{ position: "relative", textAlign: "center" }}>
        {/* <div style={{ cursor: "pointer", fontSize: "120px" }}>🦔</div> */}
        <img
          src={window.location.origin + "/images/pets/hedgehog.gif"}
          alt="Pet"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={handleClick}
          style={{ cursor: "pointer", width: "300px", height: "200px" }}
        />
        {/* <div
          style={{
            position: "absolute",
            bottom: "90%",
            left: "0",
            backgroundColor: "white",
            border: "1px solid black",
            borderRadius: "5px",
            padding: "5px",
            marginBottom: "10px",
            whiteSpace: "nowrap",
          }}
        >
          Hello world!
        </div> */}
      </div>
    </div>
  );
};

export default Pet;
