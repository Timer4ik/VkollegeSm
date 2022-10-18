import React from 'react'
import { Button, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import Layout from '../Layout'
import { logout } from '../store/actions/AuthActions'

export default function PersonScreen() {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <Layout>
            <View>
                <Button title='Выйти' onPress={handleLogout} />
                <Text>PersonScreen</Text>
            </View>
        </Layout>
    )
}
