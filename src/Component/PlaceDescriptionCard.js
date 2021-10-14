import React from 'react';
import '../uikit-3.4.6/css/uikit.min.css';
import PlaceRating from './PlaceRating';
import TotalRatingUser from './TotalRatingUser';
import PlaceLocation from './PlaceLocation';
import PlaceDistance from './PlaceDistance';

class PlaceDescriptionCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const placeInfo = this.props.placeInfo;
        const place = placeInfo.place;
        if (place.photos)
        {
            return (
                <div class="uk-card uk-card-default uk-grid-collapse uk-margin" uk-grid>
                    <div class="uk-card-media-top uk-cover-container">
                        <img src={(place.photos)[0].getUrl()} alt="" uk-cover />
                    </div>
                    <div>
                        <div class="uk-card-body">
                            <h3 class="uk-card-title">{place.name}</h3>
                            <PlaceRating place_rating={place.rating} />
                            <TotalRatingUser total_rating_user={place.user_ratings_total} />
                            <PlaceLocation place_location={place.formatted_address} />
                            <PlaceDistance place_distance={placeInfo.distanceFromOrigin} />
                        </div>
                    </div>
                </div>
            );
        }
        else {
            alert(place.photos.raw_reference.fife_url);
            return (
                <div class="uk-card uk-card-default uk-grid-collapse uk-margin" uk-grid>
                    <div>
                        <div class="uk-card-body">
                            <h3 class="uk-card-title">{place.name}</h3>
                            <PlaceRating place_rating={place.rating} />
                            <TotalRatingUser total_rating_user={place.user_ratings_total} />
                            <PlaceLocation place_location={place.formatted_address} />
                            <PlaceDistance place_distance={placeInfo.distanceFromOrigin} />
                        </div>
                    </div>
                </div>
            );  
        }
    }
}

export default PlaceDescriptionCard;