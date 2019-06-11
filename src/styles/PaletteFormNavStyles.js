import sizes from './sizes';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  hide: {
    display: 'none'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    background: 'black'
  },
  appBarShift: {
    // eslint-disable-next-line no-undef
    width: `calc(100% - ${parseInt(process.env.REACT_APP_DRAWER_WIDTH)}px)`,
    // eslint-disable-next-line no-undef
    marginLeft: parseInt(process.env.REACT_APP_DRAWER_WIDTH),
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    color: 'white',
    background: 'black'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  navBtns: {
    marginRight: '1rem',
    '& a': {
      textDecoration: 'none'
    },
    [sizes.down('xs')]: {
      marginRight: '0.5rem'
    }
  },
  button: {
    margin: '0 0.5rem',
    [sizes.down('xs')]: {
      margin: 0
    }
  }
});

export default styles;
