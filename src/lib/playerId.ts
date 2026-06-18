const PLAYER_ID_KEY = 'playerId'
const REDEEM_CODE_KEY = 'redeemCode'

export function getPlayerId(): string {
  let id = localStorage.getItem(PLAYER_ID_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(PLAYER_ID_KEY, id)
  }
  return id
}

// Short human-readable code shown to the player/staff, separate from the
// internal playerId (UUID) used as the Firestore doc id and Storage path.
// Unlike playerId, this is never generated locally — it's claimed from the
// pre-seeded `redeemCodes` pool in Firestore once the quest is completed
// (see lib/redeemCodes.ts), so only persist/read it here.
export function getStoredRedeemCode(): string | null {
  return localStorage.getItem(REDEEM_CODE_KEY)
}

export function setStoredRedeemCode(code: string): void {
  localStorage.setItem(REDEEM_CODE_KEY, code)
}
