import React, { useState } from 'react';
import { analyzeImageFromUrl } from '../resources/image-analysis';
import './analysis-element.css';

export default function AnalysisElement() {
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('Results would be here');

    const handleButton = async () => {
        const inputUrl = document.getElementById('analysis-url').value;
        setImageUrl(inputUrl);

        setCaption( await analyzeImageFromUrl(inputUrl))
    }

    return (
        <section className='selectors image-analysis-selector'>
          <h2>Image analysis</h2>
          <span>Analyse an image an returns a caption!</span>
          <div className='analysis-inputs'>
            <input type='text' placeholder='Put an image url' id='analysis-url'></input>
            <img src={imageUrl} alt=''></img>
            <span>{caption}</span>
            <button onClick={handleButton}>Analyze</button>
          </div>
        </section>
    )
}