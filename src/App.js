import React, { Component } from 'react';
import {Route, Link, NavLink, BrowserRouter} from 'react-router-dom';

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
      photos: [],
      query: ''
    };
  }

  componentDidMount(){
    this.performSearch()
  }

  performSearch = async (query = 'cats') =>{
    try{
      const response = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`);
      const responseData = await response.json();
      this.setState({ photos: responseData.photos.photo });
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

          <div className="photo-container">
            <h2>Results</h2>
            <PhotoContainer data={this.state.photos} />
          </div>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
