import { combineReducers } from 'redux'
import dialogReducer from 'ducks/dialogSlice'
import notificationReducer from 'ducks/notificationSlice'
import carListReducer from 'ducks/carListSlice'
import userReducer from 'ducks/userSlice'

const rootReducer = combineReducers({
    dialog: dialogReducer,
    carList: carListReducer,
    notification: notificationReducer,
    user: userReducer,
})

export default rootReducer
