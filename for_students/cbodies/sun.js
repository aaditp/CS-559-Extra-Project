import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

export class Sun extends GrObject {
    constructor() {
        let sunGroup = new T.Group();
        super("Sun", sunGroup);

        const sunGeom = new T.SphereGeometry(5, 64, 64);
        const texture = new T.TextureLoader().load('textures/sun_tex.jpg');
        const sunMat = new T.MeshStandardMaterial({
            color: 0xFFA500, 
            emissive: 0xFFA500,  
            emissiveMap: texture,  
            displacementMap: texture,  
            displacementScale: 0.3  
        });
        const sunMesh = new T.Mesh(sunGeom, sunMat);
        sunGroup.add(sunMesh);

        const glowMaterial = new T.ShaderMaterial({
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                void main() {
                    float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1)), 2.0);
                    gl_FragColor = vec4(1.0, 0.6, 0.0, 1.0) * intensity;
                }
            `,
            side: T.BackSide,
            blending: T.AdditiveBlending,
            transparent: true
        });

        const glowMesh = new T.Mesh(sunGeom, glowMaterial);
        glowMesh.scale.multiplyScalar(1.2);  
        sunGroup.add(glowMesh);

        const sunlight = new T.PointLight(0xFFA500, 2.0, 100);
        sunGroup.add(sunlight);

        this.sunlight = sunlight;
        this.sunMat = sunMat;
        this.sun = sunGroup;
        this.objects.push(sunGroup);

        this.elapsedTime = 0; 
    }

    stepWorld(delta, timeOfDay) {

        this.elapsedTime += delta;

        const pulseFactor = Math.sin(this.elapsedTime * 0.0015); 

        this.sunMat.emissiveIntensity = pulseFactor * 0.2 + 0.9; 
    }
}