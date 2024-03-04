import React, { useState } from 'react';
import { analyzeImageFromUrl } from '../resources/image-analysis';

const ImageCatcher = () => {
    const [inputText, setInputText] = useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleButton = async (buttonType) => {
        if (buttonType === 'analize') {
            const response = await analyzeImageFromUrl(inputText);
            console.log(response)
        } else if(buttonType === 'generate'){
            console.log('Button 2 clicked');
        }
    };

    return (
        <div>
            <h1>Image Catcher</h1>
            <input type="text" value={inputText} onChange={handleInputChange} placeholder='Put an image url'/>
            <button onClick={() => handleButton("analize")}>Analyze</button>
            <button onClick={() => handleButton("generate")}>Generate</button>
        </div>
    );
};

export default ImageCatcher;