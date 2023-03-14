import {
  BlurMask,
  Canvas,
  Circle,
  FitBox,
  Group,
  Path,
  rect,
  useClockValue,
  useComputedValue,
  vec,
} from "@shopify/react-native-skia"
import { useEffect } from "react"
import { View } from "react-native"
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated"

const path1 = `M524.62 454.744H540.756C571.425 454.744 602.102 454.744 632.78 454.744C643.414 454.744 643.538 454.593 645.797 444.508C648.181 433.874 650.272 423.071 652.886 410.611C646.542 410.39 641.429 410.062 636.316 410.062C523.441 410.062 410.563 410.062 297.683 410.062H281.582C310.15 317.703 338.081 227.426 366.012 137.115L368.865 136.92C389.911 202.79 410.611 268.776 431.647 335.781C419.241 338.395 407.677 336.747 395.156 336.96L369.264 256.033C363.291 263.494 336.061 348.525 333.73 365.362C342.14 367.959 638.992 368.703 652.895 366.16C656.927 259.595 570.423 129.635 436.096 103.049C441.678 123.272 449.494 141.856 456.078 160.82C462.91 180.502 470.078 200.07 477.132 219.681C484.032 238.9 490.953 258.118 497.894 277.337C504.779 296.505 511.638 315.691 518.984 336.189H481.899C480.544 332.866 478.736 328.851 477.256 324.73C453.886 259.743 430.551 194.755 407.252 129.768C403.318 118.797 403.327 118.744 391.692 118.691C377.791 118.637 363.888 118.637 349.982 118.691C337.576 118.691 337.576 118.691 333.615 130.264C317.198 178.201 300.814 226.141 284.462 274.084C255.574 358.763 226.695 443.445 197.825 528.129C192.429 543.966 187.085 559.828 181.272 577.021C219.544 613.727 264.896 638.292 317.319 648.802C376.796 660.695 434.678 655.378 491.266 629.483L445.799 496.457H433.154C389.804 496.522 346.455 496.587 303.106 496.652C291.232 496.652 291.072 496.696 287.909 507.738C278.365 541.094 268.972 574.495 259.473 607.878C258.711 610.536 257.639 613.195 256.247 617.156C234.617 606.123 214.121 595.001 197.816 575.691H230.745L266.73 455.524H470.141C487.659 506.923 505.258 558.623 523.397 611.848C529.405 608.002 534.19 604.368 539.48 601.728C543.299 599.831 548.031 597.722 551.886 598.387C562.103 600.159 565.541 612.459 558.549 620.214C557.418 621.397 556.164 622.457 554.81 623.377C511.514 654.509 463.539 673.722 410.469 679.881C366.143 685.172 321.194 680.525 278.888 666.278C232.16 650.761 189.872 624.187 155.619 588.816C110.861 543.026 82.1944 488.676 72.2609 425.668C58.7918 340.274 77.108 261.509 129.31 191.917C171.897 135.147 227.891 97.3067 296.486 78.484C323.66 70.8861 351.815 67.3826 380.021 68.089C446.791 70.0563 507.349 90.4387 560.605 131.461C615.926 174.06 653.719 228.818 671.203 296.292C695.243 388.979 678.992 475.108 623.919 553.643C617.817 562.335 611.247 570.69 604.238 578.669C593.144 591.297 578.638 590.189 569.458 576.329C567.078 572.536 565.145 568.48 563.698 564.242C551.812 531.606 539.997 498.938 528.253 466.238C527.189 463.163 526.312 460.061 524.62 454.744ZM152.172 545.747C161.024 529.308 301.83 115.828 302.14 106.497C240.359 117.733 154.157 174.157 117.037 266.897C77.6397 365.283 91.3215 457.455 152.172 545.747ZM594.996 547.369C608.394 530.664 618.195 515.288 625.815 497.857C607.393 495.482 586.976 496.085 577.831 499.488L594.996 547.369Z`
const path2 = `M 421.489 748.446 C 403.888 748.446 382.734 749.199 365.142 748.809 C 274.949 746.851 195.918 715.641 127.963 656.755 C 69.149 605.789 30.418 542.137 10.699 466.906 C 0.759 428.998 -1.29 390.426 0.67 351.473 C 4.758 268.481 35.375 196.014 88.363 132.761 C 129.044 84.205 179.506 48.866 238.408 25.514 C 244.509 23.068 250.166 22.183 255.317 27.498 C 261.01 33.301 260.877 41.814 254.431 46.749 C 251.265 49.167 247.337 50.7 243.613 52.277 C 147.201 93.028 81.166 162.539 45.51 260.809 C 34.958 290.044 29.479 320.439 27.395 351.676 C 23.015 417.275 36.081 479.046 66.595 536.99 C 104.164 608.19 160.132 659.98 233.594 692.811 C 287.681 716.943 344.553 726.475 403.412 721.319 C 479.338 714.613 546.585 686.353 604.113 636.025 C 656.303 590.339 693.172 534.279 709.513 467.056 C 743.855 326.038 707.589 205.494 598.172 108.797 C 553.838 69.587 501.364 45.624 443.171 34.16 C 418.627 29.323 393.897 26.072 368.955 27.25 C 349.031 28.189 329.196 31.157 309.325 33.283 C 306.905 33.549 304.52 34.47 302.108 34.541 C 294.837 34.771 288.275 29.279 287.318 22.457 C 286.484 16.477 290.084 10.763 296.956 8.584 C 302.023 7.005 307.237 5.942 312.517 5.412 C 329.95 3.641 347.522 2.817 364.876 0.735 C 393.459 -2.694 476.893 8.016 538.622 33.521 C 554.601 40.123 602.886 69.373 644.415 110.959 C 686.164 152.765 715.95 210.453 733.587 248.551 C 738.346 258.831 740.588 272.58 744.173 287.22 C 751.286 316.262 753.934 349.209 753.392 372.196 C 752.37 415.564 754.903 488.804 691.213 587.623 C 690.131 589.301 657.435 629.262 639.078 647.713 C 621.258 665.625 582.455 692.651 555.808 706.078 C 505.566 731.393 447.591 745.51 421.489 748.446 Z`

