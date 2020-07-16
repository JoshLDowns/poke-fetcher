import React, { Component } from "react";

class List extends Component {
  render() {
    return (
      <div id="list">
        {this.props.results ? (
          this.props.results.map((pokemon) => (
            <div
              className="list-item"
              key={pokemon.name}
              onClick={() => {
                this.props.onPokemonClick(pokemon.url);
              }}
            >
              {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default React.memo(List);
