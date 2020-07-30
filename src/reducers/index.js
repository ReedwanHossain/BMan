import { combineReducers } from 'redux'

import mapReducer from './mapReducer'
import dformReducer from './dformReducer'
import bformReducer from './bformReducer'


const rootReducer = combineReducers({
  map: mapReducer,
  dynamicform: dformReducer,
  baseform: bformReducer,
})

export default rootReducer
