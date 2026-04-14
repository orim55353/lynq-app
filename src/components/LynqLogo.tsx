import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

interface LynqLogoProps {
  readonly size?: number;
  /** Use white fill for the main letterforms (for dark backgrounds). Orange arrow always stays orange. */
  readonly white?: boolean;
}

/**
 * Lynq brand logo rendered as an SVG.
 * Path 1: "L" letterform
 * Path 2: "q" letterform (body)
 * Path 3: Arrow in the "q" — always orange gradient
 */
export function LynqLogo({ size = 48, white = false }: LynqLogoProps) {
  const mainFill = white ? "#FFFFFF" : "#06B6D4";

  return (
    <Svg width={size} height={size} viewBox="0 0 1200 1200" fill="none">
      <Path
        d="M0 977.067V1.37076C161.691 -12.6483 220.253 84.3169 229.322 134.552V777.298H454.757L349.813 977.067H0Z"
        fill={mainFill}
      />
      <Path
        d="M1200 456.99V1200H1126.15C1020.43 1183.18 983.631 1094.86 978.448 1052.8V947.657C791.881 1026.16 667.922 963.645 608.324 921.588L752.136 767.378C914.474 797.44 978.448 729.573 978.448 670.781V492.038C970.923 298.616 699.967 325.763 682.173 427.416L523.094 507.308L617.176 573.478C590.833 607.412 534.383 682.066 511.804 702.426C489.224 722.786 470.99 737.004 460.625 739.34C242.964 52.406 1126.15 -54.7061 1200 456.99Z"
        fill={mainFill}
      />
      <Path
        d="M446.984 777.326L342.04 977.098C361.474 977.098 429.882 972.892 501.4 961.677C572.917 950.462 668.533 888.077 699.627 849.524L831.779 646.248L928.949 688.305L866.76 397.409L583.023 509.562L668.533 562.133C624.482 622.883 536.381 746.484 536.381 754.896C536.381 763.307 475.488 772.653 446.984 777.326Z"
        fill="url(#lynq-logo-gradient)"
      />
      <Defs>
        <LinearGradient
          id="lynq-logo-gradient"
          x1="635.495"
          y1="397.409"
          x2="635.495"
          y2="977.098"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FB923C" />
          <Stop offset="1" stopColor="#F97316" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
