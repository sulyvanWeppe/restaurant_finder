import  * as GenericUtil from "./GenericUtil.js";

export const getRandomElement = (array) => {
    
    if (array.length === 0)
    {return null};

    const randomIndex = GenericUtil.getRandomIntInclusive(0, array.length-1);
    return array[randomIndex];
}

export const comparePlacesOnRating = (placeInfoA, placeInfoB) => {
    //Compare B to A to then sort in decreasing order
    return placeInfoB.place.rating - placeInfoA.place.rating;
}

export const comparePlacesOnDistance = (placeInfoA, placeInfoB) => {
    return placeInfoA.distanceFromOrigin - placeInfoB.distanceFromOrigin;
}

export const sortPlaces = (places, mode) => {
    if (mode === 'rating')
    {
        return places.sort(comparePlacesOnRating);
    }
    else if (mode === 'distance')
    {
        return places.sort(comparePlacesOnDistance);
    }

    return places;
}
