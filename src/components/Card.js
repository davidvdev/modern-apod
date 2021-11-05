
const Card = ({ details }) => {
    return (
        <div className="card">
            <h3>{details.title}</h3>
            <img src={details.url} alt={details.title} />
            <p>{details.explanation}</p>
            <span>{details.date}</span>
            <span>{details.copyright}</span>
        </div>
    )
}

export default Card