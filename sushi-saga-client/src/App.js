import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushis: [],
    index: 0,
    budget: 100
  }

  componentDidMount() {
    fetch(API)
      .then(res => res.json())
      .then(sushis => {
        this.setState({ sushis })
      })
  }

  moreSushi = () => {
    this.setState(prevState => {
      return {
        index: prevState.index + 4,
      }
    })
  }

  eatSushi = (sushi) => {
    const sushis = this.state.sushis.map(sushiObj => {
      const newSushi = { ...sushiObj };

      if (newSushi.id === sushi.id && !newSushi.eaten) {
        if (newSushi.price <= this.state.budget) {
          newSushi.eaten = true;
          this.setState(prevState => {
            return {
              budget: prevState.budget - newSushi.price,
            }
          });
        }
      }

      return newSushi;
    });

    this.setState({ sushis })
  }

  render() {
    return (
      <div className="app">
        <SushiContainer
          sushis={this.state.sushis}
          moreSushi={this.moreSushi}
          sushiIndex={this.state.index}
          eatSushi={this.eatSushi}
        />
        <Table budget={this.state.budget} sushisEaten={this.state.sushis.filter(sushi => sushi.eaten)} />
      </div>
    );
  }
}

export default App;