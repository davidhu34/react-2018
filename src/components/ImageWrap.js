import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { Transition, config as springConfig } from 'react-spring'


class ImageWrap extends Component {
	ref = {}
	state = {}
	src = ''
	placeholderSrc = ''

	constructor(props) {
		super(props)
		this.src = props.src
		this.placeholderSrc = props.placeholderSrc
	}

	componentDidMount() {
		// console.log('loading')
		this.setState({ imageLoading: true })
		const buffer = new Image()
        buffer.onload = () => this.onImageGet()
        setTimeout( () => {
			buffer.src = this.src
		}, 3000);
	}

	onImageGet() {
		this.setState({
			imageLoaded: true,
			imageLoading: false
		})
	}

	fill(styles) {
		return {
			position: 'absolute',
			width: '100%',
			height: '100%',
			...styles
		}
	}

	render() {
		const { width, height } = this.props

		return <div style={{
			width, height, padding: 0
		}}>
		<Transition config={ springConfig.slow }
				from={{ opacity: 0 }} enter={{ opacity: 1 }} leave={{ opacity: 0 }}>
			    { this.state.imageLoaded
			        ? styles =>
						<div style={this.fill(styles)}>
							<img src={this.src}
								style={{ maxWidth: width+'px'}} />
						</div>
					: styles =>
						<div style={this.fill(styles)}>
							{ this.placeholderSrc?
								<img src={this.placeholderSrc}
									style={{ maxWidth: width+'px'}} />
								: 'Loader'
							}
						</div>
			    }
			</Transition>
		</div>
	}
}

export default ImageWrap
