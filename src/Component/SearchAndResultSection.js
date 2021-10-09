import React from 'react';
import '../uikit-3.4.6/css/uikit.min.css';
import CountryManagement from './CountryManagement';
import PlaceDescription from './PlaceDescription';
import * as ArrayUtil from "../Util/ArrayUtil.js";
import * as MapsUtil from "../Util/MapsUtil.js";
import '../index.css';
import '../uikit-3.4.6/css/uikit.min.css';
import { Container, Row, Col, Alert } from 'react-bootstrap';


class SearchAndResultSection extends React.Component{
    constructor(props){
        super(props);

        var countries = ['French', 'Italian', 'Spanish', 'American', 'Mexican'];
        //Get Random country from the countries list
        var randomCountry = ArrayUtil.getRandomElement(countries); 
        this.state = {
            userLocation: {latitude: null, longitude: null},
            userCountryInput: randomCountry ? randomCountry : '',
            countriesList: countries, 
            map: null,
            mapMarkers: null,
            requestResult: null,
            orderBy: 'rating',
            maxDistance: '1000'
        };
    }

    componentDidMount = () => {
        const that = this;

        function initUserPosition(position){
            that.setState({userLocation: {latitude: position.coords.latitude, longitude: position.coords.longitude}});
        }

        function cancelApplicationUse(){
            alert('This application cannot work without your location');
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(initUserPosition, cancelApplicationUse);
        }
        else {
            alert('Sorry your browser does not support Geolocation');
        }
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
        const originLocation = new window.google.maps.LatLng(this.state.userLocation.latitude, this.state.userLocation.longitude);
        const maxDistance = this.state.maxDistance;
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
                                return {requestResult: ArrayUtil.sortPlaces([...prevState.requestResult, placeInfo], that.state.orderBy)};
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

    updateOrderBy = (selector) => {
        this.setState({orderBy: selector});
        ArrayUtil.sortPlaces(this.state.requestResult, selector);
    }

    updateRangeDistance = (distance) => {
        this.setState({maxDistance: distance});
        this.performPlaceRequest(this.state.userCountryInput);
    }


    render(){
        //Check if the user allowed the use of his location
        const isUserLocationAvailable = this.state.userLocation.latitude && this.state.userLocation.longitude;
        if (isUserLocationAvailable)
        {//The user allowed it
            return (
                <Container id="search_and_result_section">
                    <Row>
                        <Col sm={3}>
                            <CountryManagement  countriesList={this.state.countriesList} 
                                                        selectedCountry={this.state.userCountryInput} 
                                                        handleRefresh={this.updateSelectedCountry} 
                                                        handleAddCountry={this.addCountryToList} 
                                                        handleDeleteCountry={this.deleteCountryFromList}
                                                        handleOrderBy={this.updateOrderBy}
                                                        handleRange={this.updateRangeDistance}
                                                        distanceRangeValue={this.state.maxDistance}/>  
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
            );    
        }
        else 
        {//The user did not allow it
            return (
                <Container id="search_and_result_section">
                    <Row>
                        <Col sm={3}>
                            <CountryManagement  countriesList={this.state.countriesList} 
                                                        selectedCountry={this.state.userCountryInput} 
                                                        handleRefresh={this.updateSelectedCountry} 
                                                        handleAddCountry={this.addCountryToList} 
                                                        handleDeleteCountry={this.deleteCountryFromList}
                                                        handleOrderBy={this.updateOrderBy}
                                                        handleRange={this.updateRangeDistance}
                                                        distanceRangeValue={this.state.maxDistance}/>  
                        </Col>
                        <Col>
                            <Alert variant="danger" dismissible>
                                <Alert.Heading>Application not usable</Alert.Heading>
                                <p>
                                    The purpose of this application is to randomly suggest you restaurants based on a kind of food you like nearby your location.
                                    <br/>Without this latest the application cannot work. 
                                </p>
                            </Alert>
                        </Col>
                    </Row>
                </Container>
            );  
        }
    }
}

export default SearchAndResultSection;