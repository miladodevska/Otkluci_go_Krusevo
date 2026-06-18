import { collection, doc, getDocs, limit, query, runTransaction, where } from 'firebase/firestore'
import { db } from './firebase'

const CANDIDATE_POOL_SIZE = 20

async function tryClaim(code: string, playerId: string): Promise<boolean> {
  const codeRef = doc(db, 'redeemCodes', code)
  try {
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(codeRef)
      if (!snap.exists() || snap.data().used) throw new Error('already claimed')
      tx.update(codeRef, { used: true, playerId, assignedAt: new Date().toISOString() })
    })
    return true
  } catch {
    return false
  }
}

// Picks a random unused code from the pool and atomically claims it so no two
// players can ever be assigned the same code, even with concurrent requests.
export async function claimRedeemCode(playerId: string): Promise<string> {
  const pool = query(collection(db, 'redeemCodes'), where('used', '==', false), limit(CANDIDATE_POOL_SIZE))
  const snapshot = await getDocs(pool)
  if (snapshot.empty) throw new Error('No redeem codes left')

  const candidates = snapshot.docs.map((d) => d.id)
  while (candidates.length > 0) {
    const index = Math.floor(Math.random() * candidates.length)
    const [code] = candidates.splice(index, 1)
    if (await tryClaim(code, playerId)) return code
  }

  throw new Error('No redeem codes left')
}
