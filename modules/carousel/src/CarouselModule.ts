import { NativeModule, requireNativeModule } from "expo";

type MaskedCarouselEvents = {
  onItemPress: (payload: { id: string }) => void;
};

declare class CarouselModule extends NativeModule<MaskedCarouselEvents> {}

export default requireNativeModule<CarouselModule>("Carousel");
