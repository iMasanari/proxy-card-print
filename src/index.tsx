import React from 'react'
import { hydrate, render } from 'react-dom'
import Modal from 'react-modal'
import { RecoilRoot } from 'recoil'
import App from './components/App'

const mount = process.env.NODE_ENV !== 'development' ? hydrate : render
const root = document.getElementById('root')!

mount(<RecoilRoot><App /></RecoilRoot>, root)
Modal.setAppElement(root)
