

import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Animated, Alert, Dimensions } from 'react-native'
import { useSwipe } from '../../hooks/useSwipe'

export default function Modal({ isOpen, children }) {

    const xAnim = useRef(new Animated.Value(-Dimensions.get("window").width)).current
    useEffect(() => {
        if (isOpen) {
            Animated.timing(xAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
                isInteraction: true
            }).start()
        }
        else {
            Animated.timing(xAnim, {
                toValue: -Dimensions.get("window").width,
                duration: 200,
                useNativeDriver: true
            }).start()
        }
    }, [isOpen, xAnim])

    return (
        <Animated.View style={[styles.modal, {
            transform: [
                { translateX: xAnim }
            ]
        }]}>
            {children}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    modal: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        backgroundColor: "rgb(217, 217, 217)",
        opacity: 1,
    }
})
