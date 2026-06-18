const PLAYER_ID_KEY = 'playerId'
const REDEEM_CODE_KEY = 'redeemCode'

// Excludes visually ambiguous characters (0/O, 1/I/L) for easier reading at the info desk.
const REDEEM_CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
const REDEEM_CODE_LENGTH = 6

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
export function getRedeemCode(): string {
  let code = localStorage.getItem(REDEEM_CODE_KEY)
  if (!code) {
    code = generateRedeemCode()
    localStorage.setItem(REDEEM_CODE_KEY, code)
  }
  return code
}

function generateRedeemCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(REDEEM_CODE_LENGTH))
  return Array.from(bytes, (b) => REDEEM_CODE_ALPHABET[b % REDEEM_CODE_ALPHABET.length]).join('')
}
