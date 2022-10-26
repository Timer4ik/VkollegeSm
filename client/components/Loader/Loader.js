import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

export default function Loader() {
    return (
        <View style={styles.loader}>
            <Image source={require("../../images/Loader.gif")} />
        </View>
    )
}

const styles = StyleSheet.create({
    loader: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor:"gray",
        opacity:0.5,
        zIndex:5,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
})