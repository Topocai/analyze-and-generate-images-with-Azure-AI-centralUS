
import { useState, useRef } from "react"
import './styles/generator-element.css'

import { generateImage } from "../resources/image-generator";

const ResolutionOption = ({ resolution = "256x256", selected = false, onElementClick }) => {
    const refElement = useRef(null);
    
    const handleClick = () => {
        const elementos = document.querySelectorAll(`.resolution-option`);
        onElementClick(elementos, refElement.current.name);
        refElement.current.classList.add('is-selected');
    }

    const classes = selected ? "resolution-option is-selected" : "resolution-option";

    return (
        <button name={resolution} className={classes} onClick={handleClick} ref={refElement}>
            <img src="/checked-tick.svg" alt=""></img>
            <span>{resolution}</span>
        </button>
    )
}

const DownloadButton = () => {
    return (
        <button>
            <img src="/download-icon.svg" alt=""></img>
        </button>
    )

}

const resolutions = [
    "256x256",
    "512x512",
    "1024x1024",
]

export default function GeneratorElement() {
    const [resolutionSelected, setResolution] = useState(resolutions[0]);
    const [description, setDescription] = useState("");

    function changeImage(imageUrl) {
        document.getElementsByClassName('generator-image-container')[0].style.backgroundImage = `url('${imageUrl}')`;
    }

    const getResolutions = (elements, currentName) => {
        if (resolutionSelected === currentName) return;

        elements.forEach(element => {
            element.classList.remove('is-selected');
        });
        setResolution(currentName);
        console.log(currentName)
        let resolution = currentName.slice(currentName.indexOf("x")+1, currentName.length);
        changeImage(`https://via.placeholder.com/${resolution}`);
    }

    const handleClick = async () => {
        const prompt = document.getElementById('user-image-prompt').value;
        await generateImage({prompt: prompt, size: resolutionSelected}).then((generated) => { 
            console.log(generated);
            changeImage(`${generated.data[0].url}`);
        })
        .catch((error) => {
            changeImage("../../../public/error.svg");
            setDescription("This function is not available right now, please try again later.");
        });
        
    }

    console.log("Is selected: ", resolutionSelected)

    return (
        <section className="selectors image-generator-selector" >
            <h2>Generator</h2>
            <span>Generate a image with a prompt!</span>
            <div className="generator-inputs">
                <div className="generator-buttons-container">
                    {resolutions.map((resolution, index) => {
                        return <ResolutionOption onElementClick={getResolutions} key={resolution.slice(resolution.indexOf("x")+1, resolution.length)} resolution={resolution} selected={index === 0} />
                    })}
                    
                </div>
                <button onClick={handleClick}>Generate!</button>
                <div className="prompt-container">
                    <input className="user-input" type="text" placeholder="Put a prompt here" id="user-image-prompt"></input>
                </div>
                <div className="image-container generator-image-container">
                    <DownloadButton></DownloadButton>
                </div>
            </div>
            <span><small>{description}</small></span>
        </section>
    )
}