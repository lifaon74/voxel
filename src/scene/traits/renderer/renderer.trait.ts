import { Scene } from '../../components/scene/scene';

export interface RendererTrait {
  render(scene: Scene): void;
}
