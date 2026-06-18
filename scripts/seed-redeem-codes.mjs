import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SERVICE_ACCOUNT_PATH = join(__dirname, '..', 'service-account.json')
const CSV_PATH = join(__dirname, '..', 'data', 'redeem-codes.csv')

// Matches the non-default Firestore database id used by the app in src/lib/firebase.ts
const DATABASE_ID = 'tympanon'

const serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, 'utf-8'))
const app = initializeApp({ credential: cert(serviceAccount) })
const firestore = getFirestore(app, DATABASE_ID)

const csv = readFileSync(CSV_PATH, 'utf-8')
const codes = csv.split('\n').slice(1).map((line) => line.trim()).filter(Boolean)

const batch = firestore.batch()
for (const code of codes) {
  const ref = firestore.collection('redeemCodes').doc(code)
  batch.set(ref, { code, used: false, playerId: null, assignedAt: null })
}

await batch.commit()
console.log(`Seeded ${codes.length} redeem codes into Firestore collection "redeemCodes".`)
