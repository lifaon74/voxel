import { is_invalid_point, vec3, vec3_create } from '@lifaon/math';
import { describe, expect, test } from 'vitest';
import { get_entry_point_3d_of_ray_3d_with_cube } from './get_entry_point_3d_of_ray_3d_with_cube';

describe('get_entry_point_3d_of_ray_3d_with_cube', () => {
  const rayHitPoint = vec3_create();
  const normalVector = vec3_create();

  const expectRayHitPointToBe = (v: vec3): void => {
    for (let i = 0; i < 3; i++) {
      expect(rayHitPoint[i]).toEqual(v[i]);
    }
  };

  const expectNormalVectorToBe = (v: vec3): void => {
    for (let i = 0; i < 3; i++) {
      expect(normalVector[i]).toEqual(v[i]);
    }
  };

  describe('x = y = 0.5', () => {
    const x: number = 0.5;
    const y: number = 0.5;

    describe('inside', () => {
      test('z0 = 0, z1 = 0.5 => starts at the center of the cube and goes outside', () => {
        expect(
          get_entry_point_3d_of_ray_3d_with_cube(
            [x, y, 0.5],
            [x, y, 1.5],
            1,
            rayHitPoint,
            normalVector,
          ),
        ).toBe(true);
        expectRayHitPointToBe([x, y, 0.5]);
      });
    });

    describe('front face', () => {
      describe('hits', () => {
        test('z0 = -0.5, z1 = 1.5 => crosses the cube', () => {
          expect(
            get_entry_point_3d_of_ray_3d_with_cube(
              [x, y, -0.5],
              [x, y, 1.5],
              1,
              rayHitPoint,
              normalVector,
            ),
          ).toBe(true);
          expectRayHitPointToBe([x, y, 0]);
        });

        test('z0 = -0.5, z1 = 0.5 => ends at the center of the cube', () => {
          expect(
            get_entry_point_3d_of_ray_3d_with_cube(
              [x, y, -0.5],
              [x, y, 0.5],
              1,
              rayHitPoint,
              normalVector,
            ),
          ).toBe(true);
          expectRayHitPointToBe([x, y, 0]);
        });

        test('z0 = 0, z1 = 0.5 => starts on the face, and goes inside', () => {
          expect(
            get_entry_point_3d_of_ray_3d_with_cube(
              [x, y, 0],
              [x, y, 0.5],
              1,
              rayHitPoint,
              normalVector,
            ),
          ).toBe(true);
          expectRayHitPointToBe([x, y, 0]);
        });
      });

      describe('misses', () => {
        test('z0 = -0.5, z1 = -0.1 => ends before the cube', () => {
          expect(
            get_entry_point_3d_of_ray_3d_with_cube(
              [x, y, -0.5],
              [x, y, -0.1],
              1,
              rayHitPoint,
              normalVector,
            ),
          ).toBe(false);
        });

        test('z0 = -0.5, z1 = 0 => ends on the face', () => {
          expect(
            get_entry_point_3d_of_ray_3d_with_cube(
              [x, y, -0.5],
              [x, y, 0],
              1,
              rayHitPoint,
              normalVector,
            ),
          ).toBe(false);
        });

        test('z0 = -0.5, z1 = -1 => goes in opposite direction', () => {
          expect(
            get_entry_point_3d_of_ray_3d_with_cube(
              [x, y, -0.5],
              [x, y, -1],
              1,
              rayHitPoint,
              normalVector,
            ),
          ).toBe(false);
        });

        test('z0 = 0, z1 = -0.5 => starts on the face, and goes outside', () => {
          expect(
            get_entry_point_3d_of_ray_3d_with_cube(
              [x, y, 0],
              [x, y, -0.5],
              1,
              rayHitPoint,
              normalVector,
            ),
          ).toBe(false);
        });

        test('z0 = -0.5, z1 = 0.5 => on the edge', () => {
          expect(
            get_entry_point_3d_of_ray_3d_with_cube(
              [x, y, -0.5],
              [x + 1, y, 0.5],
              1,
              rayHitPoint,
              normalVector,
            ),
          ).toBe(false);
        });

        test('z0 = -0.5, z1 = 0.5 => on the corner', () => {
          expect(
            get_entry_point_3d_of_ray_3d_with_cube(
              [x, y, -0.5],
              [x + 1, y + 1, 0.5],
              1,
              rayHitPoint,
              normalVector,
            ),
          ).toBe(false);
        });
      });
    });

    describe('back face', () => {
      describe('hits', () => {
        test('z0 = 1.5, z1 = -0.5 => crosses the cube', () => {
          expect(
            get_entry_point_3d_of_ray_3d_with_cube(
              [x, y, 1.5],
              [x, y, -0.5],
              1,
              rayHitPoint,
              normalVector,
            ),
          ).toBe(true);
          expectRayHitPointToBe([x, y, 1]);
        });

        test('z0 = 1.5, z1 = 0.5 => ends at the center of the cube', () => {
          expect(
            get_entry_point_3d_of_ray_3d_with_cube(
              [x, y, 1.5],
              [x, y, 0.5],
              1,
              rayHitPoint,
              normalVector,
            ),
          ).toBe(true);
          expectRayHitPointToBe([x, y, 1]);
        });
      });
    });
  });

  describe('bottom x edge', () => {
    const x: number = 0.5;

    describe('hits', () => {
      test('goes inside', () => {
        expect(
          get_entry_point_3d_of_ray_3d_with_cube(
            [x, -0.5, -0.5],
            [x, 0.5, 0.5],
            1,
            rayHitPoint,
            normalVector,
          ),
        ).toBe(true);
        expectRayHitPointToBe([x, 0, 0]);
      });
    });

    describe('misses', () => {
      test('is parallel', () => {
        expect(
          get_entry_point_3d_of_ray_3d_with_cube(
            [x, 0, -0.5],
            [x, 0, 0.5],
            1,
            rayHitPoint,
            normalVector,
          ),
        ).toBe(false);
      });

      test('just touch the edge', () => {
        expect(
          get_entry_point_3d_of_ray_3d_with_cube(
            [x, 0.5, -0.5],
            [x, -0.5, 0.5],
            1,
            rayHitPoint,
            normalVector,
          ),
        ).toBe(false);
      });
    });
  });

  describe('origin corner', () => {
    describe('hits', () => {
      test('goes inside', () => {
        expect(
          get_entry_point_3d_of_ray_3d_with_cube(
            [-0.5, -0.5, -0.5],
            [0.5, 0.5, 0.5],
            1,
            rayHitPoint,
            normalVector,
          ),
        ).toBe(true);
        expectRayHitPointToBe([0, 0, 0]);
      });
    });

    describe('misses', () => {
      test('is parallel', () => {
        expect(
          get_entry_point_3d_of_ray_3d_with_cube(
            [0, 0, -0.5],
            [0, 0, 0.5],
            1,
            rayHitPoint,
            normalVector,
          ),
        ).toBe(false);
      });

      test('just touch the corner', () => {
        expect(
          get_entry_point_3d_of_ray_3d_with_cube(
            [0.5, -0.5, -0.5],
            [-0.5, 0.5, 0.5],
            1,
            rayHitPoint,
            normalVector,
          ),
        ).toBe(false);
      });
    });
  });
});
