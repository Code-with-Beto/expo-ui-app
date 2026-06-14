import { Button, HStack } from "@expo/ui/swift-ui";
import { padding } from "@expo/ui/swift-ui/modifiers";
import { Color, router } from "expo-router";
import MySwiftUiViewSwiftUIView from "../../modules/my-swift-ui-view/src/MySwiftUiViewSwiftUIView";
import { rotatingBorder } from "../../modules/my-swift-ui-view/src/RotatingBorderModifier";

export function CustomSwiftUIView() {
  return (
    <HStack modifiers={[padding()]}>
      <MySwiftUiViewSwiftUIView
        title="Custom SwiftUI view"
        onTap={() => {
          console.log("you pressed!");
        }}
        modifiers={[
          padding(),
          rotatingBorder({
            tint: Color.ios.systemOrange,
          }),
        ]}
      >
        <Button
          label="🌮 Open Beto's Tacos"
          onPress={() => router.push("/restaurant")}
        />
      </MySwiftUiViewSwiftUIView>
    </HStack>
  );
}
