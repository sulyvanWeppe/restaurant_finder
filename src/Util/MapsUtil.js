export const setFullMarker = (inputMap, markerLocation, markerTitle, infoWindow, infoWindowText) => 
{
    //Set Marker on the Map
    var marker = new window.google.maps.Marker({
        position: markerLocation,
        map: inputMap,
        title: markerTitle
    });
    //Define infoWindow for each marker
    window.google.maps.event.addListener(marker, 'click', ((marker,infoWindowText,infoWindow) => { return function() {
        infoWindow.setContent(infoWindowText);
        infoWindow.open(inputMap, marker);
        };
    })(marker,infoWindowText,infoWindow));
}