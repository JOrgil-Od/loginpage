import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './reducers'

export default function configureHrsStore(){
  const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
  })
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }
  return store
}
