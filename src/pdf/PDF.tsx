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
  list: string[]
}

// Create Document Component
export default (props: Props) => {
  const pages = props.list

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {pages.map((image, index) =>
          <Card key={index} image={image} />
        )}
      </Page>
    </Document>
  )
}
