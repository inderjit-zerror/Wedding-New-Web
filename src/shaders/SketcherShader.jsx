export const VERTEX =`
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

export const FRAGMENT =`
precision mediump float;

uniform sampler2D uTexture;
uniform sampler2D uTexture2;

uniform vec2 uPlaneResolution;
uniform vec2 uImageResolution;

uniform vec2 uMouse;
uniform float uRadius;
uniform float uTime;

varying vec2 vUv;


// ----------------------------
// object-fit cover
// ----------------------------
vec2 getCoverUV(vec2 uv, vec2 plane, vec2 image) {

    float planeRatio = plane.x / plane.y;
    float imageRatio = image.x / image.y;

    vec2 newUV = uv;

    if (planeRatio > imageRatio) {
        float scale = imageRatio / planeRatio;
        newUV.y = uv.y * scale + (1.0 - scale) * 0.5;
    } else {
        float scale = planeRatio / imageRatio;
        newUV.x = uv.x * scale + (1.0 - scale) * 0.5;
    }

    return newUV;
}


// ----------------------------
// Classic random
// ----------------------------
float random(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// ----------------------------
// Smooth noise
// ----------------------------
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
           (c - a) * u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
}


// ----------------------------
// 🔥 FBM (Layered noise)
// ----------------------------
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 10.5;

    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }

    return value;
}


// ----------------------------
// MAIN
// ----------------------------
void main() {

    vec2 coverUV = getCoverUV(vUv, uPlaneResolution, uImageResolution);

    vec4 topImage = texture2D(uTexture, coverUV);
    vec4 bgImage  = texture2D(uTexture2, coverUV);

    // aspect correction
    float aspect = uPlaneResolution.x / uPlaneResolution.y;

    vec2 correctedUV = vUv;
    vec2 correctedMouse = uMouse;

    correctedUV.x *= aspect;
    correctedMouse.x *= aspect;

    float dist = distance(correctedUV, correctedMouse);

    // ----------------------------------
    // 🌊 FBM DISTORTION
    // ----------------------------------

    float n = fbm(correctedUV * 6.0 + uTime * 0.4);

    // float distortedRadius = uRadius + (n - 0.5) * 0.07;
    float distortedRadius = uRadius + (n - 0.5) * 0.07 * uRadius;

    float circle = smoothstep(
        distortedRadius,
        distortedRadius - 0.035,
        dist
    );

    vec4 finalColor = mix(bgImage, topImage, circle);

    gl_FragColor = finalColor;
}`;