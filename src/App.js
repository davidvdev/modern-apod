import './App.sass';
import { useEffect, useState, useRef } from 'react';

import Card from './components/Card'

function App() {

  const [apiData, setApiData] = useState(null)
  // const [rerender, setRerender] = useState(0)
  const domRef = useRef()

  // NASA Apod API Call
  const apiCall = async () => {
    console.log('API CALL')
    const k = `MdAdCzvrJrRNJyv0elbkdWQw3MtPf2Ll8OdXAMMZ`
    const url = `https://api.nasa.gov/planetary/apod?api_key=${k}&count=2`
    const response = await fetch(url)
    const data = await response.json()

    apiData? setApiData([...apiData, ...data]): setApiData(data)
  }

  useEffect(() => { apiCall() }, [])
  // if( apiData !== null){
  //   const observer = new IntersectionObserver(entries => {
  //     entries.forEach(entry => {
  //         if (entry.isIntersecting){ apiCall()}
  //     })
  //   })
  //   observer.observe(domRef.current)
  //   return () => observer.unobserve(domRef.current)
  // }

  const randomAdjective = () => {
    const adj = ['amazing', 'cool', 'vast']
    return adj[(Math.floor(Math.random() * adj.length))]
  }

  return (
    <div className="App">
      <header></header>
      <h1>The Universe is <span className="adj">{randomAdjective()}</span></h1>
      <div className="gallery" ref={domRef}>
      {apiData !== null &&
        apiData.map((item,index) => <Card key={index} details={item}/>)
      }  
      </div>
      <button onClick={() => {
        apiCall()
        // setRerender(rerender + 1)
        }}>continue</button>
    </div>
  );
}

export default App;
