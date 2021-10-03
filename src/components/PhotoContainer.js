import React from 'react';
import Photo from './Photo';
import NoResults from './NoResults';


const PhotoContainer = (props) => {

  const results = props.data;
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
    <ul>
      {photos}
    </ul>
  )
}

export default PhotoContainer;