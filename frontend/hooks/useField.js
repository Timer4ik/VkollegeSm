import React, { useState } from 'react'
import Field from '../components/Field/Field'

export default function useField() {
    const [value, setValue] = useState()

    return {
        value,
        setValue,
        field: <Field value={value} onChange={(e) => setValue(e.target.value)} />
    }
}