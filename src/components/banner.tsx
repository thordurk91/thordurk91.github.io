'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader, Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

interface ParticleData {
  text: string;
  amount: number;
  particleSize: number;
  particleColor: number;
  textSize: number;
  area: number;
  ease: number;
}

const vertexShader = `
    attribute float size;
    attribute vec3 customColor;
    varying vec3 vColor;

    void main() {
        vColor = customColor;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = size * ( 300.0 / -mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const fragmentShader = `
    uniform vec3 color;
    uniform sampler2D pointTexture;
    varying vec3 vColor;

    void main() {
        gl_FragColor = vec4( color * vColor, 1.0 );
        gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
    }
`;

class Environment {
  private font: Font;
  private particle: THREE.Texture;
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private createParticles: CreateParticles;

  constructor(font: THREE.Font, particle: THREE.Texture) {
    this.font = font;
    this.particle = particle;
    this.container = document.querySelector('#magic') as HTMLElement;
    this.scene = new THREE.Scene();
    this.createCamera();
    this.createRenderer();
    this.setup();
    this.bindEvents();
  }
  public dispose(): void {
    // Cleanup renderer
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.domElement.remove();
    }

    // Cleanup scene
    if (this.scene) {
      this.scene.clear();
    }

    // Remove event listeners
    window.removeEventListener('resize', this.onWindowResize.bind(this));
  }
  private bindEvents(): void {
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private setup(): void {
    this.createParticles = new CreateParticles(
      this.scene,
      this.font,
      this.particle,
      this.camera,
      this.renderer
    );
  }

  private render(): void {
    this.createParticles.render();
    this.renderer.render(this.scene, this.camera);
  }

  private createCamera(): void {
    this.camera = new THREE.PerspectiveCamera(
      65,
      this.container.clientWidth / this.container.clientHeight,
      1,
      10000
    );

    let campos = 25;
    let camzoom = 100;

    if (this.container.clientWidth < 601) {
      campos = 35;
      camzoom = 270;
    } else if (this.container.clientWidth < 900) {
      campos = 35;
      camzoom = 200;
    } else if (this.container.clientWidth < 1140) {
      campos = 35;
      camzoom = 150;
    }

    this.camera.position.set(0, campos, camzoom);
  }

  private createRenderer(): void {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);
    this.renderer.setAnimationLoop(() => this.render());
  }

  private onWindowResize(): void {
    let campos = 25;
    let camzoom = 100;

    if (this.container.clientWidth < 601) {
      campos = 35;
      camzoom = 270;
    } else if (this.container.clientWidth < 900) {
      campos = 35;
      camzoom = 200;
    } else if (this.container.clientWidth < 1140) {
      campos = 35;
      camzoom = 150;
    }

    this.camera.position.set(0, campos, camzoom);
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }
}

class CreateParticles {
  private scene: THREE.Scene;
  private font: Font;
  private particleImg: THREE.Texture;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private colorChange: THREE.Color;
  private buttom: boolean;
  private data: ParticleData;
  private particles: THREE.Points;
  private geometryCopy: THREE.BufferGeometry;
  private planeArea: THREE.Mesh;

  constructor(
    scene: THREE.Scene,
    font: Font,
    particleImg: THREE.Texture,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer
  ) {
    this.scene = scene;
    this.font = font;
    this.particleImg = particleImg;
    this.camera = camera;
    this.renderer = renderer;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-200, 200);
    this.colorChange = new THREE.Color();
    this.buttom = false;
    this.data = {
      text: 'Hello World',
      amount: 1000,
      particleSize: 1,
      particleColor: 0x000000,
      textSize: 30,
      area: 30,
      ease: 0.05,
    };

    this.setup();
    this.bindEvents();
  }

  private setup(): void {
    const geometry = new THREE.PlaneGeometry(
      this.visibleWidthAtZDepth(100, this.camera),
      this.visibleHeightAtZDepth(100, this.camera)
    );
    const material = new THREE.MeshBasicMaterial({
      color: 0x001100,
      transparent: true,
    });
    this.planeArea = new THREE.Mesh(geometry, material);
    this.planeArea.visible = false;
    this.createText();
  }

  private bindEvents(): void {
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  private onMouseDown(): void {
    this.buttom = false;
    this.data.ease = 0.05;
  }

  private onMouseUp(): void {
    this.buttom = false;
    this.data.ease = 0.05;
  }

  private onMouseMove(event: MouseEvent): void {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  public render(): void {
    const time = (0.001 * performance.now() % 12) / 12;
    const zigzagTime = (1 + Math.sin(time * 2 * Math.PI)) / 6;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.planeArea);

    if (intersects.length > 0) {
      const pos = this.particles.geometry.attributes.position;
      const copy = this.geometryCopy.attributes.position;
      const colors = this.particles.geometry.attributes.customColor;
      const size = this.particles.geometry.attributes.size;

      const mx = intersects[0].point.x;
      const my = intersects[0].point.y;

      for (let i = 0; i < pos.count; i++) {
        const initX = copy.getX(i);
        const initY = copy.getY(i);
        const initZ = copy.getZ(i);

        let px = pos.getX(i);
        let py = pos.getY(i);
        let pz = pos.getZ(i);

        this.colorChange.setHSL(0.5, 0.5, 1);
        colors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
        colors.needsUpdate = true;

        size.array[i] = this.data.particleSize;
        size.needsUpdate = true;

        let dx = mx - px;
        let dy = my - py;

        const mouseDistance = this.distance(mx, my, px, py);
        const d = (dx = mx - px) * dx + (dy = my - py) * dy;
        const f = -this.data.area / d;

        if (this.buttom) {
          const t = Math.atan2(dy, dx);
          this.colorChange.setHSL(0.5 + zigzagTime, 0.5, 0.5);
          colors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
          colors.needsUpdate = true;

          if (
            px > initX + 70 ||
            px < initX - 70 ||
            py > initY + 70 ||
            py < initY - 70
          ) {
            this.colorChange.setHSL(0.15, 0.5, 0.5);
            colors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
            colors.needsUpdate = true;
          }
        } else {
          if (mouseDistance < this.data.area) {
            if (i % 5 == 0) {
              const t = Math.atan2(dy, dx);
              px -= 0.03 * Math.cos(t);
              py -= 0.03 * Math.sin(t);

              this.colorChange.setHSL(0.15, 0.5, 0.5);
              colors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
              colors.needsUpdate = true;

              size.array[i] = this.data.particleSize / 1.2;
              size.needsUpdate = true;
            } else {
              const t = Math.atan2(dy, dx);
              px += f * Math.cos(t);
              py += f * Math.sin(t);

              pos.setXYZ(i, px, py, pz);
              pos.needsUpdate = true;

              size.array[i] = this.data.particleSize * 1.3;
              size.needsUpdate = true;
            }

            if (
              px > initX + 10 ||
              px < initX - 10 ||
              py > initY + 10 ||
              py < initY - 10
            ) {
              this.colorChange.setHSL(0.15, 0.5, 0.5);
              colors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
              colors.needsUpdate = true;

              size.array[i] = this.data.particleSize / 1.8;
              size.needsUpdate = true;
            }
          }
        }

        px += (initX - px) * this.data.ease;
        py += (initY - py) * this.data.ease;
        pz += (initZ - pz) * this.data.ease;

        pos.setXYZ(i, px, py, pz);
        pos.needsUpdate = true;
      }
    }
  }

  private createText(): void {
    const shapes = this.font.generateShapes(this.data.text, this.data.textSize);
    const geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();

    const xMid = -0.5 * (geometry.boundingBox!.max.x - geometry.boundingBox!.min.x);
    const yMid = (geometry.boundingBox!.max.y - geometry.boundingBox!.min.y) / 2.85;

    geometry.center();

    // Create an array that can hold both Shapes and Paths
    const allShapes: (THREE.Shape | THREE.Path)[] = [...shapes];

    // Handle holes separately
    shapes.forEach((shape) => {
      if (shape.holes && shape.holes.length > 0) {
        shape.holes.forEach((hole) => {
          // Create points for the hole paths
          const path = new THREE.Path().setFromPoints(hole.getPoints());
          allShapes.push(path);
        });
      }
    });

    const colors: number[] = [];
    const sizes: number[] = [];
    const thePoints: THREE.Vector3[] = [];

    allShapes.forEach((shape) => {
      // Both Shape and Path have getSpacedPoints method
      const amountPoints = shape instanceof THREE.Path ? this.data.amount / 2 : this.data.amount;
      const points = shape.getSpacedPoints(amountPoints);

      points.forEach((element) => {
        const vector = new THREE.Vector3(element.x, element.y, 0);
        thePoints.push(vector);
        colors.push(this.colorChange.r, this.colorChange.g, this.colorChange.b);
        sizes.push(1);
      });
    });

    const geoParticles = new THREE.BufferGeometry().setFromPoints(thePoints);
    geoParticles.translate(xMid, yMid, 0);

    geoParticles.setAttribute(
      'customColor',
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geoParticles.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x00ff00) },
        pointTexture: { value: this.particleImg },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    this.particles = new THREE.Points(geoParticles, material);
    this.scene.add(this.particles);

    this.geometryCopy = new THREE.BufferGeometry();
    this.geometryCopy.copy(this.particles.geometry);
  }

  private visibleHeightAtZDepth(depth: number, camera: THREE.PerspectiveCamera): number {
    const cameraOffset = camera.position.z;
    if (depth < cameraOffset) depth -= cameraOffset;
    else depth += cameraOffset;

    const vFOV = camera.fov * Math.PI / 180;
    return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
  }

  private visibleWidthAtZDepth(depth: number, camera: THREE.PerspectiveCamera): number {
    const height = this.visibleHeightAtZDepth(depth, camera);
    return height * camera.aspect;
  }

  private distance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
}

interface BannerProps {
  className?: string;
}

const Banner: React.FC<BannerProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const environmentRef = useRef<Environment | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;

    const manager = new THREE.LoadingManager();
    manager.onLoad = () => {
      if (typo && particle) {
        environmentRef.current = new Environment(typo, particle);
      }
    };

    let typo: Font | null = null;
    let particle: THREE.Texture | null = null;

    const fontLoader = new FontLoader(manager);
    fontLoader.load('/Rubik Wet Paint Regular.json', (font) => {
      typo = font;
    });

    const textureLoader = new THREE.TextureLoader(manager);
    textureLoader.load('/particle_a64uzf.png', (texture) => {
      particle = texture;
    });

    // Cleanup
    return () => {
      if (environmentRef.current) {
        environmentRef.current.dispose();
        environmentRef.current = undefined;
      }
    };
  }, []);

  return (
    <div 
      id="magic" 
      ref={containerRef}
      className={`fixed h-screen w-screen ${className || ''}`}
      style={{zIndex: -1}}
    >
      <div className="playground">
        <div className="bottomPosition" />
      </div>
    </div>
  );
};

export default Banner;