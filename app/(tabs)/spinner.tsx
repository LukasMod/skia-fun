import { StyleSheet, useWindowDimensions } from "react-native"

import EditScreenInfo from "../../components/EditScreenInfo"
import { Text, View } from "../../components/Themed"
import { HelloWorld } from "../../examples/helloWorld/HelloWorld"
import { Spinner } from "../../examples/Spinner"

export default function TabOneScreen() {
  const spinners = new Array(15).fill(1)

  const SCREEN_WIDTH = useWindowDimensions().width

  const spinnerSize = SCREEN_WIDTH / 3

  return (
    <View style={styles.container}>
      {/* <HelloWorld /> */}
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
    // backgroundColor: "rgba(123,231,24,0.2)",
  },
})
