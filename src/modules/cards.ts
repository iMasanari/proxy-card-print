import { atom, useSetRecoilState } from 'recoil'

export interface CardType {
  id: string
  src: string
  orgSrc: string
  count: number | null
}

const createCard = (src: string): CardType =>
  ({ id: Math.random().toString(32).slice(2), src, orgSrc: src, count: null })

const revokeCardSrc = (card: CardType | undefined) => {
  if (card && card.src !== card.orgSrc) {
    URL.revokeObjectURL(card.src)
  }
}

const revokeCardOrgSrc = (card: CardType | undefined) => {
  if (card) {
    URL.revokeObjectURL(card.src)
  }
}

export const cardsState = atom<CardType[]>({
  key: 'cards',
  default: [],
})

export const useCardsActions = () => {
  const setter = useSetRecoilState(cardsState)

  return {
    add: (list: string[]) => {
      setter((state) =>
        [...state, ...list.map(createCard)]
      )
    },
    updateCount: (index: number, count: number | null) => {
      setter((state) =>
        state.map((v, i) => i === index ? { ...v, count } : v)
      )
    },
    updateSrc: (index: number, src: string) => {
      setter((state) => {
        revokeCardSrc(state[index])

        return state.map((card, i) => i === index ? { ...card, src } : card)
      })
    },
    remove: (index: number) => {
      setter((state) => {
        revokeCardSrc(state[index])
        revokeCardOrgSrc(state[index])

        return state.filter((_, i) => i !== index)
      })
    },
  }
}
