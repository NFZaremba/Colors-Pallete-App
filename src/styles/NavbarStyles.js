const styles = {
	Navbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		height: '5vh',
		color: 'white',
	  },
	  logo: {
		marginRight: '15px',
		padding: '0 13px',
		fontSize: '22px',
		backgroundColor: '#eceff1',
		fontFamily: 'Roboto',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		'& a': {
			textDecoration: 'none',
			color: 'black',
		}
	  },
	  slider: {
		width: '340px',
		margin: '0 10px',
		display: 'inline-block',
		'& .rc-slider-track':{
			backgroundColor: 'transparent'
		},
		'& .rc-slider-rail': {
			height: '10px'
		},
		'& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus, .rc-slider-handle:hover':{
			backgroundColor: 'blueviolet',
			outline: 'none',
			border: '2px solid blueviolet',
			boxShadow: 'none',
			width: '15px',
			height: '15px',
			marginLeft: '-7px',
			marginTop: '-2px',
		}
	  },
	  selectContainer: {
		marginLeft: 'auto',
		paddingRight: '1rem',
	  }
}
export default styles;