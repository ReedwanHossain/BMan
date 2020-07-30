import bformActionTypes from '../actiontypes/bformtypes';
import { responseBlender , responseTypeFromUrl} from '../factory/supportFactory'


// export const sendRequest = (completeUrl) => dispatch => {
//     fetch(completeUrl)
//     .then(res => res.json())
//     // .then(response => dispatch({
//     //     type: bformActionTypes.CALL_REV_GEO,
//     //     payload: response
//     // }));   
// }
 

export const callReverseGeo = (reqObj) => dispatch => {
    fetch(reqObj.reqURL, reqObj.reqConfig)
    .then(res => res.json())
    .then(response => {
        const actionObj = responseTypeFromUrl(response)
        dispatch({
            type: actionObj.action_type,
            payload: actionObj.action_payload
        })
    });   
}

export const getURLParams = () => ({
    type: bformActionTypes.GET_URL_PARAMS,
  });


export const passURLParams = (urlParams) => ({
    type: bformActionTypes.PASS_URL_PARAMS,
    payload: urlParams
});
  
