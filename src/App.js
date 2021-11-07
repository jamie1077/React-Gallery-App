import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

//flickr api key
import apiKey from './config';

//app components
import SearchForm from './components/Search';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import PageNotFound from './components/PageNotFound';

class App extends Component {

  constructor() {
    super();
    this.state = {
      cats: [],
      dogs: [],
      birds: [],
      photos: [],
      searchQuery: '',
      loading: true
    };
  }

  componentDidMount() {
    const defaultTags = ["cats", "dogs", "birds"]
    defaultTags.map((tag) => this.getData(tag, true))
  }

  getData = (query, isNav) =>{
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      isNav ? 
        this.setState({
          [query]: response.data.photos.photo,
          loading: false
        })
      : this.setState({
          photos: response.data.photos.photo,
          searchQuery: query,
          loading: false
        })
    })
    .catch((error) => {
      console.log('Error fetching and passing data', error)
    });
  }

  render(){
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.getData} /> 
          <Nav />

          {
            (this.state.loading) ? <h2>Loading...</h2> :
            (
              <Switch>
                <Route exact path="/" render={ () => <Redirect to="/cats" />} />
                <Route path="/cats" render={ () => <PhotoContainer query="cats" data={this.state.cats} /> } />
                <Route path="/dogs" render={ () => <PhotoContainer query="dogs" data={this.state.dogs} /> } />
                <Route path="/birds" render={ () => <PhotoContainer query="birds" data={this.state.birds} /> } />
                <Route path="/:query" render={ () => <PhotoContainer query={this.state.searchQuery} data={this.state.photos} /> } />
                <Route component={PageNotFound} /> 
              </Switch>
            )
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;