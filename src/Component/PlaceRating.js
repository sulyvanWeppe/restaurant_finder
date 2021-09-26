import React from 'react';
import '../uikit-3.4.6/css/uikit.min.css';

class PlaceRating extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <p>Rating : {this.props.place_rating}</p>
        )
    }
}

export default PlaceRating;