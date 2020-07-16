import React, { Component } from "react";

class PokemonDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sprite: undefined,
      types: undefined,
      height: undefined,
      weight: undefined,
      id: undefined,
    };
  }

  componentDidMount() {
    fetch(this.props.url)
      .then((res) => res.json())
      .then((obj) => {
        console.log(obj.id)
        this.setState({
          name: obj.name,
          sprite: obj.sprites.front_default,
          types: obj.types,
          height: obj.height,
          weight: obj.weight,
        });
      });
  }
  render() {
    const { name, sprite, types, height, weight } = this.state;
    return (
      <div id="display">
        <button onClick={this.props.handleModalClose} id="close-button">
          X
        </button>
        {sprite ? (
          <div>
            <h2>{name[0].toUpperCase() + name.slice(1)}</h2>
            <div className="sprite-wrapper">
              <img className="poke-sprite" src={sprite} alt="pokemon" />
            </div>
            <p>
              {types
                .map(
                  (obj) =>
                    obj.type.name[0].toUpperCase() + obj.type.name.slice(1)
                )
                .join("/")}
            </p>
            <p>
              Height: {Math.round(Math.floor((height * 3.937) / 12))}'{" "}
              {((height * 3.937) % 12).toFixed(1)}"
            </p>
            <p>Weight: {Math.round(weight / 4.536)} lbs</p>
          </div>
        ) : (
          <p>...loading</p>
        )}
      </div>
    );
  }
}

export default PokemonDisplay;
