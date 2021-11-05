import './App.sass';
import { useEffect, useState } from 'react';

import Card from './components/Card'

function App() {

  const [apiData, setApiData] = useState(null)

  // NASA Apod API Call
  const apiCall = async () => {
    const k = `MdAdCzvrJrRNJyv0elbkdWQw3MtPf2Ll8OdXAMMZ`
    const url = `https://api.nasa.gov/planetary/apod?api_key=${k}&count=12`
    const response = await fetch(url)
    const data = await response.json()

    setApiData(data)
  }

  useEffect(() => { apiCall() }, [])

  const randomAdjective = () => {
    const adj = ['amazing', 'cool', 'vast']
    return adj[(Math.floor(Math.random() * adj.length))]
  }

  return (
    <div className="App">
      <h1>The Universe is {randomAdjective()}</h1>
      <div className="gallery">
      {apiData !== null &&
        apiData.map((item,index) => <Card key={index} details={item}/>)
      }  
      </div>
    </div>
  );
}

export default App;
