import { useFont } from "@shopify/react-native-skia"
import { StyleSheet } from "react-native"

import { View } from "../../components/Themed"
import ConfirmButton from "../../examples/ConfirmButton/ConfirmButton"

export default function TabOneScreen() {
  const font = useFont(require("../../assets/fonts/bold.ttf"), 20)

  return (
    <View style={styles.container}>
      <ConfirmButton
        style={{ height: 60, width: 250 }}
        onDragComplete={() => {
          // run haptic feedback if you want
          console.log("completed")
        }}
        font={font}
        backgroundColor={"#385CF6"}
        textColor={"rgba(255,255,255,0.7)"}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2E6F7",
    alignItems: "center",
    justifyContent: "center",
  },
})

