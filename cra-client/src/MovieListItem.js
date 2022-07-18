import React from 'react'

const MovieListItem = (props) => {
    const { text } = props;
    return (
        <div className='movie-list-item' onClick={props.handleClick}>
            <span className='movie-text'>{text}</span>
        </div>
    )
}

export default MovieListItem