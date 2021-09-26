import React from 'react';
import '../uikit-3.4.6/css/uikit.min.css';
import CountryManagement from './CountryManagement';
import PlaceDescription from './PlaceDescription';
import * as ArrayUtil from "../Util/ArrayUtil.js";
import * as MapsUtil from "../Util/MapsUtil.js";
import GoogleApi from '../API/GoogleApi';
import '../index.css';


class SearchAndResultSection extends React.Component{
    constructor(props){
        super(props);

        var countries = ['Luxembourgish', 'French', 'German', 'Italian', 'Spainish'];
        //Get Random country from the countries list
        const randomCountry = ArrayUtil.getRandomElement(countries); 

        this.state = {
            userCountryInput: randomCountry ?? '',
            countriesList: countries, 
            map: null,
            requestResult: []
        };
    }

    initMapState = (initMap) => {
        this.setState({map: initMap});
    }

    performPlaceRequest = (country) => {
        //Initialize variable
        const currentMap = this.state.map;
        const infoWindow = new window.google.maps.InfoWindow();
        const originLocation = new window.google.maps.LatLng(49.5990, 6.1330);
        const maxDistance = 1000;
        const request = {
            query:  country+' restaurant',
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

                for (var i = 0; i < results.length; i++) {
                    //Check if it is in the authorized perimeter
                    var distanceFromOrigin = window.google.maps.geometry.spherical.computeDistanceBetween(originLocation, results[i].geometry.location);
                    if (distanceFromOrigin <= maxDistance)
                    {                     
                        var place = results[i];
                        //Store the place info
                        that.setState((prevState) => 
                        {
                                return {requestResult: [...prevState.requestResult, place]};
                        });
                        

                        var infoWindowContent = '<div><strong>'+place.name+'</strong>'
                                                +'<br>'+place.formatted_address+'</div>';
                                                
                        //Set Marker on the Map
                        MapsUtil.setFullMarker(currentMap, place.geometry.location, place.name, infoWindow, infoWindowContent);
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
            <div class="uk-container uk-container-center">
                <div class="uk-grid">
                        <PlaceDescription   place={this.props.place}
                                            initMapState={this.initMapState}
                                            initRequestFunction={this.performPlaceRequest}
                                            initRequestCountry={this.state.userCountryInput}
                                            requestResult={this.state.requestResult}/>
                        <CountryManagement  countriesList={this.state.countriesList} 
                                            selectedCountry={this.state.userCountryInput} 
                                            handleRefresh={this.updateSelectedCountry} 
                                            handleAddCountry={this.addCountryToList} 
                                            handleDeleteCountry={this.deleteCountryFromList} />      
                </div>
            </div>
        )
    }
}

export default SearchAndResultSection;