/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { Sun } from "./cbodies/sun.js";
import { Mercury } from "./cbodies/mercury.js";
import { Venus } from "./cbodies/venus.js";
import { Earth } from "./cbodies/earth.js";
import { Mars } from "./cbodies/mars.js";
import { Jupiter } from "./cbodies/jupiter.js";
import { Saturn } from "./cbodies/saturn.js";
import { Uranus } from "./cbodies/uranus.js";
import { Neptune } from "./cbodies/nepture.js";
import { WorldUI } from "../../P2-aaditp/libs/CS559-Framework/WorldUI.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";

// make the world
let world = new GrWorld({
    width: 800,
    height: 800,
    groundplane: false,
});

function addStarField(world) {
    const starsGeometry = new T.BufferGeometry();
    const starsMaterial = new T.PointsMaterial({
        color: 0xffffff,
        size: 1,
        sizeAttenuation: false  // Ensures that stars have a constant size regardless of distance
    });

    const starVertices = [];
    for (let i = 0; i < 1000; i++) {  // Creates 10,000 stars
        const x =  T.MathUtils.randFloatSpread(2000); // Spread them around randomly within a 2000 unit cube
        const y =  T.MathUtils.randFloatSpread(2000);
        const z = T.MathUtils.randFloatSpread(2000);
        starVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new T.Float32BufferAttribute(starVertices, 3));
    const stars = new T.Points(starsGeometry, starsMaterial);

    world.scene.add(stars);
}
addStarField(world);

function addOrbitalLines(world, radii, color = 0xFFFFFF) {
    const lineMaterial = new T.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.5
    });

    radii.forEach(radius => {
        const points = [];
        const segments = 100;  // Increase for smoother lines
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * 2 * Math.PI;
            points.push(new T.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
        }

        const lineGeometry = new T.BufferGeometry().setFromPoints(points);
        const orbitLine = new T.Line(lineGeometry, lineMaterial);
        // Correct rotation to lie flat along the ecliptic
        orbitLine.rotation.x = Math.PI / 2;
        world.scene.add(orbitLine);
    });
}

const planetRadii = [125/6, 160/6, 185/6, 200/6, 280/6, 350/6, 70, 500/6];
addOrbitalLines(world, planetRadii)

let planets = {
    "Sun": new Sun(),
    "Mercury": new Mercury(),
    "Venus": new Venus(),
    "Earth": new Earth(),
    "Mars": new Mars(),
    "Jupiter": new Jupiter(),
    "Saturn": new Saturn(),
    "Uranus": new Uranus(),
    "Neptune": new Neptune()
};

// Add planets to world
Object.values(planets).forEach(planet => {
    world.add(planet);
    console.log(planet.name + " position: ", planet.objects[0].position);
});
const controls = new OrbitControls(world.camera, world.renderer.domElement)

function createViewControls() {
    const controlDiv = document.createElement('div');
    document.body.appendChild(controlDiv);

    Object.keys(planets).forEach(planetName => {
        const button = document.createElement('button');
        button.innerText = `View ${planetName}`;
        button.addEventListener('click', () => {
            // Assume the first group in the objects array is the main visual representation of the planet
            const planetMesh = planets[planetName].objects[0];  // Access the first group
            if (planetMesh && planetMesh.position) {
                const pos = planetMesh.position;
                world.camera.position.set(pos.x + 12, pos.y + 2, pos.z); // Adjust as needed for best view
                world.camera.lookAt(pos);
                world.renderer.render(world.scene, world.camera);  // Ensure the scene updates
            } else {
                console.error(`Position not found for ${planetName}.`);
            }
        });
        controlDiv.appendChild(button);
    });
}

createViewControls();
world.ui = new WorldUI(world);
world.go();

