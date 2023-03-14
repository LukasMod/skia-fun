import { StyleSheet, useWindowDimensions } from "react-native"

import { View } from "../../components/Themed"
import { Coin } from "../../examples/Coin/Coin"

export default function TabOneScreen() {
  const SCREEN_WIDTH = useWindowDimensions().width

  const size = SCREEN_WIDTH / 4
  const offset = 100

  return (
    <View style={styles.container}>
      <Coin size={size} offset={offset} blurColor="#FFD700" loading />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

