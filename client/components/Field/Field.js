import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

function Divider() {
    return (
        <View>
            <View style={{
                height: 1, width: "100%",
                backgroundColor: "gray", opacity: 0.4,
                marginBottom: 5
            }} />
        </View>
    )
}


export default function Field({ value, onChangeText, label, placeholder, style }) {

    return (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
            ></TextInput>
            <Divider></Divider>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        color: "gray"
    },
    input: {
        fontSize: 24,
        marginVertical: 10
    },
    field: {
        marginBottom: 20
    }
})