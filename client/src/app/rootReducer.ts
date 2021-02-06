import { combineReducers } from 'redux'
import dialogReducer from 'ducks/dialogSlice'

const rootReducer = combineReducers({
    dialog: dialogReducer,
})

export default rootReducer
