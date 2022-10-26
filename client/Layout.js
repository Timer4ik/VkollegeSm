import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import HeaderComponent from './components/Header/HeaderComponent'
import Loader from './components/Loader/Loader'
import MenuBar from './components/MenuBar/MenuBar'
import Modal from './components/Modal/Modal'
import { useSwipe } from './hooks/useSwipe'

export default function Layout({ children }) {

  const [isOpen, setIsOpen] = useState(false)
  const { bind, distance, direction } = useSwipe()

  const dispatch = useDispatch()
  const { token: isAuth } = useSelector(state => state.auth)
  const { isLoading } = useSelector(state => state.app)

  useEffect(() => {
    if (distance > 160) {
      if (direction > 0) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }
  }, [distance])

  return (
    <View style={styles.layout} {...bind}>
      <StatusBar backgroundColor="#3B48C1" />
      <HeaderComponent />
      <View style={styles.content}>
        {children}
      </View>
  
      {isAuth && <MenuBar />}
      {isLoading && <Loader />}
    </View>
  )
}

const styles = StyleSheet.create({
  layout: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F2F2F2"
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