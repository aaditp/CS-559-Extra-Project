import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

export class Venus extends GrObject {
    constructor() {
        let venusGroup = new T.Group();
        super("Venus", venusGroup);

        const venusGeom = new T.SphereGeometry(2.5/6, 32, 32); 
        const texture = new T.TextureLoader().load('textures/venus_tex.gif');
        const venusMat = new T.MeshStandardMaterial({
            map: texture, 
            bumpMap: texture, 
            bumpScale: 0.3 
        });
        const venusMesh = new T.Mesh(venusGeom, venusMat);
        venusGroup.add(venusMesh);

        this.venus = venusGroup;
        this.objects.push(venusGroup);

        this.orbitRadius = 160/6;  
        this.orbitSpeed = 0.00025;  
        this.orbitAngle = 0;
    }

    stepWorld(delta, timeOfDay) {
        this.venus.rotation.y += 0.0001; 
        this.orbitAngle += this.orbitSpeed * delta; 
        this.venus.position.x = this.orbitRadius * Math.cos(this.orbitAngle);
        this.venus.position.z = this.orbitRadius * Math.sin(this.orbitAngle);
    }
}