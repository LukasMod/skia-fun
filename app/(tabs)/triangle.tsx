import { StyleSheet } from "react-native"

import { View } from "../../components/Themed"
import { HelloWorld } from "../../examples/Triangle/Triangle"

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

