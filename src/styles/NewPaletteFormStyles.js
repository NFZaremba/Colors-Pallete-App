const styles = theme => ({
  root: {
    display: 'flex'
  },

  hide: {
    display: 'none'
  },
  drawer: {
    // eslint-disable-next-line no-undef
    width: process.env.REACT_APP_DRAWER_WIDTH,
    flexShrink: 0
  },
  drawerPaper: {
    // eslint-disable-next-line no-undef
    width: process.env.REACT_APP_DRAWER_WIDTH,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    // eslint-disable-next-line no-undef
    marginLeft: -process.env.REACT_APP_DRAWER_WIDTH
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  container: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btns: {
    width: '100%'
  },
  button: {
    width: '50%'
  }
});

export default styles;
