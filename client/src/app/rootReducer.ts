import { combineReducers } from 'redux'
import dialogReducer from 'ducks/dialogSlice'
import carListReducer from 'ducks/carListSlice'
import carReducer from 'ducks/carSlice'

const rootReducer = combineReducers({
    dialog: dialogReducer,
    carList: carListReducer,
    car: carReducer,
})

export default rootReducer
