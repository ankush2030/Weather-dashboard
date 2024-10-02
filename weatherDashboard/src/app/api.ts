let url = 'http://api.weatherapi.com/v1' //current.json?key=bd14c13146504bba88e184400240209'  //&q=Pune&aqi=yes';
// url = ''
export function getApi(name: string) {
    return url + '/' + name + '?key=bd14c13146504bba88e184400240209';
}

export let apis = {
    GET_SONGS: 'current.json',
    GET_FORECAST: 'forecast.json'
}