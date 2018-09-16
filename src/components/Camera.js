import React, { Component } from 'react'
import CameraPhoto, { FACING_MODES, IMAGE_TYPES } from 'jslib-html5-camera-photo'
import { Button } from 'semantic-ui-react'

import ImageContainer from './ImageContainer'

class Camera extends Component {

    amRef = null
    state = {
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
                this.setState({ active: false })
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

    render () {
        let { front, snapshotURI } = this.state
        return <div>
            <Button onClick={ () => {
                this.startCamera()
            }}> Start environment facingMode resolution ideal </Button>

            <Button onClick={ () => {
                this.stopCamera()
            }}> Stop </Button>

            <Button onClick={ () => {
                this.getSnapshot()
            }}> snapshot </Button>

            <Button onClick={ () => {
                this.switchFrontCamera(!front)
            }}> switch </Button>

            <video
                ref={ ref => {this.camRef = ref} }
                autoPlay="true"
                playsInline
            />

            { snapshotURI
                ? <ImageContainer standalone src={this.state.snapshotURI} />
                : null
            }
        </div>
    }
}

export default Camera
