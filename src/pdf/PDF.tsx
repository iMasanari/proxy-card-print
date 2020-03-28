import { Document, Page, StyleSheet } from '@react-pdf/renderer'
import React from 'react'
import Card from './Card'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '10mm 6mm',
  },
})

interface Props {
  size: string
  orientation: 'portrait' | 'landscape'
  list: string[]
}

export default ({ size, orientation, list }: Props) =>
  <Document>
    <Page size={size} orientation={orientation} style={styles.page}>
      {list.map((image, index) =>
        <Card key={index} image={image} />
      )}
    </Page>
  </Document>
