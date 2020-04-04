import fs from 'fs'
// @ts-ignore
import Helvetica from 'pdfkit/js/data/Helvetica.afm'

fs.writeFileSync('data/Helvetica.afm', Helvetica)

export { default } from 'pdfkit'

