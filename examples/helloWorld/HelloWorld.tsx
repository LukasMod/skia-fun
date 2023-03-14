import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  mix,
  Skia,
  useSharedValueEffect,
  useValue,
  vec,
  Vertices,
} from "@shopify/react-native-skia"
import { useEffect } from "react"
import {
  interpolate,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"

export const HelloWorld = () => {

  const size = 360
  const r = size * 0.33
  //   const r = 110

  const animR = useValue(0)
  const animRotate = useValue(0)
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true)
  }, [progress])

  const min = r * 0.8
  const max = r * 1.2

  useSharedValueEffect(() => {
    animR.current = mix(progress.value, min, max)
    animRotate.current = mix(progress.value, 0, 2 * Math.PI)
  }, progress)

  const vertices = [
    vec(r / 2, r / 1.5),
    vec(r / 2 + 2 * r, r / 1.5),
    vec(size / 2, size - r / 2),
  ]

  const path = Skia.Path.Make()
  path.moveTo(r / 2, r / 1.5)
  path.lineTo(r / 2 + 2 * r, r / 1.5)
  path.lineTo(size / 2, size - r / 2)
  path.close()

  return (
    <>
      <Canvas style={{ flex: 1 }}>
        <Group
          blendMode="hardLight"
          // origin={{ x: 0, y: 50 }}
          // transform={[{ skewX: Math.PI / 6 }]}
          //   clip={path}
          transform={
            [
              // { rotate: animRotate.current },
              // { translateX: size },
              // { translateY: -size / 2 },
            ]
          }
          // invertClip
        >
          <Vertices vertices={vertices} colors={["blue", "green", "magento"]} />
          <Circle cx={r} cy={r} r={animR} color="cyan">
            <LinearGradient
              start={vec(0, 0)}
              end={vec(2 * r, 2 * r)}
              colors={["#ED4C67", "#0652DD"]}
            />
          </Circle>
          <Circle cx={size - r} cy={r} r={animR} color="yellow">
            <LinearGradient
              start={vec(0, 0)}
              end={vec(2 * r, 2 * r)}
              colors={["#0652DD", "#C4E538"]}
            />
          </Circle>
          <Circle cx={size / 2} cy={size - r} r={animR} color="green">
            <LinearGradient
              start={vec(0, 0)}
              end={vec(2 * r, 2 * r)}
              colors={["#C4E538", "#ED4C67"]}
            />
          </Circle>
        </Group>
      </Canvas>
    </>
  )
}

