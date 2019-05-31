const styles = {
  root: {
    height: '20%',
    width: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-6.5px',
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.5)'
    }
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    padding: '5px',
    color: 'black',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deleteIcon: {
    transition: 'all 0.3s ease-in-out'
  }
};

export default styles;