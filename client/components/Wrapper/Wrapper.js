import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Wrapper({children}) {
  return (
    <View style={styles.wrapper}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper:{
    backgroundColor:"white",
    elevation: 5,
    shadowColor: 'black',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    padding: 40,
    backgroundColor: "white",
    width:"100%",
    height:"80%",
    position:"absolute",
    bottom:0
  }
})
