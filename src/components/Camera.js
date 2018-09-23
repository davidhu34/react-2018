import React, { Component } from 'react'
import CameraPhoto, { FACING_MODES, IMAGE_TYPES } from 'jslib-html5-camera-photo'
import { Button } from 'semantic-ui-react'

import ImageContainer from './ImageContainer'

class Camera extends Component {

    camRef = null
    state = {
        active: false,
        front: false,
        width: null,
        height: null,
        snapshotURI: ''
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
                this.setState({
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
        let { front, snapshotURI } = this.state
        let { aspectRatio, frameRate, height, width } = this.getCameraSettings()

        return <div style={{
            textAlign: 'center', position: 'relative'
        }}>
            <video
                style={{display: snapshotURI? 'none': 'inline-block'}}
                ref={ ref => {this.camRef = ref} }
                autoPlay
                playsInline
            />

            { snapshotURI
                ? <ImageContainer standalone
                    src={this.state.snapshotURI}
                    width={width} height={height} />
                : null
            }

            <div style={{
                position: 'absolute',
                bottom: 0,
                width: '100%'
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
