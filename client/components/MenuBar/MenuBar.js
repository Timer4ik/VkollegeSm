import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function MenuBar() {

    return (
        <View style={styles.menuBar}>
            <TouchableOpacity style={styles.menuBarButton}>
                <Image style={styles.image} source={require("../../images/LeftArrow.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.circle} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBarButton}>
                <Image style={styles.image} source={require("../../images/RightArrow.png")} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    menuBar: {
        width: "100%",
        backgroundColor: "rgba(87, 98, 202, 0.85)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 20,
        position: "absolute",
        bottom: 0
    },
    circle: {
        backgroundColor: "white",
        width: 80,
        height: 40,
        borderRadius: 100
    },
    menuBarButton: {
    },
    image:{
        width:20,
        height:26
    }
})


