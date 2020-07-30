import mapActionTypes from '../actiontypes/maptypes';

export const initGeo = () => ({
  type: mapActionTypes.INIT_GEO,
});

export const setMarker = (location) => ({
  type: mapActionTypes.SET_MARKER,
  payload: location,
});


export const showDetails = (place) => ({
  type: mapActionTypes.SHOW_DETAILS,
  payload: place
});

export const hideDetails = () => ({
  type: mapActionTypes.HIDE_DETAILS,
});
