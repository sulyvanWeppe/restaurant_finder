import React from "react";

const apiKey = "AIzaSyBc0tJFhFosRQlbNOBYIXffETji61BNQOI";
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
        placesLibraryScript.src = "https://maps.googleapis.com/maps/api/js?key="+apiKey+"&libraries=places,geometry,photos"
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
                zoom: 10
              }); 
        
        this.props.initMapState(map);
    }

    initRequest = () => {
        console.log('initRequestCountry = '+this.props.initRequestCountry);
        this.props.initRequestFunction(this.props.initRequestCountry);
    }

    render() {
        return (
            <div class="uk-container uk-container-center" class="uk-width-1-1" >
                <div class="uk-grid">
                    <div class="uk-width-1-1">
                        <div className="map" id='map'/>
                    </div>
                </div>
            </div>
        );
    }

}

export default GoogleApi;