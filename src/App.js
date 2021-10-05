import React, { Component } from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

//flickr api key
import apiKey from './config';

//app components
import SearchForm from './components/Search';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';


class App extends Component {

  constructor() {
    super();
    this.state = {
      query: '',
      cats: [],
      dogs: [],
      birds: [],
      photos: [],
      loading: true
    };
  }

  componentDidMount() {
    const defaultLinks = ["cats", "dogs", "birds"]
    defaultLinks.map((link) => this.performSearch(link, false))
  }

  performSearch = async (query, isNewData) =>{
    try{
      const response = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`);
      const responseData = await response.json();
      isNewData
          ? this.setState({
              photos: responseData.photos.photo,
              searchInput: query,
              loading: false,
            })
          : this.setState({
              [query]: responseData.photos.photo,
              loading: false,
            })
      
    } catch (error){
      console.log('Error fetching and parsing data', error);
    }
  }

  render(){
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} /> 
          <Nav />

          {
            (this.state.loading) ? <h3>Loading...</h3> :
            (
              <Switch>
                <Route exact path="/" render={ () => <Redirect to="/cats" />} />
                <Route path="/cats" render={ () => <PhotoContainer query="cats" data={this.state.cats} /> } />
                <Route path="/dogs" render={ () => <PhotoContainer query="dogs" data={this.state.dogs} /> } />
                <Route path="/birds" render={ () => <PhotoContainer query="birds" data={this.state.birds} /> } />
                <Route path="/search/:query" render={ () => <PhotoContainer query={this.state.query} data={this.state.photos} /> } />
              </Switch>
            )
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
