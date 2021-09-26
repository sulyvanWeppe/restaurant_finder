import React from 'react';
import '../uikit-3.4.6/css/uikit.min.css';
import PlaceName from './PlaceName';
import PlaceRating from './PlaceRating';
import TotalRatingUser from './TotalRatingUser';
import PlaceLocation from './PlaceLocation';
import GoogleApi from '../API/GoogleApi';

class PlaceDescription extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        //@TODO : Conditionnal rendering to implement
        
        var displayPlaces = this.props.requestResult.map((place, index) => 
        <li key={index}>
            <PlaceName place_name={place.name}/>
            <PlaceRating place_rating={place.rating} />
            <TotalRatingUser total_rating_user={place.user_ratings_total} />
            <PlaceLocation place_location={place.formatted_address} />
        </li>);

        return (
            <div class="uk-container uk-container-center" class="uk-width-2-3">
                <div class="uk-grid">
                    <div class="uk-width-1-1">
                        <GoogleApi initMapState={this.props.initMapState} initRequestFunction={this.props.initRequestFunction} initRequestCountry={this.props.initRequestCountryy}/>
                        
                        <ul>{displayPlaces}</ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlaceDescription;