import React, { useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import useField from '../hooks/useField'

import * as AuthAction from "../store/actions/AuthActions.js"

function LoginService() {
    return (
        <View style={styles.loginAnother}>
            <Text style={{ width: 180, marginBottom: 12 }}>
                Или спомощью сервисов
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
            <Text style={styles.authSwitcherTitle}>Уже есть аккаунт ?</Text>
            <Text style={styles.authSwitcherTitleBlue}>Войдите в систему !</Text>
        </TouchableOpacity>
    )
}

function ErrorView(props) {
    return (
        <Text style={styles.errorView}>{props?.msg}</Text>
    )
}



export default function RegisterScreen({ navigation }) {

    const switchOnLogin = () => {
        navigation.navigate("LoginScreen")
    }
    const dispatch = useDispatch()
    const { message, error } = useSelector(state => state.auth)

    const name = useField("")
    const email = useField("")
    const password = useField("")

    const register = async () => {
        dispatch(AuthAction.register({
            name: name.value,
            email: email.value,
            password: password.value
        }))
    }

    useEffect(() => {
        message && Alert.alert("Ошибка", message)
        console.log(error);
    }, [error, message])

    const nameError = error?.find(e => e.param === "name")?.msg
    const emailError = error?.find(e => e.param === "email")?.msg
    const passwordError = error?.find(e => e.param === "password")?.msg

    return (
        <ScrollView>
            <View style={styles.auth}>
                <Text style={styles.title}>
                    Регистрация
                </Text>

                <View style={styles.field}>
                    <Text style={styles.label}>Никнейм</Text>
                    <TextInput style={styles.input} {...name} placeholder="Введите имя" />
                    <ErrorView msg={nameError} />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput style={styles.input} {...email} placeholder="Введите email" />
                    <ErrorView msg={emailError} />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Пароль</Text>
                    <TextInput secureTextEntry={true} style={styles.input} {...password} placeholder="Введите пароль" />
                    <ErrorView msg={passwordError} />
                </View>

                <LoginService />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => register()}>Зарегистироваться</Text>
                </TouchableOpacity>

                <AuthSwitcher onPress={switchOnLogin} />
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    customButton: {

    },
    title: {
        fontSize: 32,
        marginBottom: 30
    },
    auth: {
        padding: 25
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
        marginBottom: 30
    },

    button: {
        backgroundColor: "#3B48C1",
        width: "100%",
        padding: 20,
        borderRadius: 18,
        marginBottom: 30
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
        marginBottom: 30
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
        marginBottom: 30
    },

    forgotPassword: {
        marginBottom: 30
    },
    forgotPasswordText: {
        fontSize: 16,
        color: "#4E5FFC"
    }, 
    errorView: {
        fontSize: 12,
        color: "red",
        marginTop:10
    }
})