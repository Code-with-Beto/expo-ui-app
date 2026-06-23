package expo.modules.carousel

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.graphics.Color
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Text
import androidx.compose.material3.carousel.HorizontalMultiBrowseCarousel
import androidx.compose.material3.carousel.rememberCarouselState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import coil3.compose.AsyncImage
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.types.OptimizedRecord
import expo.modules.kotlin.views.ComposeProps
import expo.modules.kotlin.views.FunctionalComposableScope
import expo.modules.ui.ModifierList
import expo.modules.ui.ModifierRegistry
import java.io.Serializable


@OptimizedRecord
data class CarouselItemRecord(
  @Field val id: String = "",
  @Field val uri: String = "",
  @Field val contentDescription: String = ""
) : Record, Serializable

data class CarouselComposeViewProps(
  val items: List<CarouselItemRecord> = emptyList(),
  val preferredItemWidth: Float = 186f,
  val itemHeight: Float = 205f,
  val itemSpacing: Float = 8f,
  val contentPadding: Float = 16f,
  val cornerRadius: Float = 24f,
  val modifiers: ModifierList = emptyList()
) : ComposeProps

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FunctionalComposableScope.CarouselComposeViewContent(
  props: CarouselComposeViewProps,
  onItemPress: (String) -> Unit
  ) {
  val carouselState = rememberCarouselState(0) { props.items.size }

  HorizontalMultiBrowseCarousel (
    state = carouselState,
    modifier = Modifier
      .fillMaxWidth()
      .wrapContentHeight()
      .then(
        ModifierRegistry.applyModifiers(
          props.modifiers,
          appContext,
          composableScope,
          globalEventDispatcher
        )
      ),
    preferredItemWidth = props.preferredItemWidth.dp,
    itemSpacing = props.itemSpacing.dp,
    contentPadding = PaddingValues(horizontal = props.contentPadding.dp)
  ) { i ->
    // `this` is CarouselItemScope here, so `maskClip` is in scope.
    val item = props.items[i]
    AsyncImage(
      model = item.uri,
      contentDescription = item.contentDescription,
      contentScale = ContentScale.Crop,
      modifier = Modifier
        .height(props.itemHeight.dp)
        // Give items a width while empty so the carousel doesn't collapse, plus a
        // visible placeholder background when the uri is empty or still loading.
        .fillMaxWidth()
        // maskClip before clickable so the ripple is clipped to the mask too.
        .maskClip(RoundedCornerShape(props.cornerRadius.dp))
        .clickable { onItemPress(item.id) }
    )
  }
}
