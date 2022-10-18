import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { BackHandler } from "react-native"

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


export default function Field({ value, onChange, label, placeholder }) {

    const [focus, setFocus] = useState(false)

    

    return (
        <View>
            <Text>{label}</Text>
            <TextInput value={value} onChange={onChange} placeholder={focus ? "" : placeholder}></TextInput>
            <Divider></Divider>
        </View>
    )
}
