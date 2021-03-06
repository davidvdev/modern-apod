import './App.sass';
import { useEffect, useState, useRef } from 'react';

import Card from './components/Card'

function App() {

  const [feedEnd, setFeedEnd] = useState(false)
  const [apiData, setApiData] = useState(null)
  const [adj, setAdj] = useState('...')
  const domRef = useRef()

  // NASA Apod API Call
  const apiCall = async () => {
    console.log('API CALL')
    const k = `MdAdCzvrJrRNJyv0elbkdWQw3MtPf2Ll8OdXAMMZ`
    const url = `https://api.nasa.gov/planetary/apod?api_key=${k}&count=12`
    const response = await fetch(url)
    const data = await response.json()
    console.log(apiData)
    console.log(data)
    apiData == null ? setApiData(data): setApiData([...apiData, ...data])
  }

  useEffect(() => { apiCall() }, [feedEnd])
  useEffect(() => {setInterval(randomAdjective, 3000)},[])
  useEffect(()=>{
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) setFeedEnd(bool => !bool)
        })
    })
    observer.observe(domRef.current)
    return () => observer.unobserve(domRef.current)
  },[])  

  const randomAdjective = () => {
    const adj = [
      'amazing', 'cool', 'vast', 'grand', 'stellar', 'neat', 'incredible', 'inspiring', 'big', 'very good', 'great', 'wild'
    ]
    setAdj(adj[(Math.floor(Math.random() * adj.length))])
  }

  return (
    <div className="App">
      <header></header>
      <h1>The Universe is <span className="adj">{adj}</span></h1>
      <div className="gallery">
      {apiData !== null &&
        apiData.map((item,index) => <Card key={index} details={item}/>)
      }  
      </div>
      <div id={'feed-end'} ref={domRef}/>
    </div>
  );
}

export default App;
