import React from 'react'

function Yoga(props) {
    return (
        <div key={props.key} className='yoga'>
            <h1>{props.header}</h1>
            <div className='yoga-pic'>
                <img src={props.src} alt={props.alt} />
            </div>
            <p>{props.paragraph}</p>
        </div>
    )
}

export default Yoga;

/*function Yoga(props) {
    return (
        <div className='yoga'>
            <h1>Yoga</h1>
            <div className='yoga-pic'>
                <img src='/images/yoga.png' alt='Yoga' />
            </div>
            <p>Melakukan Yoga selama 30 menit dalam sehari akan membuat tubuh anda menjadi lebih rileks dan juga membuat tidur anda lebih berkualitas.</p>
        </div>
    )
} */