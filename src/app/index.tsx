import { Column, Host } from "@expo/ui/jetpack-compose";
import { padding } from "@expo/ui/jetpack-compose/modifiers";
import { Stack, useRouter } from "expo-router";
import { Platform } from "react-native";
import CarouselComposeView from "../../modules/carousel/src/CarouselComposeView";

const CDN = "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/dotwork";

const DOTWORK = [
  "arm-female",
  "arm-male",
  "back-female-2",
  "back-female-3",
  "back-female",
  "calf-male",
  "chest-female-2",
  "chest-female",
  "chest-male-2",
];

const CAROUSEL_ITEMS = DOTWORK.map((name) => ({
  id: name,
  uri: `${CDN}/${name}.avif`,
  contentDescription: `Dotwork tattoo — ${name.replace(/-/g, " ")}`,
}));

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

      <Host style={{ flex: 1 }} matchContents={{ vertical: true }}>
        <Column modifiers={[padding(0, 30, 0, 0)]}>
          <CarouselComposeView
            items={CAROUSEL_ITEMS}
            preferredItemWidth={250}
            itemHeight={300}
            onItemPress={(e) => {
              const id = e.nativeEvent.id;
              if (!id) return;

              console.log("native id", id);
            }}
            style={{ flex: 1 }}
          />
        </Column>
      </Host>
    </>
  );
}
