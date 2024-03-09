import React from 'react';
import './index.css'
import AnalysisElement from './modules/analysisElement';

function App() {
  return (
    <>
      <header>
        <h1>Image analysis and generator by Topocai</h1>
      </header>
      <main>
        <div className='selector-handler'>
          <AnalysisElement />  
        </div> 
      </main>
    </>
  )
}

export default App;
