import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

export class Mars extends GrObject {
    constructor() {
        let marsGroup = new T.Group();
        super("Mars", marsGroup);

        const marsGeom = new T.SphereGeometry(1.5/6, 32, 32);  
        const marsTexture = new T.TextureLoader().load('textures/mars_tex.jpg');
        const marsMat = new T.MeshPhongMaterial({
            map: marsTexture,  
            bumpMap: marsTexture,  
            bumpScale: 0.5  
        });
        const marsMesh = new T.Mesh(marsGeom, marsMat);
        marsGroup.add(marsMesh);

        this.mars = marsGroup;
        this.objects.push(marsGroup);

        this.orbitRadius = 200/6;  
        this.orbitSpeed = 0.0001;  
        this.orbitAngle = 0;
    }

    stepWorld(delta, timeOfDay) {

        this.mars.rotation.y += 0.005; 

        this.orbitAngle += this.orbitSpeed * delta;
        this.mars.position.x = this.orbitRadius * Math.cos(this.orbitAngle);
        this.mars.position.z = this.orbitRadius * Math.sin(this.orbitAngle);
    }
}