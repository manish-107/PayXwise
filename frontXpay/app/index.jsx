import {  Text, View } from 'react-native'
import React from 'react'
import {Link} from 'expo-router'

const index = () => {
  return (
    <>
    <View className="flex items-center justify-center flex-1">
        <Text className="text-red-700 ">headder</Text>
        <Text>headder</Text>
        <Text>Fot</Text>
        <Link href="/profile" style={{color:'blue'}} >Go to profile</Link>
    </View>
    </>
  )
}

export default index
