import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from '../Modal/Modal'

export default function MenuBar() {

    const [leftIsOpen, setLeftIsOpen] = useState(false)


    const openLeftModal = () => {
        setLeftIsOpen(!leftIsOpen)
    }

    return (
        <>
            {/* Придумать как сделать модалку */}
            <Modal isOpen={leftIsOpen} >
                <Text>Создать пост</Text>
            </Modal>
            <View style={styles.menuBar}>
                <TouchableOpacity style={styles.menuBarButton} onPress={() => openLeftModal()}>
                    <Image style={styles.image} source={require("../../images/LeftArrow.png")} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.circle} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuBarButton}>
                    <Image style={styles.image} source={require("../../images/RightArrow.png")} />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    menuBar: {
        width: "100%",
        backgroundColor: "rgb(59, 72, 193)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 20,
        zIndex:10
    },
    circle: {
        backgroundColor: "white",
        width: 80,
        height: 40,
        borderRadius: 100
    },
    menuBarButton: {
    },
    image: {
        width: 20,
        height: 26
    }
})


