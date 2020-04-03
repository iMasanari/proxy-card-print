import fs from 'fs'

fs.writeFileSync(
  'data/Helvetica.afm',
  require('pdfkit/js/data/Helvetica.afm').default,
)
