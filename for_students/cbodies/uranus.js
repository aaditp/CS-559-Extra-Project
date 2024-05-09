import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

export class Uranus extends GrObject {
    constructor() {
        let uranusGroup = new T.Group();
        super("Uranus", uranusGroup);

        const uranusGeom = new T.SphereGeometry(4.5/6, 64, 64); 
        const uranusTexture = new T.TextureLoader().load('textures/uranus_tex.jpg');
        const uranusMat = new T.MeshPhongMaterial({
            map: uranusTexture,  
        });
        const uranusMesh = new T.Mesh(uranusGeom, uranusMat);
        uranusGroup.add(uranusMesh);

        this.uranus = uranusGroup;
        this.objects.push(uranusGroup);

        this.orbitRadius = 70;  
        this.orbitSpeed = 0.000015;  
        this.orbitAngle = 10;

        uranusGroup.rotation.z = Math.PI / 2; 
    }

    stepWorld(delta, timeOfDay) {

        this.uranus.rotation.y += 0.015;

        this.orbitAngle += this.orbitSpeed * delta;
        this.uranus.position.x = this.orbitRadius * Math.cos(this.orbitAngle);
        this.uranus.position.z = this.orbitRadius * Math.sin(this.orbitAngle);
    }
}