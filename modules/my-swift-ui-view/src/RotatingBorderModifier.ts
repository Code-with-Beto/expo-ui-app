import { createModifier } from "@expo/ui/swift-ui/modifiers";
import { ColorValue } from "react-native";

export const rotatingBorder = (params: {
  cornerRadius?: number;
  tint?: ColorValue;
  lineWidth?: number;
  duration?: number;
  isActive?: boolean;
}) => createModifier("RotatingBorderModifier", params);
