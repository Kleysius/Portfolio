import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


document.addEventListener('DOMContentLoaded', function () {
    // scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // hero section
    const contactSection = document.querySelector('.contact');
    contactSection.appendChild(renderer.domElement);

    // importing 3D model
    const loader = new GLTFLoader();
    let model;

    loader.load('/scene.gltf', function (gltf) {

        model = gltf.scene;
        scene.add(model);

    }, undefined, function (error) {
        console.error(error);
    });

    // orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    // lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // white color
    const light = new THREE.AmbientLight(0x404040, 1); // soft white light
    scene.add(ambientLight, light);

    const sunlight = new THREE.DirectionalLight(0xffe5c6, 2);
    sunlight.castShadow = true;
    sunlight.position.set(3, 3, 3); // Ajustez ces coordonnées pour positionner la lumière du soleil
    scene.add(sunlight);

    // shadows
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // camera position
    camera.position.set(0, 0, 8);
    controls.update();

    function animate() {
        requestAnimationFrame(animate);


        if (model) {
            model.rotation.y += 0.0005;
            model.rotation.x -= 0.0005;

            controls.update();
            changeColor(renderer);

            renderer.render(scene, camera);

        }
    }

    animate();
});

function changeColor(renderer) {
    if (document.body.classList.contains('dark')) {
        renderer.setClearColor(0x060816);

    } else {
        renderer.setClearColor(0xf1f1f1);
    }
}