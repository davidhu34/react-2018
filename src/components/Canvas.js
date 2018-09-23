import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

class Canvas extends Component {
    ref = null

    constructor (props) {
        super(props)
    }

    componentDidMount() {
        const { registerCanvas, context, width, height } = this.props
        console.log(width, height)
        if ( context == null ) {
            const _canvas = this.ref
            _canvas.width = width
            _canvas.height = height
            const ctx = _canvas.getContext('2d')

        	ctx.strokeStyle = '#0dd00f'
        	ctx.fillStyle = '#00000f'
        	ctx.lineWidth = 15
        	ctx.lineJoin = 'round'
        	ctx.lineCap = 'round'
            const x = 50
            const y = 100
            const x0 = 0
    		const y0 = 0
    		ctx.beginPath()
    		ctx.moveTo(x0, y0)
    		ctx.lineTo(x,y0)
    		ctx.lineTo(x,y)
    		ctx.lineTo(x0,y)
    		ctx.lineTo(x0,y0)
    		ctx.stroke()
    		ctx.closePath()
        }
    }

    render () {
        return <canvas ref={ ref => { this.ref = ref } }
            style={this.props.style}
        />
    }
}

export default Canvas
