import React, { Component } from "react";
import "./App.css";
import List from "./components/List.js";
import PokemonDisplay from "./components/PokemonDisplay.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      count: undefined,
      nextUrl: null,
      prevUrl: null,
      results: undefined,
      pokemonInfo: undefined,
    };
  }

  onPokemonClick = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((obj) => {
        this.setState({
          pokemonInfo: {
            sprite: obj.sprites.front_default,
            types: obj.types,
            height: obj.height,
            weight: obj.weight,
          },
        });
      });
  };

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((obj) => {
        this.setState({
          count: obj.count,
          nextUrl: obj.next,
          prevUrl: obj.prev,
          results: obj.results,
        });
      });
      
    fetch("https://pokeapi.co/api/v2/pokemon/1/")
      .then((res) => res.json())
      .then((obj) => {
        this.setState({
          pokemonInfo: {
            sprite: obj.sprites.front_default,
            types: obj.types,
            height: obj.height,
            weight: obj.weight,
          },
        });
      });
  }

  render() {
    return (
      <div className="App">
        <List
          results={this.state.results}
          onPokemonClick={this.onPokemonClick}
        />
        <PokemonDisplay pokemonInfo={this.state.pokemonInfo} />
      </div>
    );
  }
}

export default App;
