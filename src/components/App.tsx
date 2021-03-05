import React from 'react'
import { useRecoilValue } from 'recoil'
import Cards from './cards/Cards'
import Header from './layouts/Header'
import Preview from './preview/Preview'
import Usage from './preview/Usage'
import Settings from './settings/Settings'
import { cardsState } from '~/modules/cards'

// require('./App.css')

export default () => {
  const cards = useRecoilValue(cardsState)

  return (
    <div className="App">
      <Header />
      <div className="App-contents">
        <div className="App-conditions">
          <Settings />
          <Cards />
        </div>
        {!cards.length ? <Usage /> : (
          <Preview className="App-Preview" />
        )}
      </div>
    </div>
  )
}
