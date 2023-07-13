import { mat4, mat4_create, mat4_identity, mat4_rotate_x, mat4_rotate_y, mat4_translate, MATH_PI, readonly_mat4 } from '@lifaon/math';
import { createAnimationFrameLoop, createEventListener, IUnsubscribe, mergeUnsubscribeFunctions } from '@lirx/utils';

export interface IFreeViewMatrixOptions {
  translationSpeed?: number; // in space_unit/sec
  rotationSpeed?: number; // in rad/sec
}

export class FreeViewMatrix {
  readonly #translationSpeed: number; // in space_unit/ms
  readonly #rotationSpeed: number; // in rad/ms
  readonly #matrix: mat4;
  #stop: IUnsubscribe | undefined;

  constructor(
    {
      translationSpeed = 1,
      rotationSpeed = MATH_PI,
    }: IFreeViewMatrixOptions = {},
  ) {
    this.#translationSpeed = translationSpeed / 1000;
    this.#rotationSpeed = rotationSpeed / 1000;
    this.#matrix = mat4_create();
    this.#stop = void 0;
  }

  get matrix(): readonly_mat4 {
    return this.#matrix;
  }

  get started(): boolean {
    return this.#stop !== void 0;
  }

  start(): this {
    if (this.#stop === void 0) {
      let movementX: number = 0;
      let movementY: number = 0;
      const keyPressed: Set<string> = new Set<string>();
      let lastUpdateTime: number = Date.now();

      const unsubscribeOfClick = createEventListener(window, 'click', (): void => {
        if (document.pointerLockElement === null) {
          document.body.requestPointerLock();
        }
      });

      const unsubscribeOfPointerMove = createEventListener(window, 'pointermove', (event: PointerEvent): void => {
        movementX += event.movementX;
        movementY += event.movementY;
      });

      const unsubscribeOfKeyDown = createEventListener(window, 'keydown', (event: KeyboardEvent) => {
        // console.log(event.code);
        keyPressed.add(event.code);
      });

      const unsubscribeOfKeyUp = createEventListener(window, 'keyup', (event: KeyboardEvent) => {
        keyPressed.delete(event.code);
      });

      const update = (): void => {
        mat4_identity(this.#matrix);

        const now: number = Date.now();
        const elapsedTime: number = now - lastUpdateTime;
        lastUpdateTime = now;

        const translationSpeed: number = this.#translationSpeed * elapsedTime;
        const rotationSpeed: number = this.#rotationSpeed * elapsedTime;

        if (keyPressed.has('KeyW')) {
          mat4_translate(this.#matrix, this.#matrix, [0, 0, translationSpeed]);
        }
        if (keyPressed.has('KeyS')) {
          mat4_translate(this.#matrix, this.#matrix, [0, 0, -translationSpeed]);
        }

        if (keyPressed.has('KeyA')) {
          mat4_translate(this.#matrix, this.#matrix, [translationSpeed, 0, 0]);
        }

        if (keyPressed.has('KeyD')) {
          mat4_translate(this.#matrix, this.#matrix, [-translationSpeed, 0, 0]);
        }

        if (document.pointerLockElement !== null) {
          mat4_rotate_x(this.#matrix, this.#matrix, movementY * rotationSpeed);
          mat4_rotate_y(this.#matrix, this.#matrix, movementX * rotationSpeed);
        }

        movementX = 0;
        movementY = 0;

        // mat4.mul(out, view, this.#matrix);
        // mat4.mul(out, this.#matrix, view);
      };

      createAnimationFrameLoop(update);

      this.#stop = mergeUnsubscribeFunctions([
        unsubscribeOfClick,
        unsubscribeOfPointerMove,
        unsubscribeOfKeyDown,
        unsubscribeOfKeyUp,
      ]);
    }
    return this;
  }

  stop(): this {
    if (this.#stop !== void 0) {
      this.#stop();
      this.#stop = void 0;
    }
    return this;
  }
}
