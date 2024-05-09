import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";


class OrbitalRings extends GrObject {
    constructor(radii, color = 0x00FF00) {
        super("Orbital Rings");
        // Create a group to hold all the rings
        let ringsGroup = new T.Group();

        const ringMaterial = new T.MeshBasicMaterial({
            color: color,
            side: T.DoubleSide,
            transparent: true,
            opacity: 0.5
        });

        radii.forEach(radius => {
            const ringGeom = new T.RingGeometry(radius - 0.5, radius + 0.5, 90);
            const ringMesh = new T.Mesh(ringGeom, ringMaterial);
            ringMesh.rotation.x = Math.PI / 2; 
            ringsGroup.add(ringMesh);
        });

        this.objects.push(ringsGroup); 
    }
}

export default OrbitalRings;
