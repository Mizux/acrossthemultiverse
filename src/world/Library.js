import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default class Library {
    constructor() {
        this.source = {
            textures : {
                starfield : {
                    baseUrl: '/textures/starfield/',
                    pool: [
                        {type: 'pass', src: 'star1.png'},
                        {type: 'pass', src: 'star2.png'},
                        {type: 'pass', src: 'star3.png'},
                        {type: 'pass', src: 'star4.png'},
                        {type: 'pass', src: 'star5.png'},
                        {type: 'pass', src: 'star6.png'},
                        {type: 'pass', src: 'star7.png'},
                        {type: 'pass', src: 'star8.png'},
                        {type: 'bright', src: 'brightstar1.png'},
                        {type: 'bright', src: 'brightstar2.png'},
                        {type: 'bright', src: 'brightstar3.png'},
                        {type: 'bright', src: 'brightstar4.png'}
                    ]
                },
                nebula : {
                    baseUrl: '/textures/nebula/',
                    pool: [
                        {type: 'cloud', src: 'cloud1.png'},
                        {type: 'cloud', src: 'cloud2.png'},
                        {type: 'cloud', src: 'cloud3.png'},
                        {type: 'cloud', src: 'cloud4.png'}
                    ]
                }
            },
            models: {
                singularity: {
                    baseUrl: '/models/singularity/',
                    pool: [
                        {type: 'blackhole', src: 'blackhole.gltf'}
                    ]
                }
            }
        }

        this.textures = {
            starfield : {
                pass: [],
                bright: []
            },
            nebula : {
                cloud: []
            }
        }

        this.models = {
            singularity: {
                blackhole: {}
            }
        }
    }

    preload() {
        // preloading all textures
        for(let textureSourceType of Object.keys(this.source.textures)) {
            for(let textureObject of this.source.textures[textureSourceType].pool) {
                const currentTexture = new THREE.TextureLoader().load(
                    `${this.source.textures[textureSourceType].baseUrl}${textureObject.src}`
                )
                currentTexture.premultiplyAlpha = true

                this.textures[textureSourceType][textureObject.type].push(currentTexture)
            }
        }

        // preloading all models
        const gltfLoader = new GLTFLoader()

        for(let modelSourceType of Object.keys(this.source.models)) {
            for(let modelObject of this.source.models[modelSourceType].pool) {
                gltfLoader.load(
                    `${this.source.models[modelSourceType].baseUrl}${modelObject.src}`,
                    gltf => this.models[modelSourceType][modelObject.type] = gltf, 
                    undefined, 
                    error => console.error(error)
                )
            }
        }
    }
}