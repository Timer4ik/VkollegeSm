import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Modal from './components/Modal/Modal'
import { useSwipe } from './hooks/useSwipe'

export default function Layout({ children }) {

  const [isOpen, setIsOpen] = useState(false)
  const { bind, distance, direction } = useSwipe()
  const dispatch = useDispatch()
  const { errors, message } = useSelector(state => state.auth)

  useEffect(() => {
    if (distance > 160) {
      if (direction > 0) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }
  }, [distance])

  useEffect(() => {
    Alert.alert(message)
  })

  return (
    <View style={styles.layout} {...bind}>
      <View style={styles.content}>
        {children}
      </View>
      <View style={styles.footer}>
        <Button title='Меню' />
        <Button title='Моя страница' />
        <Button title='Настройки' />
      </View>
      <Modal isOpen={isOpen}>
        <Text>ugabuga</Text>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  layout: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1
  },
  footer: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "blue"
  }
})