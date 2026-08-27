import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// @ts-ignore - Vite raw GLSL import
import vertexShader from './shaders/vertex.glsl?raw';
// @ts-ignore - Vite raw GLSL import
import fragmentShader from './shaders/fragment.glsl?raw';

export default function LiquidImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 10);
    camera.position.z = 1;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const texture = new THREE.TextureLoader().load(src);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.ShaderMaterial({
      uniforms: { uTexture: { value: texture }, uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(.5, .5) } },
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    const resize = () => renderer.setSize(container.clientWidth, container.clientHeight, false);
    const pointer = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      material.uniforms.uMouse.value.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
    };
    resize(); window.addEventListener('resize', resize); container.addEventListener('pointermove', pointer);
    let frame = 0;
    const render = () => { material.uniforms.uTime.value = clock.getElapsedTime(); renderer.render(scene, camera); frame = requestAnimationFrame(render); };
    render();

    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); container.removeEventListener('pointermove', pointer); texture.dispose(); material.dispose(); mesh.geometry.dispose(); renderer.dispose(); renderer.domElement.remove(); };
  }, [src]);

  return <div ref={containerRef} className={`relative overflow-hidden ${className}`} role="img" aria-label={alt} />;
}
