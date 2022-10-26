import React from 'react'
import { View, Text, Image, StyleSheet, TextInput } from 'react-native'

const FakeImage = () => {
    return (
        <View style={{width:50,height:50,backgroundColor:"gray"}} />
    )
}


export default function PostCreateScreen() {
    return (
        <View>
            <View>
              <FakeImage/>
              <Text>Имя пользователя</Text>
            </View>
            <TextInput style={styles.title} placeholder="Введите заголовок"/>
            <TextInput style={styles.content} placeholder="Введите текст"/>
        </View>
    )
}

const styles = StyleSheet.create()