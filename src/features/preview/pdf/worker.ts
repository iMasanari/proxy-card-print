import { DOMParser } from '@xmldom/xmldom'
import jsPDF from 'jspdf'
import registerPromiseWorker from 'promise-worker/register'
import { svg2pdf } from 'svg2pdf.js'

const globalThis = self as any

// for svg2pdf.js
globalThis.document = {
  implementation: {
    createHTMLDocument: () => null,
  },
}

const parser = new DOMParser()

const document = parser.parseFromString('<svg></svg>', 'image/svg+xml').firstChild
const proto = Object.getPrototypeOf(document)

proto.querySelectorAll = proto.querySelectorAll || (() => [])
proto.style = proto.style || { getPropertyValue: () => null }

export interface Option {
  svg: string[]
  width: number
  height: number
}

registerPromiseWorker<Option, string>(async (option) => {
  const nodes = option.svg.map(svg => parser.parseFromString(svg, 'image/svg+xml').firstChild as Element)

  const orientation = option.width < option.height ? 'p' : 'l'
  const pdf = new jsPDF(orientation, 'mm', [option.width, option.height])

  for (const [index, svg] of nodes.entries()) {
    // 改ページ
    if (index) {
      pdf.addPage()
    }

    await svg2pdf(svg, pdf)
  }

  return URL.createObjectURL(pdf.output('blob'))
})
