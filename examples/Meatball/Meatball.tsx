import {
  Blur,
  clamp,
  ColorMatrix,
  Group,
  Line,
  Paint,
  Path,
  runDecay,
  runSpring,
  runTiming,
  Skia,
  SweepGradient,
  useComputedValue,
  useTiming,
  useValue,
  useValueEffect,
  vec,
} from "@shopify/react-native-skia"
import { useNavigation } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect, useMemo, useState } from "react"
import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native"
import Touchable, { useGestureHandler } from "react-native-skia-gesture"

function getRandomInteger(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const RADIUS = 30
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height
const arenaHeight = height * 0.6

const RADIUS_GESTURE = 25
const BLUR = 7

const getRandomIntegerScreenCoords = (radius: number) => {
  return {
    x: getRandomInteger(radius, width - radius * 2),
    y: getRandomInteger(radius, arenaHeight - radius * 2),
  }
}
function getDistance(x1: number, y1: number, x2: number, y2: number) {
  let x = x2 - x1
  let y = y2 - y1

  return Math.sqrt(x * x + y * y)
}

export default function Meatball({}) {
  const { width, height } = useWindowDimensions()
  const [game, setGame] = useState(0)
  const [scoreState, setScoreState] = useState(0)
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={onPressReset} title="reset ball" />,
      headerLeft: () => <Button onPress={onPresHelp} title="help" />,
    })
  }, [navigation])

  useEffect(() => {}, [])

  const startCoords = {
    x: (width + RADIUS) / 2,
    y: height * 0.8 - 2 * RADIUS,
  }

  const firstCx = useValue(startCoords.x)
  const firstCy = useValue(startCoords.y)
  const foodRadius = useValue(30)
  const scoreDistance = useComputedValue(() => {
    return RADIUS + foodRadius.current
  }, [])

  const foodCx = useValue(getRandomIntegerScreenCoords(foodRadius.current).x)
  const foodCy = useValue(getRandomIntegerScreenCoords(foodRadius.current).y)

  const score = useValue(0)
  const isCounted = useValue(false)
  const isGameCounted = useValue(false)

  const distance = useComputedValue(() => {
    const dist = getDistance(
      firstCx.current,
      firstCy.current,
      foodCx.current,
      foodCy.current
    )
    return dist
  }, [firstCx, firstCy, foodCx, foodCy])

  useValueEffect(distance, () => {
    if (!isCounted.current && distance.current < scoreDistance.current) {
      score.current = score.current + 1
      runSpring(foodRadius, foodRadius.current - 1)
      isCounted.current = true
    }
  })

  useValueEffect(score, () => {
    setScoreState(score.current)
  })

  useValueEffect(firstCy, () => {
    if (!isGameCounted.current && firstCy.current < height - arenaHeight) {
      setGame((prev) => prev + 1)
      isGameCounted.current = true
    }
  })

  const circleGesture = useGestureHandler<{
    x: number
    y: number
  }>({
    onStart: (_, context) => {
      if (context.y < arenaHeight) {
        return
      }

      context.x = firstCx.current
      context.y = firstCy.current
    },
    onActive: ({ translationX, translationY, x, y }, context) => {
      if (context.y < arenaHeight) {
        return
      }

      firstCx.current = context.x + translationX
      firstCy.current = clamp(context.y + translationY, arenaHeight, height)
    },
    onEnd: (
      { translationX, translationY, velocityX, velocityY, x, y },
      context
    ) => {
      if (context.y < arenaHeight) {
        onPressReset()
        context.y = startCoords.y
        return
      }

      runDecay(firstCx, {
        velocity: velocityX,
      })

      runDecay(firstCy, {
        velocity: velocityY,
      })
    },
  })

  const path = useComputedValue(() => {
    const circles = Skia.Path.Make()
    circles.addCircle(firstCx.current, firstCy.current, RADIUS)
    circles.addCircle(foodCx.current, foodCy.current, foodRadius.current)
    return circles
  }, [firstCx, firstCy, foodCx, foodCy])

  const paint = useMemo(() => {
    return (
      <Paint>
        <Blur blur={BLUR} />
        <ColorMatrix
          matrix={[
            // R, G, B, A, Offset
            // R
            1,
            0,
            0,
            0,
            0,
            // G
            0,
            1,
            0,
            0,
            0,
            // B
            0,
            0,
            1,
            0,
            0,
            // A
            0,
            0,
            0,
            BLUR * 2,
            -BLUR, // << creates a threshold
          ]}
        />
      </Paint>
    )
  }, [])

  const onPressReset = () => {
    firstCx.current = startCoords.x
    firstCy.current = startCoords.y

    foodCx.current = getRandomIntegerScreenCoords(foodRadius.current).x
    foodCy.current = getRandomIntegerScreenCoords(foodRadius.current).y

    isCounted.current = false
    isGameCounted.current = false
  }

  const onPresHelp = () => {
    Alert.alert(
      "",
      "throw ball, aim another ball above, ball above will be smaller with each success hit",
      [
        { text: "play" },
        {
          text: "restart game",
          onPress: () => {
            onPressReset()
            setScoreState(0)
            setGame(0)
          },
        },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Touchable.Canvas style={{ flex: 1 }}>
        <Line
          p1={{ x: 0, y: arenaHeight }}
          p2={{ x: width, y: arenaHeight }}
          color="blue"
          strokeWidth={4}
        />
        <Group layer={paint}>
          <Path path={path}>
            <SweepGradient c={vec(0, 0)} colors={["cyan", "blue", "cyan"]} />
          </Path>
        </Group>
        <Touchable.Circle
          cx={firstCx}
          cy={firstCy}
          r={RADIUS_GESTURE}
          {...circleGesture}
          color={"transparent"}
        />
      </Touchable.Canvas>
      <View style={styles.gameInfo}>
        <Text style={styles.gameText}>games played: {game}</Text>
        <Text style={styles.gameText}>score: {scoreState}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  gameInfo: {
    position: "absolute",
    margin: 5,
  },
  gameText: {
    color: "white",
  },
})

