import React from 'react';
import './index.css'
import AnalysisElement from './modules/analysisElement';

function App() {
  return (
    <>
      <h1>Image analysis and generator by Topocai</h1>
      <div className='selector-handler'>
        <AnalysisElement />
        <section className='selectors image-generator-selector'>
          <h2>Image Generator</h2>
          <span>Put a prompt and generate an image!</span>
        </section>
        
      </div> 
    </>
  )
}

export default App;
