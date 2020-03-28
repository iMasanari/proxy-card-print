import { Image, StyleSheet, View } from '@react-pdf/renderer'
import React from 'react'

const margin = 2
const wrap = 0
const wrapColor = '#555'

const styles = StyleSheet.create({
  card: {
    position: 'relative',
  },
  imageWraper: {
    position: 'absolute',
    top: `${margin - wrap}mm`,
    left: `${margin - wrap}mm`,
    border: `${wrap}mm solid ${wrapColor}`,
  },
  trim: {
    position: 'absolute',
    width: `${margin}mm`,
    height: `${margin}mm`,
  },
  topleft: {
    top: 0,
    left: 0,
    borderRight: '1 solid #000',
    borderBottom: '1 solid #000',
  },
  topright: {
    top: 0,
    right: 0,
    borderLeft: '1 solid #000',
    borderBottom: '1 solid #000',
  },
  bottomleft: {
    bottom: 0,
    left: 0,
    borderRight: '1 solid #000',
    borderTop: '1 solid #000',
  },
  bottomright: {
    bottom: 0,
    right: 0,
    borderLeft: '1 solid #000',
    borderTop: '1 solid #000',
  },
})

interface Props {
  image: string
  cardSize: [number, number]
}

export default ({ image, cardSize: [width, height] }: Props) => (
  <View style={[styles.card, { width: `${width + margin * 2}mm`, height: `${height + margin * 2}mm` }]} wrap={false}>
    <View style={[styles.trim, styles.topleft]} />
    <View style={[styles.trim, styles.topright]} />
    <View style={[styles.trim, styles.bottomleft]} />
    <View style={[styles.trim, styles.bottomright]} />
    <View style={styles.imageWraper}>
      <Image src={image} style={{ width: `${width}mm`, height: `${height}mm` }} />
    </View>
  </View>
)
