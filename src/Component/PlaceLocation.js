import React from 'react';
import '../uikit-3.4.6/css/uikit.min.css';

class PlaceLocation extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <p>Location : {this.props.place_location}</p>
        )
    }
}

export default PlaceLocation;