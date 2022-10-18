import React, { useState } from 'react'
import { View } from 'react-native'

export const useSwipe = () => {
    let [startX, setStartX] = useState(0)
    let [endX, setEndX] = useState(0)

    return {
        distance: Math.abs(startX - endX),
        direction: startX > endX ? -1 : 1,
        bind: {
            onTouchStart: (e) => setStartX(e.nativeEvent.locationX),
            onTouchMove: e => setEndX(e.nativeEvent.locationX)
        }
    }
}
