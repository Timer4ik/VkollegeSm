import React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import Card from '../components/Card/Card'
import Field from '../components/Field/Field'
import useField from '../hooks/useField'

export default function AuthScreen() {

    const {field} = useField()

    return (
        <View style={styles.authBlock}>
            <Card>
                <Text>Авторизация</Text>
                <View>
                    <Text>Введите номер телефона</Text>
                    <TextInput></TextInput>
                </View>
                <View>
                    <Text>Введите пароль</Text>
                    <TextInput></TextInput>
                    
                </View>
                <Field label="Введите email" placeholder={"aboba"}/>
                <Button title='Войти' />
            </Card>
        </View>
    )
}


const styles = StyleSheet.create({
    authBlock: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%"
    },
})