import mapActionTypes from '../actiontypes/maptypes';

const INITIAL_STATE = {
    hasLocation: false,
    latlng: {
      lat: 23.7985508,
      lng: 90.3654215,
    },
    zoom: 13,
    markerMsg: 'You Are Here',
    showDetails: false,
};

const mapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case mapActionTypes.INIT_GEO:
      return {
        ...state
      };
    
    case mapActionTypes.SET_MARKER:
      return {
        ...state,
        latlng: action.payload,
        hasLocation: true,
      };
      
    case mapActionTypes.SHOW_DETAILS:
      return {
        ...state,
        markerMsg: action.payload,
        showDetails: true,
      };
    case mapActionTypes.HIDE_DETAILS:
      return {
        ...state,
        showDetails: false,
      };

    default:
      return state;
  }
};

export default mapReducer;
