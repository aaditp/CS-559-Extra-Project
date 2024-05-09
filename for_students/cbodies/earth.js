import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

export class Earth extends GrObject {
    constructor() {
        let earthGroup = new T.Group();
        super("Earth", earthGroup);

        // Create a sphere to represent Earth
        const earthGeom = new T.SphereGeometry(2.5/6, 32, 32);
        const earthTexture = new T.TextureLoader().load('textures/earth_tex.jpg');
        const earthMat = new T.MeshStandardMaterial({
            map: earthTexture, // Main texture for the surface
        });
        const earthMesh = new T.Mesh(earthGeom, earthMat);
        earthGroup.add(earthMesh);

        this.earth = earthGroup;
        this.objects.push(earthGroup);

        this.orbitRadius = 185/6;  // Earth's orbital radius, can adjust based on scale
        this.orbitSpeed = 0.0002;  // Earth's orbital speed
        this.orbitAngle = -10;
    }

    stepWorld(delta, timeOfDay) {
        // Earth rotation to simulate day/night cycle
        this.earth.rotation.y += 0.005; 

        // Orbital motion
        this.orbitAngle += this.orbitSpeed * delta;
        this.earth.position.x = this.orbitRadius * Math.cos(this.orbitAngle);
        this.earth.position.z = this.orbitRadius * Math.sin(this.orbitAngle);
    }
}
