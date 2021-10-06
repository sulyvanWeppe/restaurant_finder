import React from 'react';
import '../uikit-3.4.6/css/uikit.min.css';
import PlaceDescriptionCard from './PlaceDescriptionCard';
import GoogleApi from '../API/GoogleApi';
import PlaceDistance from './PlaceDistance';
import { Container, Col, Row } from 'react-bootstrap';

class PlaceDescription extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const results = this.props.requestResult;
        var displayPlacesInfo = null;
        if (!results || results.length === 0)
        {
            displayPlacesInfo = null;
        }
        else{
            var displayPlaces = results.map((placeInfo, index) => 
            <li key={index}>
                <PlaceDescriptionCard placeInfo={placeInfo} />
            </li>);
            displayPlacesInfo = <ul>{displayPlaces}</ul>;
        }

        return (
            <div class="uk-container uk-container-center" class="uk-width-1-1">
                <div class="uk-grid">
                    <div class="uk-width-1-1">
                        <GoogleApi initMapState={this.props.initMapState} initRequestFunction={this.props.initRequestFunction} initRequestCountry={this.props.initRequestCountry}/>
                        <div class="uk-column-1-2">
                            {displayPlacesInfo}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlaceDescription;