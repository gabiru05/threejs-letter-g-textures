import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";
// FontLoader y TextGeometry ya no son necesarios para este método de letra

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the loader
const textureLoader = new THREE.TextureLoader();

// initialize the geometry for spheres
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const uv2SphereGeometry = new THREE.BufferAttribute(sphereGeometry.attributes.uv.array, 2);
sphereGeometry.setAttribute('uv2', uv2SphereGeometry);

// load the grass textures
const grassAlbedo = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png');
const grassAo = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png');
const grassHeight = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_height.png');
const grassMetallic = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png');
const grassNormal = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png');
const grassRoughness = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png');

// load the boulder textures
const boulderAlbedo = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_albedo.png');
const boulderAo = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_ao.png');
const boulderHeight = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_height.png');
const boulderMetallic = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_metallic.png');
const boulderNormal = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_normal-ogl.png');
const boulderRoughness = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_roughness.png');

// load the space cruiser textures
const spaceCruiserAlbedo = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png');
const spaceCruiserAo = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_ao.png');
const spaceCruiserHeight = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_height.png');
const spaceCruiserMetallic = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_metallic.png');
const spaceCruiserNormal = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_normal-ogl.png');
const spaceCruiserRoughness = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_roughness.png');

// grass material
const grassPane = pane.addFolder({ title: 'Grass Material', expanded: true });
const grassMaterial = new THREE.MeshStandardMaterial();
grassMaterial.map = grassAlbedo;
grassMaterial.roughnessMap = grassRoughness;
grassMaterial.metalnessMap = grassMetallic;
grassMaterial.normalMap = grassNormal;
grassMaterial.displacementMap = grassHeight;
grassMaterial.displacementScale = 0.1;
grassMaterial.aoMap = grassAo;
grassPane.addInput(grassMaterial, 'metalness', { min: 0, max: 1, step: 0.01 });
grassPane.addInput(grassMaterial, 'roughness', { min: 0, max: 1, step: 0.01 });
grassPane.addInput(grassMaterial, 'displacementScale', { min: 0, max: 1, step: 0.01 });
grassPane.addInput(grassMaterial, 'aoMapIntensity', { min: 0, max: 1, step: 0.01 });

// boulder material
const boulderPane = pane.addFolder({ title: 'Boulder Material', expanded: true });
const boulderMaterial = new THREE.MeshStandardMaterial();
boulderMaterial.map = boulderAlbedo;
boulderMaterial.roughnessMap = boulderRoughness;
boulderMaterial.metalnessMap = boulderMetallic;
boulderMaterial.normalMap = boulderNormal;
boulderMaterial.displacementMap = boulderHeight;
boulderMaterial.displacementScale = 0.1;
boulderMaterial.aoMap = boulderAo;
boulderPane.addInput(boulderMaterial, 'metalness', { min: 0, max: 1, step: 0.01 });
boulderPane.addInput(boulderMaterial, 'roughness', { min: 0, max: 1, step: 0.01 });
boulderPane.addInput(boulderMaterial, 'displacementScale', { min: 0, max: 1, step: 0.01 });
boulderPane.addInput(boulderMaterial, 'aoMapIntensity', { min: 0, max: 1, step: 0.01 });

// space cruiser material
const spaceCruiserPane = pane.addFolder({ title: 'Space Cruiser Material', expanded: true });
const spaceCruiserMaterial = new THREE.MeshStandardMaterial();
spaceCruiserMaterial.map = spaceCruiserAlbedo;
spaceCruiserMaterial.roughnessMap = spaceCruiserRoughness;
spaceCruiserMaterial.metalnessMap = spaceCruiserMetallic;
spaceCruiserMaterial.normalMap = spaceCruiserNormal;
spaceCruiserMaterial.displacementMap = spaceCruiserHeight;
spaceCruiserMaterial.displacementScale = 0.1;
spaceCruiserMaterial.aoMap = spaceCruiserAo;
spaceCruiserPane.addInput(spaceCruiserMaterial, 'metalness', { min: 0, max: 1, step: 0.01 });
spaceCruiserPane.addInput(spaceCruiserMaterial, 'roughness', { min: 0, max: 1, step: 0.01 });
spaceCruiserPane.addInput(spaceCruiserMaterial, 'displacementScale', { min: 0, max: 1, step: 0.01 });
spaceCruiserPane.addInput(spaceCruiserMaterial, 'aoMapIntensity', { min: 0, max: 1, step: 0.01 });

// initialize a group for spheres
const group = new THREE.Group();

// initialize the sphere meshes
const grass = new THREE.Mesh(sphereGeometry, grassMaterial);

const boulder = new THREE.Mesh(sphereGeometry, boulderMaterial);
boulder.position.x = 2.5;

const spaceCruiser = new THREE.Mesh(sphereGeometry, spaceCruiserMaterial);
spaceCruiser.position.x = -2.5;

// add the sphere meshes to the group
group.add(grass, boulder, spaceCruiser);
scene.add(group);



const letterGMatrix = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1]
];

const cubeSize = 0.25;
const numRows = letterGMatrix.length;
const numCols = letterGMatrix[0].length;

const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);


// Copiar atributos uv a uv2 para soportar aoMap y displacementMap
cubeGeometry.setAttribute('uv2', new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2));

const letterCubeMaterial = boulderMaterial;

const letterGGroup = new THREE.Group();

const totalWidth = numCols * cubeSize;
const totalHeight = numRows * cubeSize;
const offsetX = -totalWidth / 2 + cubeSize / 2;
const offsetY = totalHeight / 2 - cubeSize / 2;

for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
        if (letterGMatrix[row][col] === 1) {
            const cube = new THREE.Mesh(cubeGeometry, letterCubeMaterial);
            cube.position.set(
                offsetX + col * cubeSize,
                offsetY - row * cubeSize,
                0
            );
            letterGGroup.add(cube);
        }
    }
}

letterGGroup.position.set(0, 0, 2.5);
scene.add(letterGGroup);
console.log("Letra 'G' creada con cubos y añadida a la escena.");



// initialize the light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Aumenté un poco la intensidad de la luz ambiental
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.0); // Ajusté intensidad de la luz puntual
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);
camera.position.set(0, 2, 12); // Ajusté la posición de la cámara para mejor visualización inicial

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true; // Descomenta para rotación automática

// handle resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// render the scene
const renderloop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop);
};

renderloop();