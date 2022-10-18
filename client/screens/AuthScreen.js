import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card/Card'
import Field from '../components/Field/Field'
import FlexBlock from '../components/FlexBlock/FlexBlock'
import Modal from '../components/Modal/Modal'
import Wrapper from '../components/Wrapper/Wrapper'
import useField from '../hooks/useField'
import { login, register } from '../store/actions/AuthActions'

export default function AuthScreen() {

    const name = useField("")
    const email = useField("")
    const password = useField("")
    const [isLogin, setIsLogin] = useState(false)
    const dispatch = useDispatch()
    const app = useSelector(state => state.app)

    const loginHandler = async (e) => {
        dispatch(login({ email: email.value, password: password.value }))
    }

    const registerHandler = async (e) => {
        dispatch(register({ name: name.value, email: email.value, password: password.value }))
    }

    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.mainTitle}>ВКолледже</Text>
            </View>
            <Wrapper>
                <Text style={styles.title}>Авторизация</Text>
                {!isLogin &&
                    <Field label="Имя" placeholder="Введите имя" {...name}></Field>
                }
                <Field label="E-mail" placeholder="Введите email" {...email}></Field>
                <Field label="Пароль" placeholder="Введите пароль" {...password}></Field>
                <Button
                    onPress={isLogin ? loginHandler : registerHandler}
                    title={isLogin ? "Войти" : "Зарегистироваться"}
                />
                <Text style={styles.toggleAuth} onPress={() => setIsLogin(!isLogin)} >{!isLogin ? "Вход" : "Регистрация"}</Text>
            </Wrapper>
        </View>
    )
}


const styles = StyleSheet.create({
    body: {
        height: "100%",
        position: "relative",
        backgroundColor: "white"
    },
    header: {
        backgroundColor: "#1c58ff",
        paddingHorizontal: 40,
        height: "20%",
        width: "100%",
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        elevation: 20,
        shadowColor: 'black',
        zIndex: 2
    },
    mainTitle: {
        fontSize: 36,
        color: "white",
    },
    title: {
        fontSize: 32,
        marginBottom: 20
    },
    toggleAuth: {
        marginTop: 15,
        fontSize: 24,
    },
    button: {
        fontSize: 34,
    }
})