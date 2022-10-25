import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function HeaderComponent() {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>
                ВКолледже
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        backgroundColor: "#3B48C1",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginBottom:10
    },
    title: {
        padding: 20,
        fontSize: 28,
        fontWeight: "600",
        color: "white",
    }
})


