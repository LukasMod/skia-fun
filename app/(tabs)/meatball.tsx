import { StyleSheet } from "react-native"

import { View } from "../../components/Themed"
import Meatball from "../../examples/Meatball/Meatball"
import { HelloWorld } from "../../examples/Triangle/Triangle"

export default function MeatballScreen() {
  return (
    <View style={styles.container}>
      <Meatball />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

