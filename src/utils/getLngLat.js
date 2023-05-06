import axios from 'axios';

function getLngLat(location) {
  const apiKey = 'pk.eyJ1IjoiYW5hczE3OTMiLCJhIjoiY2xjM3pvaHhsMDdiazN2cDZuMHNkMzZ6cSJ9.zor0NwKR53EElrGFrhdbHw';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${apiKey}`;
  return axios.get(url)
    .then(response => {
      const features = response.data.features;
      if (features.length > 0) {
        const lng=features[0].center[0]
        const lat=features[0].center[1]
        return { lat, lng };
      } else {
        throw new Error('Location not found');
      }
    })
    .catch(error => {
      console.log(error);
      return null;
    });
}

export {getLngLat}
