import React, { useState } from 'react';
import { analyzeImageFromUrl } from '../resources/image-analysis';
import './analysis-element.css';

const LoadingElement = () => {
  return (
    <div className='loading-element'>
      <div className='loading-element-circle'></div>
      <div className='loading-element-circle'></div>
      <div className='loading-element-circle'></div>
    </div>
  )
}

const checkUrl = (url) => {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
}

export default function AnalysisElement() {
    const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/250');
    const [caption, setCaption] = useState('Results would be here');
    const [buttonContent, setButtonContent] = useState('Analyze!');

    const handleButton = async () => {
        const inputUrl = document.getElementById('analysis-url').value;
        const pulserElement = document.getElementById('url-pulser');

        if(inputUrl.trim() === '') {
          setCaption('Please, put an image url to analyze.');
          setImageUrl('https://via.placeholder.com/512');
          pulserElement.classList.add('url-pulser-animation');
          return;
        }

        checkUrl(inputUrl).then((result) => {
          if(!result) {
            setCaption('I can\'t reach the image, please check the url and try again.');
            setImageUrl('https://via.placeholder.com/512');
            pulserElement.classList.add('url-pulser-animation');
            return;
          }    
        });

        pulserElement.classList.remove('url-pulser-animation');
        const image = document.getElementsByClassName('analyzed-image')[0];

        setButtonContent(<LoadingElement />);
        
        const captionGetted = await analyzeImageFromUrl(inputUrl);

        setImageUrl(inputUrl);
        setCaption(captionGetted)

        image.classList.add('image-spawn');
        setButtonContent('Analyze!');
        setTimeout(() => {
          image.classList.remove('image-spawn');
        }, 1200);
    }
    return (
        <section className='selectors image-analysis-selector'>
          <h2>Image analysis</h2>
          <span>Analyse an image an returns a caption!</span>
          <div className='analysis-inputs'>
            <img src={imageUrl} alt='' className='analyzed-image'></img>
            <div className='caption-container'>
              <span>{caption}</span>
            </div>
            <div id='url-pulser'>
              <input type='text' placeholder='Put an image url' id='analysis-url' required></input>
            </div>
            <button onClick={handleButton}>{buttonContent}</button>
          </div>
        </section>
    )
}