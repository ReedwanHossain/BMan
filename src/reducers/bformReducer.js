import bformActionTypes from '../actiontypes/bformtypes';

const INITIAL_STATE = {
   responseRG : {},
   urlParams :  [{'key': 'latitude', 'value': 23.7985508}, {'key': 'longitude', 'value': 90.3654215}],
   suggestions: [],
   selectedPlace: {},
   nearbyPlaces: []
};

const bformReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case bformActionTypes.CALL_REV_GEO:
      console.log("CRG Reducer")
      return {
        ...state,
        responseRG: action.payload
      };

      case bformActionTypes.GET_URL_PARAMS:
        return {
          ...state
        };

      case bformActionTypes.PASS_URL_PARAMS:
        return {
          ...state,
          urlParams: action.payload
        };

        case bformActionTypes.SEARCH_AUTOCOMPLETE: {
          return {
				...state,
              suggestions: action.payload.places,
			  selectedPlace: {},
			  responseRG: action.payload,
              nearbyPlaces: []
          }
      }

      case bformActionTypes.SEARCH_SELECT_PLACE: {
          return {
				...state,
              suggestions: [],
			  selectedPlace: action.payload,
			  responseRG: action.payload,
              nearbyPlaces: []
          }
      }

      case bformActionTypes.GET_NEARBY_PLACES_BY_CATEGORY: {
          return {
              ...state,
              nearbyPlaces: action.payload.nearbyPlaces
          }
      }


    default:
      return state;
  }
};

export default bformReducer;
