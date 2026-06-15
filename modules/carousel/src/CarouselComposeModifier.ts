import { createModifier, type ModifierConfig } from '@expo/ui/jetpack-compose/modifiers';

export const carouselComposeModifier = (params: {
  color?: number;
  width?: number;
  cornerRadius?: number;
}): ModifierConfig => createModifier('carouselComposeModifier', params);
