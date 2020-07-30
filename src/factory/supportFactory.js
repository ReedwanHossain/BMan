import  baseFormTypes from '../actiontypes/bformtypes'
const baseURI = 'https://barikoi.xyz/v1/api/search';


export const getSuggestions = async (searchString) => {
  const autoCompleteURI = `${baseURI}/autocomplete/MTcxMDpONUZaUFRLMTlT/`;

  try {
    const res = await fetch(`${autoCompleteURI}place?q='${searchString}'`);
    const data = await res.json();
    const places = data.places;

    return places;
  } catch (error) {
    console.log(error);
  }
};

export const revGeocoding = async (latLng) => {
  const { lat, lng } = latLng;

  try {
    const res = await fetch(
      `${baseURI}/reverse/MTcxMDpONUZaUFRLMTlT/geocode?longitude=${lng}&latitude=${lat}&district=true&post_code=true&country=true&sub_district=true&union=false&pauroshova=false&location_type=true`
    );
    const data = await res.json();
    let place = data.place;

    Object.assign(place, { latitude: `${lat}`, longitude: `${lng}` });
    return place;
  } catch (error) {
    console.log(error);
  }
};

export const getUrlParamFromJson = (argFieldPairs) => {
    let tempUrl = ''
    try{
        tempUrl = argFieldPairs.map(afp => afp.key + '=' + afp.value).join('&');
    }catch(e){
        console.log('')
    }   
    return tempUrl
}


export const getJsonFromUrl = (url) => {
  if(!url) url = window.location.href;
  var question = url.indexOf("?");
  var hash = url.indexOf("#");
  if(hash==-1 && question==-1) return {'api_url': url,'json_param': {}};
  if(hash==-1) hash = url.length;
  var query = question==-1 || hash==question+1 ? url.substring(hash) : 
  url.substring(question+1,hash);
  console.log(0, question)
  var result = {
  };
  query.split("&").forEach(function(part) {
      if(!part) return;
      part = part.split("+").join(" "); // replace every + with space, regexp-free version
      var eq = part.indexOf("=");
      var key = eq>-1 ? part.substr(0,eq) : part;
      var val = eq>-1 ? decodeURIComponent(part.substr(eq+1)) : "";
      var from = key.indexOf("[");
      if(from==-1) result[decodeURIComponent(key)] = val;
      else {
      var to = key.indexOf("]",from);
      var index = decodeURIComponent(key.substring(from+1,to));
      key = decodeURIComponent(key.substring(0,from));
      if(!result[key]) result[key] = [];
      if(!index) result[key].push(val);
      else result[key][index] = val;
      }
  });
  return {
    'api_url': url.substring(0,question),
    'json_param': result
  }
}

export const responseTypeFromUrl = (rawResponse) => {
  if (rawResponse.hasOwnProperty('place')) {
    return {
      'action_type' : baseFormTypes.SEARCH_SELECT_PLACE,
      'action_payload' : rawResponse
    }
  }
  else if (rawResponse.hasOwnProperty('places')) {
    return {
      'action_type' : baseFormTypes.SEARCH_AUTOCOMPLETE,
      'action_payload' : rawResponse
    }
  }
  else if (rawResponse.hasOwnProperty('geocoded_address')) {
    return {
      'action_type' : baseFormTypes.SEARCH_SELECT_PLACE,
      'action_payload' : rawResponse
    }
  }
  else if (rawResponse.hasOwnProperty('routes')) {
    return {
      'action_type' : baseFormTypes.SEARCH_SELECT_PLACE,
      'action_payload' : rawResponse
    }
  }
  else if (rawResponse.hasOwnProperty('Distance')) {
    return {
      'action_type' : baseFormTypes.SEARCH_SELECT_PLACE,
      'action_payload' : rawResponse
    }
  }
  else{
    //todo...
    return {
      'action_type' : baseFormTypes.CALL_REV_GEO,
      'action_payload' : rawResponse
    }
  }
  
}


export const setRequestObj = (requestMethod, requestBaseURL, requestURLParam, requestBody) => {
    let requestConfig 
    let formData = new FormData();
    switch (requestMethod) {

        case 'POST':
            let parsedBody = {}
            requestBody.map((rb)=>{
                parsedBody[rb.key] = rb.value
                formData.append(rb.key, rb.value)
            })
            console.log(parsedBody)
            requestConfig = {
                method: requestMethod,
                // header:{
                //     'content-type': 'application/json'
                // },
                body: formData
            }

            return {
                reqURL : requestBaseURL,
                reqConfig : requestConfig
            }
    
        default:
            requestConfig = {
                method: requestMethod,
                header:{
                    'content-type': 'application/x-www-form-urlencoded'
                },
            }

            return {
                reqURL : requestBaseURL+requestURLParam,
                reqConfig : requestConfig
            }
    
    }
}


export const responseBlender = (rawResponse, cb, urlParams) => {
    if (rawResponse.hasOwnProperty('place')) {
      if(rawResponse.place.hasOwnProperty('latitude')){
         cb({
          'haslatlng': true,
          'latitude': rawResponse.place.latitude,
          'longitude': rawResponse.place.longitude,
          'msg': rawResponse.place.address,
          'apitype': 'search'
        })
      }
      else{
        const values = [...urlParams];
        let lat = 23.7985508, lng = 90.3654215;
        values.map((vl)=>{
          if(vl.key==='latitude')lat = vl.value;
          if(vl.key==='longitude')lng = vl.value;
        })
        cb({
          'haslatlng': false,
          'msg': rawResponse.place.address,
          'latitude': lat,
          'longitude': lng,
          'apitype': 'search'
        })
      }
    }
    else if (rawResponse.hasOwnProperty('places')) {
      console.log('placess...............')
      cb({
        'haslatlng': true,
        'latitude': rawResponse.places[0].latitude,
        'longitude': rawResponse.places[0].longitude,
        'mgs': rawResponse.places[0].address,
        'apitype': 'search'
      })
    }
    else if (rawResponse.hasOwnProperty('geocoded_address')) {
      cb({
        'haslatlng': true,
        'latitude': rawResponse.geocoded_address.latitude,
        'longitude': rawResponse.geocoded_address.longitude,
        'msg': rawResponse.geocoded_address.Address,
        'apitype': 'search'
      })
    }
    else if (rawResponse.hasOwnProperty('routes')) {
      cb({
        'haslatlng': false,
        'apitype': 'route'
      })
    }
    else if (rawResponse.hasOwnProperty('Distance')) {
      cb({
        'haslatlng': false,
        'apitype': 'distance'
      })
    }
    else{
      //todo...
    }
}


// export const createPost = postData => dispatch => {
//     fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         header:{
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify(postData)
//     })
//     .then(rest => rest.json())
//     .then(post => dispatch({
//         type: NEW_POST,
//         payload: postData
//     })); 
// }