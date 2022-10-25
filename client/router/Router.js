import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from '../screens/OLD/AuthScreen.js';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import Layout from '../Layout.js';
import LoginScreen from '../screens/LoginScreen.js';
import RegisterScreen from '../screens/RegisterScreen.js';
import MainScreen from '../screens/MainScreen.js';
import PersonScreen from '../screens/PersonScreen.js';
import FriendScreen from '../screens/OLD/FriendScreen.js';
import PersonEditScreen from '../screens/PersonEditScreen.js';
import PostCreateScreen from '../screens/PostCreateScreen.js';

const Stack = createNativeStackNavigator();

export default function Router() {

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    // Иницаиализация логина
    useEffect(() => {
        // dispatch(loginInit())
    }, [dispatch])

    if (auth.token) {
        return (
            <Layout>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false,contentStyle:{backgroundColor:"#F2F2F2"} }} initialRouteName='MainScreen'>
                        <Stack.Screen name="MainScreen" component={MainScreen}/>
                        <Stack.Screen name="PersonEditScreen" component={PersonEditScreen} />
                        <Stack.Screen name="PersonScreen" component={PersonScreen} />
                        <Stack.Screen name="PostCreateScreen" component={PostCreateScreen} />
                        <Stack.Screen name="PostScreen" component={FriendScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Layout>
        )
    }
    return (
        <Layout>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false,contentStyle:{backgroundColor:"#F2F2F2"} }} initialRouteName='MainScreen'>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    <Stack.Screen name="MainScreen" component={MainScreen} />
                    <Stack.Screen name="PersonScreen" component={PersonScreen} />
                    <Stack.Screen name="PostScreen" component={FriendScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Layout>
    )
}