export const Coin = ({
  size = 50,
  offset = 5,
  blurColor = "#FFD700",
  blurType = "normal",
  loading,
}: {
  size: number
  offset: number
  blurColor?: string
  blurType?: "solid" | "normal" | "outer" | "inner"
  loading: boolean
}) => {
  const centerCircle = vec((size + offset) / 2, (size + offset) / 2)
  const progressRotate = useSharedValue(0)
  const progressScale = useSharedValue(0)

  const startDuration = 600
  const standardDuration = 300
  const clockInterval = 3000

  const anim1 = withTiming(1, {
    duration: startDuration,
    easing: Easing.ease,
  })

  const anim2 = withTiming(0, {
    duration: standardDuration,
    easing: Easing.linear,
  })
  const anim3 = withTiming(1, {
    duration: standardDuration,
    easing: Easing.linear,
  })
  const fastAnim = withSequence(anim2, anim3)

  useEffect(() => {
    if (loading) {
      progressRotate.value = withSequence(anim1, withRepeat(fastAnim, -1))
      progressScale.value = withTiming(1, { duration: 300 })
    }
  }, [loading])

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(progressRotate.value, [0, 1], [0, Math.PI])
    const scale = interpolate(progressScale.value, [0, 1], [0, 1])

    return {
      transform: [
        {
          rotateY: `${rotate}rad`,
        },
        { scale },
      ],
    }
  })

  const clock = useClockValue()

  const blur = useComputedValue(() => {
    const value = interpolate(
      (clock.current % clockInterval) / clockInterval,
      [0, 0.5, 1],
      [offset / 6, offset / 3, offset / 6],
      Extrapolate.CLAMP
    )
    return value
  }, [clock])

  const opacity = useComputedValue(() => {
    const value = interpolate(
      (clock.current % clockInterval) / clockInterval,
      [0, 0.5, 1],
      [0, 0.3, 0],
      Extrapolate.CLAMP
    )
    return value
  }, [clock])

  return (
    <View>
      <Canvas
        style={{
          position: "absolute",
          left: offset / 2,
          top: offset / 2,
          height: size + offset,
          width: size + offset,
          zIndex: -100,
        }}
      >
        <Circle
          c={centerCircle}
          r={size / 2}
          style="fill"
          color={blurColor}
          opacity={opacity}
        />
        <BlurMask blur={blur} style={blurType} />
      </Canvas>
      <Animated.View
        style={[
          { width: size + 2 * offset, height: size + 2 * offset },
          animatedStyle,
        ]}
      >
        <Canvas
          style={{
            flex: 1,
          }}
        >
          <FitBox
            src={rect(0, 0.509, 753.558, 748.491)}
            dst={rect(offset, offset, size, size)}
          >
            <Group>
              <Path path={path1} />
              <Path path={path2} />
            </Group>
          </FitBox>
        </Canvas>
      </Animated.View>
    </View>
  )
}

