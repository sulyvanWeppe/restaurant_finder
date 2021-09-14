import React from 'react';
import reactDom from 'react-dom';
import GoogleApi from './API/GoogleApi';
import PlaceName from './Component/PlaceName';
import PlaceRating from './Component/PlaceRating';
import TotalRatingUser from './Component/TotalRatingUser';
import PlaceLocation from './Component/PlaceLocation';
import './index.css';
import PlaceDescription from './Component/PlaceDescription';

const myPlace = {
    placeName: "my place name",
    placeRating: "4",
    totalRatingUser: "100",
    placeLocation: "100.2 100.4"
};

//reactDom.render(<GoogleApi />, document.getElementById('root'));
//reactDom.render(<PlaceName place_name="Place name"/>, document.getElementById('root'));
//reactDom.render(<PlaceRating place_rating="4"/>, document.getElementById('root'));
//reactDom.render(<TotalRatingUser total_rating_user="100"/>, document.getElementById('root'));
//reactDom.render(<PlaceLocation place_location={myPlace.placeLocation}/>, document.getElementById('root'));

reactDom.render(<PlaceDescription place={myPlace}/>, document.getElementById('root'));