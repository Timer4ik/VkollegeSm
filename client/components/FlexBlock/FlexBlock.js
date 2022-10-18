import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function FlexBlock({ center, column, children }) {

  const styleList = [styles.flexBlock, center && styles.center]

  return (
    <View
      style={styleList}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  flexBlock: {
    display: "flex",
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  }
})