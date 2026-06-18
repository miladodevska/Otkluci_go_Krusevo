import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { webcrypto as crypto } from 'node:crypto'
import * as XLSX from 'xlsx'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'data')

const CODE_COUNT = 500
// Same alphabet as the app (src/lib/playerId.ts): excludes visually ambiguous
// characters (0/O, 1/I/L) so codes are easy to read at the info desk.
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
const CODE_LENGTH = 6

function generateCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(CODE_LENGTH))
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('')
}

function generateUniqueCodes(count) {
  const codes = new Set()
  while (codes.size < count) {
    codes.add(generateCode())
  }
  return [...codes]
}

const codes = generateUniqueCodes(CODE_COUNT)

mkdirSync(OUT_DIR, { recursive: true })

const csvPath = join(OUT_DIR, 'redeem-codes.csv')
const csvContent = ['code', ...codes].join('\n')
writeFileSync(csvPath, csvContent, 'utf-8')

const worksheet = XLSX.utils.aoa_to_sheet([['code'], ...codes.map((code) => [code])])
const workbook = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(workbook, worksheet, 'Codes')
const xlsxPath = join(OUT_DIR, 'redeem-codes.xlsx')
XLSX.writeFile(workbook, xlsxPath)

console.log(`Generated ${codes.length} unique codes:`)
console.log(`  ${csvPath}`)
console.log(`  ${xlsxPath}`)
