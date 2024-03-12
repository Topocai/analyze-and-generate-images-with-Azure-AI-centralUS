import React, { useState } from 'react';
import { analyzeImageFromUrl } from '../resources/image-analysis';
import './styles/analysis-element.css';
import LoadingElement from './loadingElement';

const removeAnimations = (elements) => {
  elements.forEach(element => 
  {
    if(element.classList.contains('caption-container'))
      element.classList.remove('caption-container-spawn');

    if(element.classList.contains('image-container'))
      element.classList.remove('caption-container-spawn');

    if(element.classList.contains('url-pulser'))
      element.classList.remove('url-pulser-animation');
  });
}

const executeAnimations = (elements) => 
{
  removeAnimations(elements);
  setTimeout(() => 
  {
    elements.forEach(element => 
    {
      if(element.classList.contains('caption-container'))
        element.classList.add('caption-container-spawn');

      if(element.classList.contains('image-container'))
        element.classList.add('image-spawn');

      if(element.classList.contains('url-pulser')) 
        element.classList.add('url-pulser-animation');
    });
  }, 1);
    
}

export default function AnalysisElement() {
    const [caption, setCaption] = useState('Results would be here');
    const [buttonContent, setButtonContent] = useState('Analyze!');

    async function handleButton() 
    { 
        const inputUrl = document.getElementById('analysis-url').value;
        const image = document.getElementById('analysis-image-id');

        const captionContainer = document.getElementsByClassName('caption-container')[0];
        const pulserElement = document.getElementsByClassName('url-pulser')[0];
  
        function errorDisplay(message = "I can't reach the image, please check the url and try again.") 
        {
          setCaption(message);

          image.style.backgroundImage = `url(https://via.placeholder.com/512)`;
          captionContainer.lastChild.style.animation = 'caption-alert 1s cubic-bezier(0.39, 0.58, 0.57, 1) infinite alternate';

          executeAnimations([captionContainer, pulserElement]);
        }

        setButtonContent(<LoadingElement />);

        analyzeImageFromUrl(inputUrl)
        .then(async (captionGetted) => 
        {

          image.style.backgroundImage = `url(${inputUrl})`;
          captionContainer.lastChild.style.animation = `caption-text 2s infinite alternate`;

          setCaption(captionGetted);
          setButtonContent('Analyze!');
          removeAnimations([captionContainer, pulserElement]);
          await executeAnimations([captionContainer, image]);
          

        }).catch(async (error) => {
          errorDisplay(error.message);
          setButtonContent('Analyze!');
          await executeAnimations([captionContainer, image, pulserElement]);
        });
    }

    return (
        <section className='selectors image-analysis-selector'>
          <h2>Image analysis</h2>
          <span>Analyse an image an returns a caption!</span>
          <div className='analysis-inputs'>
            <div className='image-container analysis-bs-color analysis-b-color' id='analysis-image-id'></div>           
            <div className='caption-container analysis-b-color'>
              <img src='/photo-svgrepo-com.svg' alt=''></img>
              <span>{caption}</span>
            </div>
            <div className='url-pulser'>
              <input className='user-input' type='text' placeholder='Put an image url' id='analysis-url' required></input>
            </div>
            <button onClick={handleButton}>{buttonContent}</button>
          </div>
        </section>
    )
}