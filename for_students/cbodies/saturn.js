import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

export class Saturn extends GrObject {
    constructor() {
        let saturnGroup = new T.Group();
        super("Saturn", saturnGroup);

        const saturnGeom = new T.SphereGeometry(6.5/6, 64, 64);
        const saturnTexture = new T.TextureLoader().load('textures/saturn_tex.jpg');
        const saturnMat = new T.MeshPhongMaterial({
            map: saturnTexture,
        });
        const saturnMesh = new T.Mesh(saturnGeom, saturnMat);
        saturnGroup.add(saturnMesh);

        const ringMaterial = new T.MeshBasicMaterial({
            color: 0x907860,  
            side: T.DoubleSide,
            transparent: true,
            opacity: 0.4
        });
        let ringsGroup = new T.Group();
        const ringDistances = [9.3/6, 9.5/6, 10/6, 10.3/6, 11.1/6, 11.5/6];  
        ringDistances.forEach((distance) => {
            const ringGeom = new T.RingGeometry(distance, distance + 0.1, 64);
            const ringMesh = new T.Mesh(ringGeom, ringMaterial);
            ringMesh.rotation.x = Math.PI / 2;
            ringsGroup.add(ringMesh);
        });

        saturnGroup.add(ringsGroup);

        saturnGroup.rotation.x = 0.5;  

        this.saturn = saturnGroup;
        this.objects.push(saturnGroup);

        this.orbitRadius = 350/6;  
        this.orbitSpeed = 0.00003;  
        this.orbitAngle = 50;
    }

    stepWorld(delta, timeOfDay) {

        this.orbitAngle += this.orbitSpeed * delta;
        this.saturn.position.x = this.orbitRadius * Math.cos(this.orbitAngle);
        this.saturn.position.z = this.orbitRadius * Math.sin(this.orbitAngle);

        this.saturn.children[1].rotation.y = -this.saturn.rotation.y; 
    }
}