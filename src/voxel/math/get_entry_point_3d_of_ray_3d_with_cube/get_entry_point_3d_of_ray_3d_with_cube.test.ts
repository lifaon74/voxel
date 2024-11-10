import { is_invalid_point, vec3, vec3_create } from '@lifaon/math';
import { describe, expect, test } from 'vitest';
import { get_entry_point_3d_of_ray_3d_with_cube } from './get_entry_point_3d_of_ray_3d_with_cube';

describe('get_entry_point_3d_of_ray_3d_with_cube', () => {
  const out = vec3_create();

  const expectToBe = (v: vec3): void => {
    for (let i = 0; i < 3; i++) {
      expect(out[i]).toEqual(v[i]);
    }
  };

  const expectToBeInvalid = (): void => {
    is_invalid_point(out);
  };

  describe('x = y = 0.5', () => {
    const x: number = 0.5;
    const y: number = 0.5;

    describe('inside', () => {
      test('z0 = 0, z1 = 0.5 => starts at the center of the cube and goes outside', () => {
        get_entry_point_3d_of_ray_3d_with_cube(out, [x, y, 0.5], [x, y, 1.5], 1);
        expectToBe([x, y, 0.5]);
      });
    });

    describe('front face', () => {
      describe('hits', () => {
        test('z0 = -0.5, z1 = 1.5 => crosses the cube', () => {
          get_entry_point_3d_of_ray_3d_with_cube(out, [x, y, -0.5], [x, y, 1.5], 1);
          expectToBe([x, y, 0]);
        });

        test('z0 = -0.5, z1 = 0.5 => ends at the center of the cube', () => {
          get_entry_point_3d_of_ray_3d_with_cube(out, [x, y, -0.5], [x, y, 0.5], 1);
          expectToBe([x, y, 0]);
        });

        test('z0 = 0, z1 = 0.5 => starts on the face, and goes inside', () => {
          get_entry_point_3d_of_ray_3d_with_cube(out, [x, y, 0], [x, y, 0.5], 1);
          expectToBe([x, y, 0]);
        });
      });

      describe('misses', () => {
        test('z0 = -0.5, z1 = -0.1 => ends before the cube', () => {
          get_entry_point_3d_of_ray_3d_with_cube(out, [x, y, -0.5], [x, y, -0.1], 1);
          expectToBeInvalid();
        });

        test('z0 = -0.5, z1 = 0 => ends on the face', () => {
          get_entry_point_3d_of_ray_3d_with_cube(out, [x, y, -0.5], [x, y, 0], 1);
          expectToBeInvalid();
        });

        test('z0 = -0.5, z1 = -1 => goes in opposite direction', () => {
          get_entry_point_3d_of_ray_3d_with_cube(out, [x, y, -0.5], [x, y, -1], 1);
          expectToBeInvalid();
        });

        test('z0 = 0, z1 = -0.5 => starts on the face, and goes outside', () => {
          get_entry_point_3d_of_ray_3d_with_cube(out, [x, y, 0], [x, y, -0.5], 1);
          expectToBeInvalid();
        });

        test('z0 = -0.5, z1 = 0.5 => on the edge', () => {
          get_entry_point_3d_of_ray_3d_with_cube(out, [x, y, -0.5], [x + 1, y, 0.5], 1);
          expectToBeInvalid();
        });

        test('z0 = -0.5, z1 = 0.5 => on the corner', () => {
          get_entry_point_3d_of_ray_3d_with_cube(out, [x, y, -0.5], [x + 1, y + 1, 0.5], 1);
          expectToBeInvalid();
        });
      });
    });

    describe('back face', () => {
      describe('hits', () => {
        test('z0 = 1.5, z1 = -0.5 => crosses the cube', () => {
          get_entry_point_3d_of_ray_3d_with_cube(out, [x, y, 1.5], [x, y, -0.5], 1);
          expectToBe([x, y, 1]);
        });

        test('z0 = 1.5, z1 = 0.5 => ends at the center of the cube', () => {
          get_entry_point_3d_of_ray_3d_with_cube(out, [x, y, 1.5], [x, y, 0.5], 1);
          expectToBe([x, y, 1]);
        });
      });
    });
  });

  describe('bottom x edge', () => {
    const x: number = 0.5;

    describe('hits', () => {
      test('goes inside', () => {
        get_entry_point_3d_of_ray_3d_with_cube(out, [x, -0.5, -0.5], [x, 0.5, 0.5], 1);
        expectToBe([x, 0, 0]);
      });
    });

    describe('misses', () => {
      test('is parallel', () => {
        get_entry_point_3d_of_ray_3d_with_cube(out, [x, 0, -0.5], [x, 0, 0.5], 1);
        expectToBeInvalid();
      });

      test('just touch the edge', () => {
        get_entry_point_3d_of_ray_3d_with_cube(out, [x, -0.5, -0.5], [x, 0.5, 0.5], 1);
        expectToBeInvalid();
      });
    });
  });

  describe('origin corner', () => {
    describe('hits', () => {
      test('goes inside', () => {
        get_entry_point_3d_of_ray_3d_with_cube(out, [-0.5, -0.5, -0.5], [0.5, 0.5, 0.5], 1);
        expectToBe([0, 0, 0]);
      });
    });

    describe('misses', () => {
      test('is parallel', () => {
        get_entry_point_3d_of_ray_3d_with_cube(out, [0, 0, -0.5], [0, 0, 0.5], 1);
        expectToBeInvalid();
      });

      test('just touch the corner', () => {
        get_entry_point_3d_of_ray_3d_with_cube(out, [0.5, -0.5, -0.5], [-0.5, 0.5, 0.5], 1);
        expectToBeInvalid();
      });
    });
  });
});
