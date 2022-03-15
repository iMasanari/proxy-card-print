import { hydrate, render } from 'react-dom'
import App from './App'

const renderer = import.meta.env.PROD ? hydrate : render

renderer(<App />, document.getElementById('app'))
