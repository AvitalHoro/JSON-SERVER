import React, { useEffect, useState } from 'react';
import ImageSlider from './ImageSlider';
import { IoIosAdd } from "react-icons/io";

const PhotosAlbum = ({ album, setAlbumPhotosVisible }) => {
  const API_URL = `http://localhost:3000/photos`;
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  // const photos = [
  //   "https://via.placeholder.com/150/92c952", 
  //   "https://via.placeholder.com/150/92c952", 
  //   "https://via.placeholder.com/150/771796", 
  //   "https://via.placeholder.com/150/771796",
  //   "https://via.placeholder.com/150/92c952", 
  //   "https://via.placeholder.com/150/92c952", 
  //   "https://via.placeholder.com/150/771796", 
  //   "https://via.placeholder.com/150/771796",
  // ];

  useEffect(() => {
    async function getCurrentPhotos(cur_index) {
      try {
        console.log("album id in get photos",album.id, cur_index);
          const response = await fetch(`${API_URL}?albumId=${album.id}&_start=${cur_index}&_limit=3`);
          const data = await response.json();
          console.log("photo data res",data);
          //.map(photo  => (photo.thumbnailUrl))
          setPhotos(data);
      } catch (error) {
          console.error('Error fetching albums:', error);
      }
  }
  getCurrentPhotos(currentIndex);

  }, [currentIndex, album]);

  const handleUpdatePhoto = async (updatedPhoto) => {
    try {

        // const { serialNum, ...albumWithoutSerialNum } = updatedPhoto;

        const response = await fetch(`${API_URL}/${updatedPhoto.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPhoto),
        });

        if (!response.ok) {
            throw new Error('Failed to update album');
        }

        const data = await response.json();
        setPhotos(photos.map(img => (img.id === data.id ? data : img)));
    } catch (error) {
        console.error('Error updating album:', error);
    }
};

const handleDeletePhoto = async (id) => {
  try {
      const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
      });

      if (!response.ok) {
          throw new Error('Failed to delete photo');
      }

      setPhotos(photos.filter(photo => photo.id !== id));
      SetCurrentIndex(prevCurrentIndex => prevCurrentIndex - 1);
  } catch (error) {
      console.error('Error deleting photo:', error);
  }
};

const handleAddPhoto = async (newPhoto) => {
  try {
      const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPhoto),
      });

      if (!response.ok) {
          throw new Error('Failed to add photo');
      }

      const addedPhoto = await response.json();
      setPhotos([...photos, addedPhoto]);
  } catch (error) {
      console.error('Error adding photo:', error);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('submitting', title, url, album.id);
  handleAddPhoto({
    "albumId": album.id,
    "title": title,
    "thumbnailUrl": url,
  });
  setUrl('');
  setTitle('');
};



  return (
    album ? ( 
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      alignItems: 'center',
    
    }}>
      <h2>{album.title}</h2>
      <ImageSlider 
      images={photos} 
      setCurrentIndex={setCurrentIndex} 
      currentIndex={currentIndex} 
      handleUpdatePhoto={handleUpdatePhoto} 
      handleDeletePhoto={handleDeletePhoto}
       />

<form 
onSubmit={handleSubmit} 
className='todo-item'  
style={{backgroundColor: '#88E1D1'}}>
<button className='add-button' type="submit"><IoIosAdd/></button>
    <div style={{
      display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  }}>
      <input
      className='todo-title'
      style={{fontSize: '1em'}}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
        required
      />
            <input
      className='todo-title'
      style={{fontSize: '1em'}}
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="link to your image"
        required
      />
      </div>
    </form>
      <button onClick={()=>setAlbumPhotosVisible(false)}>Close</button>
    </div> ) : (<div>Loading...</div>)
  );
};

export default PhotosAlbum;
