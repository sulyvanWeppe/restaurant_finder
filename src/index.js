import React from 'react';
import reactDom from 'react-dom';
import GoogleApi from './API/GoogleApi';
import PlaceName from './Component/PlaceName';
import PlaceRating from './Component/PlaceRating';
import TotalRatingUser from './Component/TotalRatingUser';
import PlaceLocation from './Component/PlaceLocation';
import './index.css';
import PlaceDescription from './Component/PlaceDescription';
import SelectedCountry from './Component/SelectedCountry';
import CountryList from './Component/CountryList';
import CountryManagement from './Component/CountryManagement';
import SearchAndResultSection from './Component/SearchAndResultSection';

const myPlace = {
    placeName: "my place name",
    placeRating: "4",
    totalRatingUser: "100",
    placeLocation: "100.2 100.4"
};

const countries = ["Luxembourg", "Brazil", "France", "Belgium", "Germany", "Italy", "England"];
const countryManagement = {
    selectedCountry: "Luxembourg",
    countriesList: countries
};

//reactDom.render(<GoogleApi />, document.getElementById('root'));
//reactDom.render(<PlaceName place_name="Place name"/>, document.getElementById('root'));
//reactDom.render(<PlaceRating place_rating="4"/>, document.getElementById('root'));
//reactDom.render(<TotalRatingUser total_rating_user="100"/>, document.getElementById('root'));
//reactDom.render(<PlaceLocation place_location={myPlace.placeLocation}/>, document.getElementById('root'));

//reactDom.render(<PlaceDescription place={myPlace}/>, document.getElementById('root'));

//reactDom.render(<SelectedCountry country_name="Luxembourg" />, document.getElementById('root'));
//reactDom.render(<CountryManagement country_management={countryManagement}/>, document.getElementById('root'));

reactDom.render(<SearchAndResultSection place={myPlace} country_management={countryManagement}/>, document.getElementById('root'));