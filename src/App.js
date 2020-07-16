import React, { Component } from "react";
import "./App.css";
import List from "./components/List.js";
import PokeQuery from "./components/PokeQuery.js";
import PokemonDisplay from "./components/PokemonDisplay.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      count: undefined,
      nextUrl: null,
      prevUrl: null,
      pokeUrl: null,
      results: undefined,
      nameList: undefined,
      availableNameList: [],
      modalOpen: false,
      inputName: "",
      arrowLeft: "arrow-left-disabled arrow",
      arrowRight: "arrow-right arrow",
    };
  }

  onPokemonClick = (url) => {
    this.setState({
      modalOpen: true,
      pokeUrl: url,
    });
  };

  handleArrowClick = (event) => {
    this.setState({
      arrowLeft: "arrow-left-disabled arrow",
      arrowRight: "arrow-right-disabled arrow",
    });
    let direction = event.target.id;
    let url = direction === "next" ? this.state.nextUrl : this.state.prevUrl;
    fetch(url)
      .then((res) => res.json())
      .then((obj) => {
        this.setState({
          nextUrl: obj.next,
          prevUrl: obj.previous,
          results: obj.results,
          arrowLeft: obj.previous
            ? "arrow-left arrow"
            : "arrow-left-disabled arrow",
          arrowRight: obj.next
            ? "arrow-right arrow"
            : "arrow-right-disabled arrow",
        });
      });
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
      inputName: "",
    });
  };

  handleSubmit = (url) => {
    this.setState({
      modalOpen: true,
      pokeUrl: url,
    });
  };

  handleAutoFillClick = (event) => {
    this.setState({
      modalOpen: true,
      pokeUrl: `https://pokeapi.co/api/v2/pokemon/${event.target.id}`,
    });
  };

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((obj) => {
        this.setState({
          nextUrl: obj.next,
          prevUrl: obj.previous,
          results: obj.results,
          count: obj.count,
        });
      });
    fetch("https://pokeapi.co/api/v2/pokemon?limit=964")
      .then((res) => res.json())
      .then((obj) => {
        let names = obj.results.map((pokemon) => pokemon.name);
        this.setState({
          nameList: names,
        });
      });
  }

  render() {
    return (
      <div id="App">
        <h1>Poke-Fetcher!</h1>
        <PokeQuery
          handleSubmit={this.handleSubmit}
          handleAutoFillClick={this.handleAutoFillClick}
          nameList={this.state.nameList}
        />
        <div id="list-container">
          <div
            id="previous"
            className={this.state.arrowLeft}
            onClick={this.handleArrowClick}
          />
          <List
            results={this.state.results}
            onPokemonClick={this.onPokemonClick}
          />
          <div
            id="next"
            className={this.state.arrowRight}
            onClick={this.handleArrowClick}
          />
        </div>
        {this.state.modalOpen && (
          <PokemonDisplay
            url={this.state.pokeUrl}
            handleModalClose={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}

export default App;
