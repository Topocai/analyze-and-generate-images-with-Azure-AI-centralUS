import React from 'react';
import './index.css';
import './modules/styles/global-styles.css';
import AnalysisElement from './modules/analysisElement';
import GeneratorElement from './modules/generatorElement';

function App() {
  return (
    <>
      <header>
        <h1>Image analysis and generator by Topocai</h1>
      </header>
      <main>
        <div className='selector-handler'>
          <AnalysisElement />
          <GeneratorElement />
        </div> 
    </main>
    </>
  )
}

export default App;
