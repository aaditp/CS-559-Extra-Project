import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

export class Neptune extends GrObject {
    constructor() {
        let neptuneGroup = new T.Group();
        super("Neptune", neptuneGroup);

        const neptuneGeom = new T.SphereGeometry(4.5/6, 64, 64); 
        const neptuneTexture = new T.TextureLoader().load('textures/neptune_tex.jpg');
        const neptuneMat = new T.MeshPhongMaterial({
            map: neptuneTexture,  
        });
        const neptuneMesh = new T.Mesh(neptuneGeom, neptuneMat);
        neptuneGroup.add(neptuneMesh);

        this.neptune = neptuneGroup;
        this.objects.push(neptuneGroup);

        this.orbitRadius = 500/6;  // Neptune's orbital radius
        this.orbitSpeed = 0.000012;  // Neptune's orbital speed
        this.orbitAngle = -30;
    }

    stepWorld(delta, timeOfDay) {

        this.neptune.rotation.y += 0.015;
        // Update orbital motion
        this.orbitAngle += this.orbitSpeed * delta;
        this.neptune.position.x = this.orbitRadius * Math.cos(this.orbitAngle);
        this.neptune.position.z = this.orbitRadius * Math.sin(this.orbitAngle);
    }
}

