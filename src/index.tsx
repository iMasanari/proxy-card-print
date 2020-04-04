import React from 'react'
import { hydrate, render } from 'react-dom'
import App from './components/App'

const mount = process.env.NODE_ENV !== 'development' ? hydrate : render

mount(<App />, document.getElementById('root'))
