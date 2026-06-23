package expo.modules.carousel

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.ui.ExpoUIView
import expo.modules.kotlin.records.recordFromMap
import expo.modules.ui.ModifierRegistry

class CarouselModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("Carousel")

    // Module-level event: dispatched when a carousel item is tapped. JS
    // subscribes via `addListener("onItemPress", …)` (see MaskedCarouselView.tsx).
    Events("onItemPress")

    ExpoUIView<CarouselComposeViewProps>("CarouselComposeView") {
      Content { props ->
        CarouselComposeViewContent(props) { id ->
          this@CarouselModule.sendEvent("onItemPress", mapOf("id" to id))
        }
      }
    }

    OnCreate {
      ModifierRegistry.register("carouselComposeModifier") { params, _, _, _ ->
        recordFromMap<CarouselComposeModifierParams>(params).toModifier()
      }
    }
  }
}
