import React from 'react';
import '../uikit-3.4.6/css/uikit.min.css';
import CountryManagement from './CountryManagement';
import PlaceDescription from './PlaceDescription';
import * as ArrayUtil from "../Util/ArrayUtil.js";
import * as MapsUtil from "../Util/MapsUtil.js";
import GoogleApi from '../API/GoogleApi';
import Toto from './Toto.js';
import '../index.css';
import '../uikit-3.4.6/css/uikit.min.css';
import { Container, Row, Col } from 'react-bootstrap';


class SearchAndResultSection extends React.Component{
    constructor(props){
        super(props);

        var countries = ['French', 'Italian', 'Spanish', 'American', 'Mexican'];
        //Get Random country from the countries list
        var randomCountry = ArrayUtil.getRandomElement(countries); 
        this.state = {
            userCountryInput: randomCountry ? randomCountry : '',
            countriesList: countries, 
            map: null,
            mapMarkers: null,
            requestResult: null
        };
    }

    initMapState = (initMap) => {
        this.setState({map: initMap});
    }

    performPlaceRequest = (country) => {
        if (!country)
        {
            return;
        }
        //Initialize variable
        const currentMap = this.state.map;
        const infoWindow = new window.google.maps.InfoWindow();
        const originLocation = new window.google.maps.LatLng(49.5990, 6.1330);
        const maxDistance = 1000;
        const request = {
            query: country+' restaurant',
            location: originLocation,
            type: 'restaurant'
        };
        var service = new window.google.maps.places.PlacesService(currentMap);
        var that = this;

        //Perform request
        service.textSearch(request, function(results, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                //Empty previous result
                that.setState({requestResult: null});
                MapsUtil.removeMarkersFromMap(currentMap, that.state.mapMarkers);
                that.setState({mapMarkers: null});

                for (var i = 0; i < results.length; i++) {
                    //Check if it is in the authorized perimeter
                    var distanceFromOrigin = window.google.maps.geometry.spherical.computeDistanceBetween(originLocation, results[i].geometry.location);
                    if (distanceFromOrigin <= maxDistance)
                    {                     
                        const place = results[i];
                        const placeInfo = {place: place, distanceFromOrigin: distanceFromOrigin};
                        //Store the place info
                        that.setState((prevState) => 
                        {
                            if (!prevState.requestResult)
                            {
                                return {requestResult: [placeInfo]};
                            }
                            else {
                                return {requestResult: ArrayUtil.sortPlaces([...prevState.requestResult, placeInfo], 'rating')};
                            }
                        });
                        
                                                
                        //Set Marker on the Map
                        var marker = MapsUtil.setFullMarker(currentMap, placeInfo, infoWindow);
                        that.setState((prevState) => {
                            if (!prevState.mapMarkers)
                            {
                                return {mapMarkers: [marker]};
                            }
                            else {
                                return {mapMarkers: [...prevState.mapMarkers, marker]};
                            }
                        });
                    }
                }
            }
        });

    }

    updateSelectedCountry = (country) => {
        //Update state
        this.setState({userCountryInput: country});
        //Perform request based on the newly selected country
        this.performPlaceRequest(country);
        
    }

    addCountryToList = (country) => {
        this.setState((prevState) => ({countriesList: [...prevState.countriesList, country]}));
    }

    deleteCountryFromList = (country) => {
        this.setState((prevState) => {
            const newList = Array.from(prevState.countriesList);
            newList.splice(newList.indexOf(country),1);
            return {countriesList: newList};
        });
    }

    render(){
        return (
            <Container>
                <Row>
                    <Col sm={4}>
                        <CountryManagement  countriesList={this.state.countriesList} 
                                                    selectedCountry={this.state.userCountryInput} 
                                                    handleRefresh={this.updateSelectedCountry} 
                                                    handleAddCountry={this.addCountryToList} 
                                                    handleDeleteCountry={this.deleteCountryFromList}/>  
                    </Col>
                    <Col>
                        <PlaceDescription   place={this.props.place}
                                                    initMapState={this.initMapState}
                                                    initRequestFunction={this.performPlaceRequest}
                                                    initRequestCountry={this.state.userCountryInput}
                                                    requestResult={this.state.requestResult}/> 
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SearchAndResultSection;