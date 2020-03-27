import React from 'react'
import { render } from 'react-dom'
import Modal from 'react-modal'
import App from './components/App'

require('./main.css')

const root = document.getElementById('root')!

render(<App />, root)
Modal.setAppElement(root)
