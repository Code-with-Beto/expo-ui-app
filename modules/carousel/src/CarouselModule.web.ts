import { registerWebModule, NativeModule } from 'expo';

// CarouselModule is not available on the web platform.
class CarouselModule extends NativeModule<{}> {}

export default registerWebModule(CarouselModule, 'CarouselModule');
