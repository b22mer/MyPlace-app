const GOOGLE_API_KEY = 'AIzaSyDVjOLlGFBG1F61Nlx42kz0O2Vg6dA_5Dw'



export async function getAddressFromCoords(coords) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`)
    if (!response.ok) {
        throw new Error("fetch address에 실패하였습니다.");
    }
    const data = await response.json();
    if (data.error_message) {
        throw new Error(data.error_message);
    }

    const address = data.results[0].formatted_address;
    return address;
}

export async function getCoordsFromAddress(address) {
    const urlAddress = encodeURI(address); // 적합한 문자열을 얻을수있다.
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`);
    if (!response.ok) {
        throw new Error("fetch에 실패하였습니다.");
    }

    const data = await response.json();
    if (data.error_message) {
        throw new Error(data.error_message);
    }

    const coordinates = data.results[0].geometry.location;
    return coordinates;
    console.log(data);
}