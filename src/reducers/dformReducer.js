import dformActionTypes from '../actiontypes/dformtypes';

const INITIAL_STATE = {
   fieldPairs : [{'key': 'latitude', 'value': 23.7985508}, {'key': 'longitude', 'value': 90.3654215}]
};

const dformReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case dformActionTypes.GET_FIELD_PAIRS:
        console.log("GFP Reducer")
        return {
          ...state
        };

    case dformActionTypes.PASS_FIELD_PAIRS:
      console.log("PFP Reducer")
      return {
        ...state,
        fieldPairs: action.payload
      };

    default:
      return state;
  }
};

export default dformReducer;
