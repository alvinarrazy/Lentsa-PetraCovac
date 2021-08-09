import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import './Styles/Maps.css'


class MapPage extends React.Component {
	constructor(props) {
		super(props);
		this.iframe = this.iframe.bind(this)
		this.state = {}
	}

	iframe() {
		const iframe = `
		<iframe 
		width="500" 
		height="400" 
		frameborder="0" 
		scrolling="no" 
		marginheight="0" 
		marginwidth="0" 
		title="Peta Kasus COVID-19 di Kabupaten Semarang" 
		src="//www.arcgis.com/apps/Embed/index.html?webmap=e37af779d0964a0da6fc1fb537312201&extent=110.3441,-7.2918,110.6806,-7.1327&home=true&zoom=true&previewImage=false&scale=true&search=true&searchextent=true&details=true&legend=true&active_panel=details&basemap_gallery=true&disable_scroll=true&theme=light">
	</iframe>
		`
		return {
			__html: iframe
		}
	}


	render() {
		return (
			<>

				<div className='mappage-container'>
					<div className='header'>
						<div className='header-contents'>
							<h1>COVID-19 TRACKING</h1>
							<p>KABUPATEN SEMARANG</p>
						</div>
					</div>
					<div className='map'>
						<div className="embed-container">
							<div dangerouslySetInnerHTML={this.iframe()} />
						</div>
					</div>
				</div>
			</>
		)

	}

}

const mapStateToProps = (state) => {
	return {
		covidDataState: state.covidDataReducer //call by this.props.covidDataState.*
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
