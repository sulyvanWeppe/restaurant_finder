import React from 'react';
import '../uikit-3.4.6/css/uikit.min.css';

class PlaceName extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <h3 class="uk-heading-small">{this.props.place_name}</h3>
        )
    }
}

export default PlaceName;