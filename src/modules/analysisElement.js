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

export default function AnalysisElement() {
    const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/250');
    const [caption, setCaption] = useState('Results would be here');
    const [buttonContent, setButtonContent] = useState('Analyze!');

    const handleButton = async () => {
        const inputElement = document.getElementById('analysis-url');
        const inputUrl = inputElement.value;

        const image = document.getElementById('user-image');

        setButtonContent(<LoadingElement />);
        
        const captionGetted = await analyzeImageFromUrl(inputUrl);

        setImageUrl(inputUrl);
        setCaption(captionGetted)

        image.animate([ {scale: 0, opacity: 0}, {scale: 0.5, opacity: 0.5}, {scale: 1, opacity: 1} ], {duration: 1000, iterations: 1, fill: 'forwards', easing: 'ease-in-out'});
        setButtonContent('Analyze!');
    }
    return (
        <section className='selectors image-analysis-selector'>
          <h2>Image analysis</h2>
          <span>Analyse an image an returns a caption!</span>
          <div className='analysis-inputs'>
            <img src={imageUrl} alt='' id='user-image'></img>
            <div className='caption-container'>
              <span>{caption}</span>
            </div>
            <input type='text' placeholder='Put an image url' id='analysis-url' required></input>
            <button onClick={handleButton}>{buttonContent}</button>
          </div>
        </section>
    )
}