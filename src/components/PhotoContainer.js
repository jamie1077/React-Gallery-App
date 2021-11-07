import React, {Component} from 'react';
import Photo from './Photo';
import NoResults from './NoResults';


export default class PhotoContainer extends Component {
  render() {
    const results = this.props.data;
    let photos;
  
    if(results.length > 0){
      photos = results.map(photo => 
        <Photo url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`}
          title={photo.title}
          key={photo.id}
        />
      );
    }else{
      photos = <NoResults />
    }

    return(
      <div className="photo-container">
      <h2> Results for {this.props.query}</h2>
      <ul>
        {photos}
      </ul>
    </div>
    )
  }
}
