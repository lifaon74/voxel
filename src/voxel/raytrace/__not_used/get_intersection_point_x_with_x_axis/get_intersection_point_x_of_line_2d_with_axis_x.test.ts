import { describe, expect, test } from 'vitest';
import { get_intersection_point_x_of_line_2d_with_axis_x } from './get_intersection_point_x_of_line_2d_with_axis_x';
import { is_line_2d_intersecting_with_axis_x } from './is_line_2d_intersecting_with_axis_x';

describe('get_intersection_point_x_of_line_2d_with_axis_x', () => {
  test('is_line_2d_intersecting_with_axis_x', () => {
    expect(is_line_2d_intersecting_with_axis_x(0, -1, 1, 1)).toBe(true);
    expect(is_line_2d_intersecting_with_axis_x(0, -1, 1, 0)).toBe(false);
  });

  test('get_intersection_point_x_of_line_2d_with_axis_x', () => {
    expect(get_intersection_point_x_of_line_2d_with_axis_x(0, -1, 1, 1)).toBe(1);
    expect(get_intersection_point_x_of_line_2d_with_axis_x(0, -1, -1, -1)).toBe(1);
    expect(get_intersection_point_x_of_line_2d_with_axis_x(0, 1, 1, -1)).toBe(1);
    // expect(abc(-1, -2, 2, 2)).toBe(1);
  });
});
