import { StyleSheet } from "react-native"

import EditScreenInfo from "../../components/EditScreenInfo"
import { Text, View } from "../../components/Themed"
import { HelloWorld } from "../../examples/helloWorld/HelloWorld"

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <HelloWorld />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

