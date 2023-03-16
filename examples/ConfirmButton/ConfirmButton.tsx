import { useValue } from "@shopify/react-native-skia"
import React from "react"
import { StyleProp, ViewStyle } from "react-native"
import Touchable from "react-native-skia-gesture"
import ConfirmButtonContent, {
  ConfirmButtonContentProps,
} from "./ConfirmButtonContent"

type ConfirmButtonProps = ConfirmButtonContentProps & {
  style?: StyleProp<ViewStyle>
}

// This awesome button was made by Enzo Manuel Mangano "Reactiive"
// https://www.patreon.com/reactiive/about
//
// I fixed it to be compatible with the newest react-native-skia version (deprecate useCanvas())

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  textColor,
  backgroundColor,
  onDragComplete,
  style,
  font,
}) => {
  const size = useValue({
    width: 0,
    height: 0,
  })

  return (
    <Touchable.Canvas style={style} onSize={size}>
      <ConfirmButtonContent
        textColor={textColor}
        backgroundColor={backgroundColor}
        onDragComplete={onDragComplete}
        font={font}
        size={size}
      />
    </Touchable.Canvas>
  )
}

export default ConfirmButton

