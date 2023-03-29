import { StyleSheet, useWindowDimensions } from "react-native"

import { View } from "../../components/Themed"
import { Spinner } from "../../examples/Spinner/Spinner"

export default function TabOneScreen() {
  const spinners = new Array(3).fill(1)

  const SCREEN_WIDTH = useWindowDimensions().width

  const spinnerSize = SCREEN_WIDTH / 3

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {spinners.map((spinner, index) => (
          <View
            style={{
              height: spinnerSize,
              width: spinnerSize,
            }}
            key={index}
          >
            <Spinner spinnerSize={spinnerSize} />
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

