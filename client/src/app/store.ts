import { configureStore } from '@reduxjs/toolkit'
import rootReducer from 'app/rootReducer'
import {
    createSelectorHook,
    useDispatch as useReduxDispatch,
} from 'react-redux'
import { RootState } from './types'

//  From the @reduxjs/toolkit docs:
//  "wraps createStore to provide simplified configuration options
//  and good defaults. It can automatically combine your slice reducers,
//  adds whatever Redux middleware you supply, includes redux-thunk by
//  default, and enables use of the Redux DevTools Extension."
const store = configureStore({ reducer: rootReducer })

// Typing the redux hooks for Typescript.
// I followed the recommended way to type the useDispatch hook from @reduxjs/toolkit.
// Opted for this method as we're using several middlewares coming from the @reduxjs/toolkit
// library that would otherwise make this more difficult using "createDispatchHook".

// https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type

// For the useSelector hook, I decided to use the function createSelectorHook from the
// react-redux library as it correctly types the useSelector hook and is straightforward.
export const useDispatch = () => useReduxDispatch<typeof store.dispatch>()
export const useSelector = createSelectorHook<RootState>()

export default store
