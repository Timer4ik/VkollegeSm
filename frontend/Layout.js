import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Layout({}) {
  return (
    <View>

        
        {children}
        <View style={styles.footer}> 
            <Button>
                
            </Button>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    footer:{
        backgroundColor:"blue",
        padding:20
    }
})