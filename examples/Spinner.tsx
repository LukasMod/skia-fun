import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  useClockValue,
  useComputedValue,
  vec,
} from "@shopify/react-native-skia"
import { Extrapolate, interpolate } from "react-native-reanimated"

export const Spinner = ({ spinnerSize }: { spinnerSize: number }) => {
  const size = spinnerSize * 0.8
  const r = size * 0.33
  const offset = spinnerSize * 0.1

  const h = (Math.sqrt(3) / 2) * r

  const center = vec(1.5 * r + offset, r + h / 3 + offset)
  const centerCircle1 = vec(r + offset, r + offset)
  const centerCircle2 = vec(2 * r + offset, r + offset)
  const centerCircle3 = vec(1.5 * r + offset, r + h + offset)
  const clock = useClockValue()

  const transform = useComputedValue(() => {
    const interval = 3000
    const rotateClock = (clock.current % interval) / interval

    const rotate = interpolate(
      rotateClock,
      [0, 1, 0],
      [-2 * Math.PI, 0, -2 * Math.PI],
      Extrapolate.CLAMP
    )

    return [{ rotate }]
  }, [clock])

  return (
    <Canvas style={{ flex: 1 }}>
      <Group blendMode="hardLight" origin={center} transform={transform}>
        <Circle c={centerCircle1} r={r}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(2 * r, 2 * r)}
            colors={["#ED4C67", "#0652DD"]}
          />
        </Circle>
        <Circle c={centerCircle2} r={r}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(2 * r, 2 * r)}
            colors={["#0652DD", "#C4E538"]}
          />
        </Circle>
        <Circle c={centerCircle3} r={r}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(2 * r, 2 * r)}
            colors={["#C4E538", "#ED4C67"]}
          />
        </Circle>
      </Group>
    </Canvas>
  )
}

