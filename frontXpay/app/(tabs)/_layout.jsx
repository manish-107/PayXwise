import { View, Text, Image } from 'react-native'
import React from 'react'
import {Tabs,Redirect} from 'expo-router'
import iconone from '../../assets/icon.png'

const TabIcon = ({icon,color,name,focused}) => {
  return (
   
        <View>
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
            <Text>
                {name}
            </Text>
        </View>


  )
}



const TabsLayout = () => {
  return (
    <>
    <Tabs>
        <Tabs.Screen
            name='home'
            option={{
                title:"home",
                headerShown:false,
                tabBarIcon:({color,focused})=>{
                    <TabIcon
                    icon={iconone}
                        name="Profile"
                        color={color}
                        focused={focused}
                    />

                }
            }}
        />
        <Tabs.Screen
            name='home'
            option={{
                title:"home",
                headerShown:false,
                tabBarIcon:({color,focused})=>{
                    <TabIcon
                    icon={iconone}
                        name="Profile"
                        color={color}
                        focused={focused}
                    />

                }
            }}
        />
        <Tabs.Screen
            name='home'
            option={{
                title:"home",
                headerShown:false,
                tabBarIcon:({color,focused})=>{
                    <TabIcon
                    icon={iconone}
                        name="Profile"
                        color={color}
                        focused={focused}
                    />

                }
            }}
        />
        <Tabs.Screen
            name='home'
            option={{
                title:"home",
                headerShown:false,
                tabBarIcon:({color,focused})=>{
                    <TabIcon
                    icon={iconone}
                        name="Profile"
                        color={color}
                        focused={focused}
                    />

                }
            }}
        />
    </Tabs>
    </>
  )
}

export default TabsLayout