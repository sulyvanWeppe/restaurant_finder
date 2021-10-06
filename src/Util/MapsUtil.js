export const setFullMarker = (inputMap, placeInfo, infoWindow) => 
{
    //Set Marker on the Map
    var marker = new window.google.maps.Marker({
        position: placeInfo.place.geometry.location,
        map: inputMap,
        title: placeInfo.place.name
    });
    //Define infoWindow for each marker
    const infoWindowContent = '<div><strong>'+placeInfo.place.name+'</strong>'
    +'<br>'+placeInfo.place.formatted_address+'</div>';

    window.google.maps.event.addListener(marker, 'click', ((marker,infoWindowContent,infoWindow) => { return function() {
        infoWindow.setContent(infoWindowContent);
        infoWindow.open(inputMap, marker);
        };
    })(marker,infoWindowContent,infoWindow));

    return marker;
}

export const removeMarkersFromMap = (map, markers) => {
    if (markers)
    {
        for (var i=0; i<markers.length; i++)
        {
            markers[i].setMap(null);
        }
    }

}