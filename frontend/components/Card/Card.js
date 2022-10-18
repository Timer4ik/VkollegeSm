import React from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { Header } from 'react-native/Libraries/NewAppScreen'

export default function Card(props) {

    return (
        <View style={styles.card}>

            <Header>
                hello
            </Header>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        elevation: 5,
        shadowColor: 'black',
        borderRadius: 8,
        padding: 20,
        margin: 20,
        backgroundColor: "white"
    }
})