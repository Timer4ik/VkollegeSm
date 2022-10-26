import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import useField from '../hooks/useField'

import * as AuthAction from "../store/actions/AuthActions.js"

function LoginService() {
    return (
        <View style={styles.loginAnother}>
            <Text style={{ width: 180 }}>
                Или войти спомощью сервисов
            </Text>
            <View style={styles.loginService}>
                {[1, 2, 3, 4, 5].map(i =>
                    <View key={i} style={{ width: 30, height: 30, backgroundColor: "gray", margin: 5 }} />
                )}
            </View>
        </View>

    )
}

function Divider() {
    return (
        <View style={styles.divider}>

        </View>
    )
}

function AuthSwitcher(props) {
    return (
        <TouchableOpacity style={styles.authSwitcher} {...props}>
            <Text style={styles.authSwitcherTitle}>Нет аккаунта ?</Text>
            <Text style={styles.authSwitcherTitleBlue}>Зарегистрируйтесь !</Text>
        </TouchableOpacity>
    )
}

function ErrorView(props) {
    return (
        <Text style={styles.errorView}>{props.msg}</Text>
    )
}


export default function LoginScreen({ navigation }) {

    const switchOnRegister = () => {
        navigation.navigate("RegisterScreen")
    }
    const dispatch = useDispatch()
    const { message, error } = useSelector(state => state.auth)

    const email = useField("")
    const password = useField("")

    const login = async () => {
        dispatch(AuthAction.login({
            email: email.value,
            password: password.value
        }))
    }

    useEffect(() => {
        message && Alert.alert("Ошибка", message)
    }, [error, message])
    
    const emailError = error?.find(e => e.param === "email")?.msg
    const passwordError = error?.find(e => e.param === "password")?.msg

    return (
        <ScrollView>
            <View style={styles.auth}>
                <Text style={styles.title}>
                    Вход
                </Text>

                <View style={styles.field}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput {...email} style={styles.input} placeholder="Введите email" />
                    <ErrorView msg={emailError} />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Пароль</Text>
                    <TextInput {...password} style={styles.input} placeholder="Введите пароль" secureTextEntry={true} />
                    <ErrorView msg={passwordError} />
                </View>

                <LoginService />

                <TouchableOpacity style={styles.button} onPress={login}>
                    <Text style={styles.buttonText}>Войти</Text>
                </TouchableOpacity>

                <View style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Забыли пароль ??</Text>
                </View>

                <Divider />

                <AuthSwitcher onPress={switchOnRegister} />
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    customButton: {

    },
    title: {
        fontSize: 32,
        marginBottom: 25,
        color: "#252525",
    },
    auth: {
        padding: 25,
    },

    label: {
        fontSize: 16,
        marginBottom: 18,
        color: "#606060",
    },
    input: {
        fontSize: 25,
        padding: 10,
        borderColor: "#E8E8E8",
        borderWidth: 1
    },
    field: {
        marginBottom: 25
    },

    button: {
        backgroundColor: "#3B48C1",
        width: "100%",
        padding: 20,
        borderRadius: 18,
        marginBottom: 25
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        textAlign: "center"
    },
    loginService: {
        display: "flex",
        flexDirection: "row"
    },

    divider: {
        height: 10,
        backgroundColor: "#D1D1D1",
        marginHorizontal: -25,
        marginBottom: 25
    },

    authSwitcher: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: 15
    },
    authSwitcherTitle: {
        marginRight: 5,
        fontSize: 16
    },
    authSwitcherTitleBlue: {
        fontSize: 16,
        color: "#4E5FFC"
    },

    loginAnother: {
        opacity: 0.2,
        marginBottom: 25
    },

    forgotPassword: {
        marginBottom: 25
    },
    forgotPasswordText: {
        fontSize: 16,
        color: "#4E5FFC"
    },
    errorView: {
        fontSize: 12,
        color: "red",
        marginTop: 10
    }

})