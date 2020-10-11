import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import { Link, withRouter } from "react-router-dom";
import {compose} from "recompose";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {logout} from "../../redux/actions/authActions";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up("md")]: {
            display: "none"
        },
        float: "left",
    },
    menuItem: {
        minHeight: "60px",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        padding: theme.spacing(3),
        alignItems: 'center'
    },
    auth: {
        borderRadius: 7,
        width: '50px',
        color: 'white',
    },
    typography: {
        float: "left",
        flexGrow: 1
    },
});

function AppNavbar(props) {
  const { window, classes } = props;
  const { location: {pathname} } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Hidden smDown implementation="css">
          <div className={classes.toolbar} />
      </Hidden>
      <Divider />
        <MenuList>
            <MenuItem
                component={Link}
                className={classes.menuItem}
                to="/"
                selected={"/" === pathname}
            >
                Home
            </MenuItem>
            <MenuItem
                component={Link}
                className={classes.menuItem}
                to="/invoice"
                selected={"/invoice" === pathname}
            >
                Invoice
            </MenuItem>
        </MenuList>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.typography}>
            Responsive drawer
          </Typography>
            { props.isAuthenticated ?
              <div className={classes.auth}>
                  <Button style={{ color: 'white' }} onClick={props.logout}>Logout</Button>
              </div>
           : null }
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
          {props.isAuthenticated ? (
              <React.Fragment>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
              </React.Fragment>
              ) : null }
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        { props.children }
      </main>
    </div>
    </Fragment>
  );
}

AppNavbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
    logout
}

export default compose(
    withRouter,
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps)
)(AppNavbar);
