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
    this.randomWiki = this.randomWiki.bind(this);
  }

  getWiki() {
    let query = this.refs.search.value || 'Main Page';
    fetch('https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&generator=search&prop=extracts|info&inprop=url&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+query)
    .then((response) => {
      return response.json()
    }).then((response) => {
      this.setState({wiki:response});
    })
  }

  randomWiki() {
    window.open('https://en.wikipedia.org/wiki/Special:Random');
  }

  componentDidMount() {
    this.getWiki();
  }

  render() {

    let wikiList = [];
    let {wiki} = this.state;

    if(wiki){

      let pages = wiki.query.pages;
      for(let id in pages){
        var { title, extract, fullurl : url} = pages[id];
        wikiList.push(<li key={id}> <h3>{title}</h3> <p>{extract}</p> <a target="_blank" href={url}> <i className="fa fa-angle-right fa-2x"></i> </a></li>)
      }
      console.log(wiki);

    }

    return (
      <div className="container">
        <div className="actions">
          <input type="text" placeholder="Search wikipedia" ref="search" onChange={ this.getWiki }/>
          <button onClick={ this.randomWiki }><i className="fa fa-random"></i></button>
        </div>
        <ul>
          { wikiList }
        </ul>
      </div>
    );
  }
}

export default App;
