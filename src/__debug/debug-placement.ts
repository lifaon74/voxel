export interface FloatingWindow {
  readonly width: number;
  readonly height: number;
}

export interface FloatingAnchor {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
}

export function elementToFloatingAnchor(element: HTMLElement): FloatingAnchor {
  return element.getBoundingClientRect();
}

export function elementToFloatingWindow(element: HTMLElement): FloatingWindow {
  return element.getBoundingClientRect();
}

export function getWindowFloatingWindow(): FloatingWindow {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function addMarginToFloatingWindow(
  { width, height }: FloatingWindow,
  horizontalMargin: number,
  verticalMargin: number = horizontalMargin,
): FloatingWindow {
  return {
    width: Math.max(0, width - 2 * horizontalMargin),
    height: Math.max(0, height - 2 * verticalMargin),
  };
}

/*---*/

export interface PlacedFloating {
  readonly left: number;
  readonly top: number;
  readonly maxWidth: number;
  readonly maxHeight: number;
}

export interface FloatingPlacement {
  (window: FloatingWindow, anchor: FloatingAnchor): PlacedFloating | null;
}

export interface FloatingPlacementOptions {
  readonly position: 'top' | 'bottom-start';
  readonly minHeight?: number | ((window: FloatingWindow, anchor: FloatingAnchor) => number);
}

export function floatingPlacement({
  position,
  minHeight = Number.POSITIVE_INFINITY,
}: FloatingPlacementOptions): FloatingPlacement {
  return (window: FloatingWindow, anchor: FloatingAnchor): PlacedFloating | null => {
    if (position === 'bottom-start') {
      return {
        top: anchor.top + anchor.height,
        left: anchor.left,
        maxWidth: window.width - anchor.left,
        maxHeight: window.height - anchor.top - anchor.height,
      };
    }

    return null;
  };
}

export function firstFloatingPlacementOf(
  placements: readonly FloatingPlacement[],
): FloatingPlacement {
  return (window: FloatingWindow, anchor: FloatingAnchor): PlacedFloating | null => {
    for (let i: number = 0; i < placements.length; i++) {
      const placed: PlacedFloating | null = placements[i](window, anchor);
      if (placed !== null) {
        return placed;
      }
    }

    return null;
  };
}

/*---------*/

export function debugPlacement() {
  const forceScrollElement = document.createElement('div');
  document.body.appendChild(forceScrollElement);
  forceScrollElement.style.width = '10000px';
  forceScrollElement.style.height = '10000px';

  const anchorElement = document.createElement('button');
  document.body.appendChild(anchorElement);
  anchorElement.innerText = 'Button';
  anchorElement.style.position = 'absolute';
  anchorElement.style.left = '200px';
  anchorElement.style.top = '300px';

  const floatingElement = document.createElement('div');
  document.body.appendChild(floatingElement);
  floatingElement.style.position = 'fixed';
  floatingElement.style.background = 'rgba(255, 0, 0, 0.5)';

  /*--*/

  const placement = firstFloatingPlacementOf([floatingPlacement({ position: 'bottom-start' })]);

  const window = addMarginToFloatingWindow(getWindowFloatingWindow(), 10);
  // const window = addMarginToFloatingWindow(elementToFloatingWindow(forceScrollElement), 10);

  const render = (): void => {
    requestAnimationFrame((): void => {
      console.log(elementToFloatingAnchor(anchorElement));
      const placed = placement(window, elementToFloatingAnchor(anchorElement));
      if (placed !== null) {
        floatingElement.style.left = `${placed.left}px`;
        floatingElement.style.top = `${placed.top}px`;
        floatingElement.style.width = `${placed.maxWidth}px`;
        floatingElement.style.height = `${placed.maxHeight}px`;
      }

      render();
    });
  };

  render();
}
