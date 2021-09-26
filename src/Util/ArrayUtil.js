import  * as GenericUtil from "./GenericUtil.js";

export const getRandomElement = (array) => {
    
    if (array.length === 0)
    {return null};

    const randomIndex = GenericUtil.getRandomIntInclusive(0, array.length-1);
    return array[randomIndex];
}