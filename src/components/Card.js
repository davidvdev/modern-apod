import { useState, useRef, useEffect } from 'react'
import './Card.sass'

const Card = ({ details }) => {
    const [isVisible, setIsVisible] = useState(false)
    const domRef = useRef()

    useEffect(()=>{
        const options = {
            rootMargin: '0px',
            threshold: 0.75
        }
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setIsVisible(true)
            })
        },options)
        observer.observe(domRef.current)
        return () => observer.unobserve(domRef.current)
    },[])


    return (
        <div
             
            className={`card ${isVisible? 'isvisible': ''}`}
        >
            <h2>{details.title}</h2>
            <img src={details.url} alt={details.title} ref={domRef} />
            <p>{details.explanation}</p>
            <div className="card-meta">
                <span>{details.date}</span>
                {details.copyright !== undefined && <span>{details.copyright}</span>}
            </div>
        </div>
    )
}

export default Card