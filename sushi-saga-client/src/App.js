import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  constructor(){
    super()
    this.state = {
      sushi: [],
      budget: 100
    }
  }

  componentDidMount(){
    fetch(API)
      .then(res => res.json())
      .then( sushi => this.setState({ sushi: this.selectFourRandomSushi(sushi) }))
  }

  selectFourRandomSushi(sushi){
    while(sushi.filter(sushi => sushi.visible).length < 4){
      let index = this.randomIndex(0, 100)
      if(!sushi[index].eaten){
        sushi[index].visible = true
      }
    }
    return sushi
  }

  randomIndex(start, end){
    return Math.floor(Math.random() * end) + start 
  }

  addToTable = selectedSushi => {
    if(this.state.budget >= selectedSushi.price){
      this.setState({
        budget: this.state.budget - selectedSushi.price,
        sushi: this.state.sushi.map( sushi => {
          if(sushi.id === selectedSushi.id){
            return { ...sushi, eaten: true }
          } else { 
            return sushi
          }
        })
      })
    }
  }

  getMoreSushi = () => {
    this.setState({
      sushi: this.selectFourRandomSushi(this.state.sushi.map( sushi => ({ ...sushi, visible: false})))
    })
  }

  render() {
    let visibleSushi = this.state.sushi.filter( sushi => sushi.visible)
    let eatenSushi = this.state.sushi.filter( sushi => sushi.eaten )
    console.log('Visible', visibleSushi)
    console.log('Eaten', eatenSushi)
    return (
      <div className="app">
        <SushiContainer sushi={visibleSushi} addToTable={this.addToTable} getMoreSushi={this.getMoreSushi} />
        <Table sushi={eatenSushi} budget={this.state.budget} />
      </div>
    );
  }
}

export default App;