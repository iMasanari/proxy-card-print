import React from 'react'
import { useRecoilValue } from 'recoil'
import { cardsState } from '~/modules/cards'
import { Asset } from '~/modules/settings'
import Cards from './cards/Cards'
import Header from './layouts/Header'
import Preview from './preview/Preview'
import Usage from './preview/Usage'
import Settings from './settings/Settings'

require('./App.css')

const settingsInitState = {
  asset: 'A4' as Asset,
  cardWidth: 59,
  cardHeight: 86,
  defaultCount: 1 as number | null,
}

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
