//@group(0) @binding(0) var<storage, read_write> data: array<f32>;
//
//@compute @workgroup_size(1) fn computeSomething(
//  @builtin(global_invocation_id) id: vec3u
//) {
//  let i = id.x;
//  data[i] = data[i] * 2.0;
//}


//fn read_u8(buffer: ptr<storage, array<u32>>, index: u32) -> u32{
//	var ipos: u32 = index / 4u;
//	var value_u32: u32 = buffer[ipos];
//	var shift: u32 = 8u * (index % 4u);
//	var val_u8: u32 = (value_u32 >> shift) & 0xFFu;
//
//	return val_u8;
//}

fn read_u8(buffer: ptr<storage, array<u32>>, index: u32) -> u32{
	return (buffer[index / 4u] >> (8u * (index % 4u))) & 0xFFu;
}


@group(0) @binding(0) var tex: texture_storage_2d<bgra8unorm, write>;
@group(0) @binding(1) var<storage, read> mem: array<u32>;

@compute @workgroup_size(1) fn cs(
  @builtin(global_invocation_id) id: vec3u
) {
  let color = vec4f(fract(vec2f(id.xy) / 64.0), 0, 1);
  textureStore(tex, id.xy, color);
}
