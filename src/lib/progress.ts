import { arrayUnion, doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import type { LatLng } from '../utils/geo'
import { db, storage } from './firebase'

export interface PlayerProgress {
  nickname: string
  unlocked: string[]
  captures: Record<string, { url: string; capturedAt: unknown; location: LatLng }>
}

export function subscribeToProgress(
  playerId: string,
  onChange: (unlocked: Set<string>) => void,
): () => void {
  const playerRef = doc(db, 'players', playerId)
  return onSnapshot(playerRef, (snapshot) => {
    const data = snapshot.data() as PlayerProgress | undefined
    onChange(new Set(data?.unlocked ?? []))
  })
}

export async function unlockTympanon(
  playerId: string,
  nickname: string,
  pointId: string,
  photoDataUrl: string,
  location: LatLng,
): Promise<void> {
  const photoRef = ref(storage, `captures/${playerId}/${pointId}.jpg`)
  await uploadString(photoRef, photoDataUrl, 'data_url')
  const url = await getDownloadURL(photoRef)

  const playerRef = doc(db, 'players', playerId)
  await setDoc(
    playerRef,
    {
      nickname,
      unlocked: arrayUnion(pointId),
      captures: {
        [pointId]: { url, capturedAt: serverTimestamp(), location },
      },
    },
    { merge: true },
  )
}
