import React from "react";

const apiKey = "AIzaSyAG9bsRKqsurtW1BJFQBD--d1Xw4Lv4gHc";
var markers = [];
var infowindow;
var place = [];

class GoogleApi extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        //Create the script element loading the google places API
        var placesLibraryScript = document.createElement('script');
        placesLibraryScript.type = "text/javascript";
        placesLibraryScript.src = "https://maps.googleapis.com/maps/api/js?key="+apiKey+"&libraries=places,geometry"
        placesLibraryScript.id = "placesLibrary";
        placesLibraryScript.async = true;
        placesLibraryScript.defer = true;
        //Insert the element
        const firstScript = (document.getElementsByTagName('script'))[0];
        firstScript.parentElement.insertBefore(placesLibraryScript,firstScript);
        //Add onload event
        placesLibraryScript.addEventListener('load', () => {
            this.initMap();
        });
        placesLibraryScript.addEventListener('load', () => {
            this.initRequest();
        });
    }

    initMap = () => {
        const map = new window.google.maps.Map(
            document.getElementById('map'), {
                center: {lat:49.5990, lng: 6.1330},
                zoom: 5
              }); 
        
        this.props.initMapState(map);
    }

    initRequest = () => {
        this.props.initRequestFunction(this.props.initRequestCountry);
    }

    render() {
        return (
                <div className="map" id='map'/>
            
        );
    }

}

export default GoogleApi;