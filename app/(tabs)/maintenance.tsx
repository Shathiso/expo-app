import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'

const maintenance = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <View>
          <Text>Maintenance</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default maintenance