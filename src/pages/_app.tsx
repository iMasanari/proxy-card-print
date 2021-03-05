import { AppProps } from 'next/app'
import React from 'react'
import Modal from 'react-modal'
import { RecoilRoot } from 'recoil'

require('react-image-crop/dist/ReactCrop.css')
require('../components/settings/Settings.css')
require('../components/atoms/NumberFild.css')
require('../components/atoms/Button.css')
require('../components/cards/Card.css')
require('../components/cards/Edit.css')
require('../components/cards/Cards.css')
require('../components/cards/AddCard.css')
require('../components/App.css')
require('../components/layouts/Header.css')
require('../components/preview/Preview.css')
require('../components/preview/Usage.css')

Modal.setAppElement('#__next')

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}
