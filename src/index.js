import React from 'react';
import reactDom from 'react-dom';
import GoogleApi from './API/GoogleApi';
import PlaceName from './Component/PlaceName';
import PlaceRating from './Component/PlaceRating';
import TotalRatingUser from './Component/TotalRatingUser';
import PlaceLocation from './Component/PlaceLocation';
import './index.css';
import SearchAndResultSection from './Component/SearchAndResultSection';
import 'bootstrap/dist/css/bootstrap.min.css';



reactDom.render(<SearchAndResultSection />, document.getElementById('root'));