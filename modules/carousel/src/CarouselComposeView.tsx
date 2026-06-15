import { requireNativeView } from "expo";
import type { ModifierConfig } from "@expo/ui/jetpack-compose/modifiers";
import * as React from "react";
import { ViewStyle } from "react-native";
import CarouselModule from "./CarouselModule";

export type MaskedCarouselItem = {
  id: string;
  /** Image source. On Android a content:// URI (expo-media-library `Asset.id`). */
  uri: string;
  contentDescription?: string;
};

export type MaskedCarouselProps = {
  items: MaskedCarouselItem[];
  /** Preferred width (dp) of the large item; peek items resize around it. */
  preferredItemWidth?: number;
  /** Item height in dp. */
  itemHeight?: number;
  /** Spacing between items in dp. */
  itemSpacing?: number;
  /** Horizontal content padding in dp. */
  contentPadding?: number;
  /** Corner radius (dp) of the morphing mask applied to each item. */
  cornerRadius?: number;
  /**
   * Jetpack Compose modifiers applied to the carousel. Must be an array, e.g.
   * `[carouselComposeModifier({ color, width, cornerRadius })]`. Passing a bare
   * modifier object (not wrapped in an array) crashes native prop conversion.
   */
  modifiers?: ModifierConfig[];
  onItemPress?: (event: { nativeEvent: { id: string } }) => void;
  style?: ViewStyle;
};

const NativeCarouselComposeView = requireNativeView<
  Omit<MaskedCarouselProps, "onItemPress">
>("Carousel", "CarouselComposeView");

export default function CarouselComposeView({
  onItemPress,
  modifiers,
  ...rest
}: MaskedCarouselProps) {
  React.useEffect(() => {
    if (!onItemPress) return;
    const sub = CarouselModule.addListener("onItemPress", (payload) =>
      onItemPress({ nativeEvent: payload }),
    );
    return () => sub.remove();
  }, [onItemPress]);

  // Always forward an array. Normalize a stray single modifier object so a
  // wrong shape can't crash the native List<Map> conversion.
  const safeModifiers = Array.isArray(modifiers)
    ? modifiers
    : modifiers
      ? [modifiers]
      : [];

  return <NativeCarouselComposeView modifiers={safeModifiers} {...rest} />;
}
