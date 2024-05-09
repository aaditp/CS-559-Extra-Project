import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

export class Jupiter extends GrObject {
    constructor() {
        let jupiterGroup = new T.Group();
        super("Jupiter", jupiterGroup);

        const jupiterGeom = new T.SphereGeometry(10/6, 64, 64);  
        const jupiterTexture = new T.TextureLoader().load('textures/jupiter_tex2.jpg');
        const jupiterMat = new T.MeshPhongMaterial({
            map: jupiterTexture,  
            bumpMap: jupiterTexture,  
            bumpScale: 0.05
        });
        const jupiterMesh = new T.Mesh(jupiterGeom, jupiterMat);
        jupiterGroup.add(jupiterMesh);

        this.jupiter = jupiterGroup;
        this.objects.push(jupiterGroup);

        this.orbitRadius = 280/6;  
        this.orbitSpeed = 0.00005;  
        this.orbitAngle = -80;
    }

    stepWorld(delta, timeOfDay) {

        this.jupiter.rotation.y += 0.015; 

        this.orbitAngle += this.orbitSpeed * delta;
        this.jupiter.position.x = this.orbitRadius * Math.cos(this.orbitAngle);
        this.jupiter.position.z = this.orbitRadius * Math.sin(this.orbitAngle);
        this.jupiter.position.y - -5;
    }
}