import React from 'react'
import { hydrate, render } from 'react-dom'
import Modal from 'react-modal'
import App from './components/App'

const mount = process.env.NODE_ENV !== 'development' ? hydrate : render
const root = document.getElementById('root')!

mount(<App />, root)
Modal.setAppElement(root)
