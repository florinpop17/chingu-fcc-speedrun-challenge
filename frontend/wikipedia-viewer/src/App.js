import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      wiki : undefined,
      wikiSimple: undefined
    }

    this.getWiki = this.getWiki.bind(this);
  }
  getWiki() {
    let title = 'Cristiano'
    fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${title}&format=json&origin=*`)
    .then((response) => {
      this.setState({wikiSimple:response});
      return response.json()
    }).then((response) => {
      this.setState({wiki:response});
    })
  }
  render() {

    let {wiki, wikiSimple} = this.state;

    console.log(wiki);
    console.log(wikiSimple);

    return (
      <div>
        <button onClick={ this.getWiki }>Get wiki</button>
      </div>
    );
  }
}

export default App;
