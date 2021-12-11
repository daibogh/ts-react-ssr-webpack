import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/app'
import { BrowserRouter } from 'react-router-dom'
import { loadableReady } from '@loadable/component'
import { createStore } from './store'
import { Provider } from 'react-redux'
loadableReady(() => {
  // @ts-ignore
  const store = createStore(window.__PRELOADED_STATE__)

  // Allow the passed state to be garbage-collected
  // @ts-ignore
  delete window.__PRELOADED_STATE__
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  )
})
