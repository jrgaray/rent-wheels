import { combineReducers } from 'redux'
import dialogReducer from 'ducks/dialogSlice'
import notificationReducer from 'ducks/notificationSlice'
import carListReducer from 'ducks/carListSlice'
import carReducer from 'ducks/carSlice'
import userReducer from 'ducks/userSlice'

const rootReducer = combineReducers({
    dialog: dialogReducer,
    carList: carListReducer,
    car: carReducer,
    notification: notificationReducer,
    user: userReducer,
})

export default rootReducer
