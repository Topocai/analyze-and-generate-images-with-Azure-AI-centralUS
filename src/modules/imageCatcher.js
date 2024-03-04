import React, { useState } from 'react';

const ImageCatcher = () => {
    const [inputText, setInputText] = useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleButton1Click = () => {
        // Function to execute when Button 1 is clicked
        console.log('Button 1 clicked with input:', inputText);
    };

    const handleButton2Click = () => {
        // Function to execute when Button 2 is clicked
        console.log('Button 2 clicked with input:', inputText);
    };

    return (
        <div>
            <h1>Image Catcher</h1>
            <input type="text" value={inputText} onChange={handleInputChange} placeholder='Put an image url'/>
            <button onClick={handleButton1Click}>Button 1</button>
            <button onClick={handleButton2Click}>Button 2</button>
        </div>
    );
};

export default ImageCatcher;