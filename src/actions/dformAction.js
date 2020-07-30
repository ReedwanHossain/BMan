import dformActionTypes from '../actiontypes/dformtypes';

export const passFieldPairs = (fieldPairs) => ({
  type: dformActionTypes.PASS_FIELD_PAIRS,
  payload: fieldPairs
});

export const getFieldPairs = () => ({
  type: dformActionTypes.GET_FIELD_PAIRS,
});

