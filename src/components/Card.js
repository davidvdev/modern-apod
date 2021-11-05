import { useState, useRef, useEffect } from 'react'
import './Card.sass'

const Card = ({ details }) => {
    const [isVisible, setIsVisible] = useState(true)
    const domRef = useRef()

    useEffect(()=>{
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setIsVisible(entry.isIntersecting))
        })
        observer.observe(domRef.current)
        // return () => observer.unobserve(domRef.current)
    },[])


    return (
        <div
            ref={domRef} 
            className={`card ${isVisible? 'isvisible': ''}`}
        >
            <h2>{details.title}</h2>
            <img src={details.url} alt={details.title} />
            <p>{details.explanation}</p>
            <div className="card-meta">
                <span>{details.date}</span>
                {details.copyright !== undefined && <span>{details.copyright}</span>}
            </div>
        </div>
    )
}

export default Card