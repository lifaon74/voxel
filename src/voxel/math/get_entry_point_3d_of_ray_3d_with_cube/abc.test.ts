import { describe, expect, test } from 'vitest';

export function get_intersection_point_x_of_line_2d_described_by_a_vector_and_its_origin_with_the_x_axis(
  // vector origin
  p_x: number,
  p_y: number,
  // vector
  v_x: number,
  v_y: number,
): number {
  // assumes v_y !== 0
  return p_x - (p_y * v_x) / v_y;
}

describe('get_intersection_point_x_of_line_2d_described_by_a_vector_and_its_origin_with_the_x_axis', () => {
  test('a', () => {
    expect(
      get_intersection_point_x_of_line_2d_described_by_a_vector_and_its_origin_with_the_x_axis(
        0,
        -1,
        1,
        1,
      ),
    ).toBe(1);
    expect(
      get_intersection_point_x_of_line_2d_described_by_a_vector_and_its_origin_with_the_x_axis(
        0,
        1,
        1,
        -1,
      ),
    ).toBe(1);
    // expect(abc(-1, -2, 2, 2)).toBe(1);
  });
});
