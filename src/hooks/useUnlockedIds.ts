import { useEffect, useState } from 'react'
import { getPlayerId } from '../lib/playerId'
import { subscribeToProgress } from '../lib/progress'

export function useUnlockedIds(): Set<string> {
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const playerId = getPlayerId()
    const unsubscribe = subscribeToProgress(playerId, setUnlockedIds)
    return unsubscribe
  }, [])

  return unlockedIds
}
