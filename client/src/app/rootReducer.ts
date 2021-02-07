import { combineReducers } from 'redux'
import dialogReducer from 'ducks/dialogSlice'
import carsReducer from 'ducks/carsSlice'

const rootReducer = combineReducers({
    dialog: dialogReducer,
    cars: carsReducer,
})

export default rootReducer
