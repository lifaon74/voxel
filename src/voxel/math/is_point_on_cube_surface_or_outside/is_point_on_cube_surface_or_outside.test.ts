import { describe, expect, test } from 'vitest';
import { is_point_on_cube_surface_or_outside } from './is_point_on_cube_surface_or_outside';

describe('is_point_on_cube_surface_or_outside', () => {
  describe('inside', () => {
    test('point in the center', () => {
      expect(is_point_on_cube_surface_or_outside([0.5, 0.5, 0.5], 1));
    });

    test('point on the front surface', () => {
      expect(is_point_on_cube_surface_or_outside([0.5, 0.5, 0], 1));
    });

    test('point on the bottom x edge', () => {
      expect(is_point_on_cube_surface_or_outside([0.5, 0, 0], 1));
    });

    test('point on the origin', () => {
      expect(is_point_on_cube_surface_or_outside([0, 0, 0], 1));
    });
  });
});
