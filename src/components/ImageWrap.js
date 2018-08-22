import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { Spring, Transition, config as springConfig } from 'react-spring'


class ImageWrap extends Component {

	buffer = null
	onload = null

	proportion = 1
	imageStyle = {}
	placeholderImageStyle = {}

	constructor(props) {
		super(props)

		this.state = {
			imageLoading: true,
			imageLoaded: false
		}

		const { width, height, blur } = this.props
		const imageStyleBase = (w,h) => ({
			width: w + 'px',
			height: h + 'px',
			maxWidth: w + 'px'
		})
		this.imageStyle = imageStyleBase(width, height)
		this.placeholderImageStyle = imageStyleBase(width - blur, height - blur)
		this.proportion = width / height
	}

	componentWillMount() {
		this.onload = this.onImageGet.bind(this)
	}

	componentDidMount() {
		this.buffer = new Image()
        this.buffer.addEventListener('load', this.onload)
		this.buffer.src = this.props.src
	}

	componentWillUnmount() {
		this.buffer.removeEventListener('load', this.onload)
	}

	onImageGet() {
		this.setState({
			imageLoaded: true,
			imageLoading: false
		})
	}

	fillStyle(edge = 0) {
		return {
			position: 'absolute',
			width: '100%',
			height: '100%',
			paddingLeft: edge,
			paddingTop: edge,
		}
	}

	render() {
		const { width, height, blur, src, placeholderSrc } = this.props

		const blurFilter = 'blur(' + blur + 'px)'
		return <div style={{
			width, height, padding: 0
		}}>

			<Spring config={ springConfig.slow }
				from={{ opacity: 0, filter: blurFilter }}
				to={ this.state.imageLoaded
					? { opacity: 1, filter: 'blur(0px)' }
					: { opacity: 1, filter: blurFilter }
				}>
				{ styles => { return placeholderSrc
					? <div style={this.fillStyle(blur/2)}>
						<img src={placeholderSrc}
							style={{
								...styles,
								...this.placeholderImageStyle
							}} />
					</div>
					: <div>Loader</div>
				}}
			</Spring>

			<Spring from={{ opacity: 0 }}
				to={ this.state.imageLoaded
					? { opacity: 1 }
					: { opacity: 0 }
				}>
				{ styles => <div style={this.fillStyle()}>
						<img src={src}
							style={{
								...styles,
								...this.imageStyle
							}} />
					</div>
				}
			</Spring>

		</div>
	}
}

export default ImageWrap
