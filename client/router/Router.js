import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from '../screens/AuthScreen.js';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import PersonScreen from '../screens/PersonScreen.js';
import { loginInit } from '../store/actions/AuthActions.js';

const Stack = createNativeStackNavigator();

export default function Router() {

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loginInit())
    },[dispatch])

    if (auth.token) {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Page" component={PersonScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Auth" component={AuthScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
