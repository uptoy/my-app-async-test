import counterReducer from '../features/counter/counterSlice'
import customReducer from '../features/custom/slice'
import postReducer from '../features/post/slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
// import { pokemonApi } from './services/pokemon'



const rootReducer = combineReducers({
    counter: counterReducer,
    custom: customReducer,
    posts: postReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})


export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']


// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch