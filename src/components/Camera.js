import React, { Component } from 'react'
import CameraPhoto, { FACING_MODES, IMAGE_TYPES } from 'jslib-html5-camera-photo'
import { Button } from 'semantic-ui-react'

import ImageContainer from './ImageContainer'
import Canvas from './Canvas'

class Camera extends Component {

    camRef = null
    state = {
        active: false,
        front: false,
        width: null,
        height: null,
        snapshotURI: '',
        insights: []
    }

    constructor (props, context) {
        super(props, context)
        this.camRef = null
        this.cameraPhoto = null
    }

    componentDidMount () {
        this.cameraPhoto = new CameraPhoto(this.camRef)
        this.startCamera()
    }

    componentWillUnmount() {
        this.camRef = null
    }


    switchFrontCamera(isFront) {
        let { active, front } = this.state
        if (isFront != front) {
            if (active) this.startCamera(isFront)
            else this.setState({ front: isFront })
        }
    }

    startCamera (front, resolution = {}) {
        let mode = front
            ? FACING_MODES.USER
            : FACING_MODES.ENVIRONMENT

        this.cameraPhoto.startCamera(mode, resolution)
            .then( () => {
                if (this.camRef) this.setState({
                    front, resolution, active: true
                })
                console.log('Camera Started!', front? 'front': 'main')
            })
            .catch( (error) => {
                console.error('Camera not started!', error)
                this.setState({ active: false })
            })
    }

    stopCamera () {
        this.cameraPhoto.stopCamera()
            .then( () => {
                this.setState({
                    active: false,
                    front: false,
                    snapshotURI: ''
                })
                console.log('Camera stopped!')
            })
            .catch( (error) => {
                console.log('No camera to stop!:', error)
            })
    }

    getSnapshot(config = {}) {
        if (this.state.active) this.setState({
            snapshotURI: this.cameraPhoto.getDataUri(config)
        })
    }
    clearSnapshot() {
        if (this.state.active) this.setState({ snapshotURI: '' })
    }

    getCameraSettings() {
        return this.cameraPhoto == null? {}
            : this.cameraPhoto.getCameraSettings() || {}
    }

    render () {
        let { front, active, snapshotURI, insights } = this.state
        let { aspectRatio, frameRate, height, width } = this.getCameraSettings()

        return <div style={{
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            backgroundColor: 'black'
        }}>
            <video ref={ ref => {this.camRef = ref} }
                autoPlay
                playsInline
                style={{
                    display: snapshotURI? 'none': 'inline-block',
                    position: 'relative'
                }}
            />

            <div style={{
                position: 'relative'
            }}>
                { snapshotURI
                    ? <ImageContainer standalone
                        src={this.state.snapshotURI}
                        width={width} height={height} />
                    : null
                }
            </div>

            <div style={{
                position: 'absolute',
                width: '100%',
                top: 0
            }}>
                { active
                    ? <Canvas
                        objects={insights}
                        width={width}
                        height={height} />
                    : null
                }
            </div>

            <div style={{
                position: 'absolute',
                width: '100%',
                bottom: 0
            }}>
                { snapshotURI
                    ? <div>
                        <Button onClick={ () => {
                            this.clearSnapshot()
                        }}> re-shoot </Button>
                        <Button onClick={ () => {
                            this.stopCamera()
                        }}> use photo </Button>
                    </div>
                    : <div>
                        <Button onClick={ () => {
                            this.switchFrontCamera(!front)
                        }}> switch </Button>
                        <Button onClick={ () => {
                            this.getSnapshot()
                        }}> shoot </Button>
                    </div>
                }
            </div>

        </div>
    }
}

export default Camera
