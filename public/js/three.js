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
    const heroSection = document.querySelector('.hero');
    heroSection.appendChild(renderer.domElement);

    // importing 3D model

    const loader = new GLTFLoader();
    let model;

    loader.load('/scene.gltf', function (gltf) {

        model = gltf.scene;
        scene.add(gltf.scene);

    }, undefined, function (error) {

        console.error(error);

    });

    // orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    // lights
    const ambientLight = new THREE.AmbientLight(0xffffff); // white color
    const light = new THREE.AmbientLight(0x404040); // soft white light

    scene.add(ambientLight, light);

    // camera position
    camera.position.set(0, 1, 2);
    controls.update();
    console.log(model);
    function animate() {
        requestAnimationFrame(animate);

        if (model) {

            model.rotation.x -= 0.001;
            model.rotation.y -= 0.001;

            controls.update();

            renderer.render(scene, camera);

        }
    }

    animate();
});


