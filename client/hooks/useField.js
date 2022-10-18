import React, { useState } from 'react'
import { Alert } from 'react-native'
import Field from '../components/Field/Field'

export default function useField(initialValue = "") {
    const [value, setValue] = useState(initialValue)

    return {
        value,
        onChangeText: (text) => {
            setValue(text)
        },
    }
}