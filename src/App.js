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
      pokeUrl: null,
      results: undefined,
      modalOpen: false,
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
        });
      });
  }

  render() {
    return (
      <div id="App">
        <h1>Poke-Fetcher!</h1>
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
