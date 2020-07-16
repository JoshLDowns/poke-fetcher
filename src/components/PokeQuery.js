import React, { useState, useEffect } from "react";

function PokeQuery(props) {
  const [name, handleChange] = useState("");
  const [availableNames, handleNames] = useState([]);

  useEffect(() => {
    if (name.length > 0) {
      let nameList = props.nameList.filter((input) => {
        return input.startsWith(`${name.trim().toLowerCase()}`);
      });
      handleNames(nameList);
    }
    if (name.length === 0) handleNames([]);
  }, [name, props.nameList]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!props.nameList.includes(name.trim().toLowerCase())) {
      handleChange("Invalid Pokemon Entry!");
    } else {
      handleNames([]);
      props.handleSubmit(
        `https://pokeapi.co/api/v2/pokemon/${name.trim().toLowerCase()}`
      );
    }
  };

  return (
    <div>
      <form id="name-query" onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          type="text"
          onChange={(event) => handleChange(event.target.value)}
          value={name}
          id="text-input"
        />
        <input
          type="submit"
          value="Go!"
          id="submit-button"
          disabled={name.length === 0}
        />
        {availableNames.length > 0 && (
          <div id="available-names">
            {availableNames.map((name) => (
              <p
                key={name}
                id={name}
                className="auto-fill-name"
                onClick={(event) => {
                  props.handleAutoFillClick(event);
                  handleNames([]);
                  handleChange("");
                }}
              >
                {name[0].toUpperCase() + name.slice(1)}
              </p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default React.memo(PokeQuery);
