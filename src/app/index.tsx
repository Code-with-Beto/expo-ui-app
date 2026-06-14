import { CustomSwiftUIView } from "@/components/CustomSwiftUIView";
import { Button, Column, Host, Spacer, Text } from "@expo/ui";
import { Color, Stack, useRouter } from "expo-router";
import { Platform } from "react-native";
import { rotatingBorder } from "../../modules/my-swift-ui-view/src/RotatingBorderModifier";

export default function Index() {
  const router = useRouter();
  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon={Platform.select({
            android: require("../../assets/images/expo-logo.png"),
            ios: "plus",
          })}
          onPress={() => router.push("/new")}
        />
      </Stack.Toolbar>

      <Host style={{ flex: 1 }}>
        <CustomSwiftUIView />
        <Column
          alignment="center"
          spacing={12}
          style={{ padding: 24 }}
          modifiers={[
            rotatingBorder({
              tint: Color.ios.systemOrange,
            }),
          ]}
        >
          <Spacer flexible />
          <Text textStyle={{ fontSize: 20, fontWeight: "bold" }}>
            Expo UI playground
          </Text>
          <Text textStyle={{ fontSize: 14, color: "#8E8E93" }}>
            Universal components demo — every component, one screen.
          </Text>
          <Button
            label="🌮 Open Beto's Tacos"
            onPress={() => router.push("/restaurant")}
          />
          <Spacer flexible />
        </Column>
      </Host>
    </>
  );
}
