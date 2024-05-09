import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

export class Mercury extends GrObject {
    constructor() {
        let mercuryGroup = new T.Group();
        super("Mercury", mercuryGroup);

        const mercuryGeom = new T.SphereGeometry(1/6, 32, 32); 
        const texture = new T.TextureLoader().load('textures/mercury_tex.jpg');
        const mercuryMat = new T.MeshStandardMaterial({
            map: texture, 
            bumpMap: texture, 
            bumpScale: 0.3 
        });
        const mercuryMesh = new T.Mesh(mercuryGeom, mercuryMat);
        mercuryGroup.add(mercuryMesh);

        this.mercury = mercuryGroup;
        this.objects.push(mercuryGroup);  

        this.orbitRadius = 125/6;
        this.orbitSpeed = 0.0005; 
        this.orbitAngle = 30;
    }

    stepWorld(delta, timeOfDay) {
        this.mercury.rotation.y += 0.0001; 
        this.orbitAngle += this.orbitSpeed * delta; 
        this.mercury.position.x = this.orbitRadius * Math.cos(this.orbitAngle);
        this.mercury.position.z = this.orbitRadius * Math.sin(this.orbitAngle);
    }
}

