import React from 'react';
import '../uikit-3.4.6/css/uikit.min.css';
import PlaceDescriptionCard from './PlaceDescriptionCard';
import GoogleApi from '../API/GoogleApi';
import { Container, Col, Row } from 'react-bootstrap';

class PlaceDescription extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const results = this.props.requestResult;
        var displayPlacesInfo = null;
        var displayPlacesInfo1 = null;
        var displayPlacesInfo2 = null;

        if (!results || results.length === 0)
        {
            displayPlacesInfo = null;
        }
        else{
            var displayPlaces = results.map((placeInfo, index) => 
            <li key={index}>
                <PlaceDescriptionCard placeInfo={placeInfo} />
            </li>);

            for (var i=0; i<displayPlaces.length; i++)
            {
                var displayPlace = displayPlaces[i];
                if (i%2 == 0)
                {
                    displayPlacesInfo1 = displayPlacesInfo1 ? [...displayPlacesInfo1, displayPlace] : [displayPlace];
                }
                else
                {
                    displayPlacesInfo2 = displayPlacesInfo2 ? [...displayPlacesInfo2, displayPlace] : [displayPlace];
                }

            }
            //displayPlacesInfo = <ul>{displayPlaces}</ul>;
        }


        return (
            <Container id="place_description">
                <Row>
                    <GoogleApi initMapState={this.props.initMapState} initRequestFunction={this.props.initRequestFunction} initRequestCountry={this.props.initRequestCountry}/>
                </Row>
                <Row id="result_cards">
                    <Col><ul>{displayPlacesInfo1}</ul></Col>
                    <Col><ul>{displayPlacesInfo2}</ul></Col>
                </Row>
            </Container>
        )
    }
}

export default PlaceDescription;