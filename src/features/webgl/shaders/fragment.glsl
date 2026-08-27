uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

void main() {
  vec2 uv = vUv;
  float n = noise(uv * 4.0 + uTime * .18);
  float wave = sin(uv.y * 18.0 + uTime * 1.8) * .008;
  vec2 delta = uv - uMouse;
  float radius = max(0.0001, length(delta));
  float force = smoothstep(.55, 0.0, radius) * .07;
  uv.x += sin(uv.y * 8.0 + uTime + n * 3.0) * .012 + wave + delta.x * force;
  uv.y += cos(uv.x * 10.0 + uTime * .8) * .008 + delta.y * force;
  vec4 color = texture2D(uTexture, uv);
  float vignette = smoothstep(1.1, .15, length(vUv - .5));
  gl_FragColor = vec4(color.rgb * (0.85 + vignette * .15), color.a);
}
