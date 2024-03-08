import React, { useState } from 'react';
import { analyzeImageFromUrl } from '../resources/image-analysis';

const ImageCatcher = () => {
    const [inputText, setInputText] = useState('');
    const [analysisCaption, setCaption] = useState('Results would be here')

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleButton = async (buttonType) => {
        if (buttonType === 'analize') {
            const response = await analyzeImageFromUrl(inputText);
            setCaption(response);
        } else if(buttonType === 'generate'){
            console.log('Button 2 clicked');
        }
    };

    return (
        <article>
            <div>
            <h1>Image Catcher</h1>
            <img src={inputText} alt=''></img>
            <input type="text" value={inputText} onChange={handleInputChange} placeholder='Put an image url'/>
            <button onClick={() => handleButton("analize")}>Analyze</button>
            <button onClick={() => handleButton("generate")}>Generate</button>
            <article>
                <span>{analysisCaption}</span>
            </article>
        </div>
        </article>
        
    );
};

export default ImageCatcher;