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


reactDom.render(<SearchAndResultSection place={myPlace} country_management={countryManagement}/>, document.getElementById('root'));