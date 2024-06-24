// ImageCard.js
import React from 'react';
import '../css/ImageCard.css';
import { DeleteIcon } from '@chakra-ui/icons';


const ImageCard = ({ className, onClick, img, handleUpdatePhoto, handleDeletePhoto }) => {


  
    return (
        <div className="image-card" style={{height: '124px'}} onClick={onClick}>

<div className="photo-overlay">
        <div className="content">
        <textarea
    className='todo-title'
    style={{
        width: '90%',
        fontSize: '1rem',
        textAlign: 'center',
        padding: '1px',
        margin: '0.5px',
        resize: 'none', // This prevents the user from resizing the textarea
        overflow: 'hidden', // This hides the scrollbars
    }}
    value={img.title}
    rows={3} // Set the initial number of rows to display
    onChange={(e) => handleUpdatePhoto({ ...img, title: e.target.value })}
></textarea>
                <button className='delete-button' onClick={() => handleDeletePhoto(img.id)}><DeleteIcon style={{color: 'white'}}/></button>
        </div>
        </div>
            <img className={`${className} responsive-image`} src={img.thumbnailUrl} alt="Slide" />
        </div>
    );
};

export default ImageCard;
