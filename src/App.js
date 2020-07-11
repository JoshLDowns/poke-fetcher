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

  handleChange = (event) => {
    let availableNames = this.state.nameList.filter((name) =>
      name.startsWith(`${event.target.value.trim().toLowerCase()}`)
    );
    this.setState({
      inputName: event.target.value,
      availableNameList: event.target.value === "" ? [] : availableNames,
    });
  };

  handleAutoFillClick = (event) => {
    this.setState({
      modalOpen: true,
      availableNameList: [],
      pokeUrl: `https://pokeapi.co/api/v2/pokemon/${event.target.id}`,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (
      !this.state.nameList.includes(this.state.inputName.trim().toLowerCase())
    ) {
      this.setState({
        inputName: "Invalid Pokemon Entry!",
      });
    } else {
      this.setState({
        modalOpen: true,
        availableNameList: [],
        pokeUrl: `https://pokeapi.co/api/v2/pokemon/${this.state.inputName
          .trim()
          .toLowerCase()}`,
      });
    }
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
        <form id="name-query" onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.inputName}
            id="text-input"
          />
          <input type="submit" value="Go!" id="submit-button" />
          {this.state.availableNameList.length > 0 && (
            <div id="available-names">
              {this.state.availableNameList.map((name) => (
                <p
                  key={name}
                  id={name}
                  className="auto-fill-name"
                  onClick={this.handleAutoFillClick}
                >
                  {name[0].toUpperCase() + name.slice(1)}
                </p>
              ))}
            </div>
          )}
        </form>
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
