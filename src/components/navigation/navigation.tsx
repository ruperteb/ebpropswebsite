import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BannerLogo from "../../assets/EB_Logo-website.jpg"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
    withRouter

} from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    stepper: {
        width: "100%",
        /* marginLeft: "auto",
      marginRight: "auto" */
    },
    Logo: {
        visibility: 'visible',
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",

        position: "fixed",
        "z-index": 1,

        "margin-left": "auto",
        "margin-right": "auto",
        transition: "all 300ms ease-in",
        transform: 'none',
        height: "200px"
    },

    hiddenLogo: {
        visibility: 'hidden',
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",

        position: "fixed",
        "z-index": 1,

        "margin-left": "auto",
        "margin-right": "auto",
        transition: "all 300ms ease-out",
        transform: 'translate(0, -100%)',
        height: "200px"
    },
    NavContainer: {
        padding: 0,
        margin: 0
    },
    LogoDiv: {
        height: "200px",
        width: "100%",
        justifyContent: "center",
        display: "flex",
        padding: 0,
        "background-color": "#1f304a",
        position: "fixed",
        "z-index": 1,

        "margin-left": "auto",
        "margin-right": "auto",
        transition: "all 300ms ease-in",
        transform: 'none',

    },
    LogoDivHidden: {
        visibility: 'hidden',
        height: "200px",
        width: "100%",
        justifyContent: "center",
        display: "flex",
        padding: 0,
        "background-color": "#1f304a",
        position: "fixed",
        "z-index": 1,

        "margin-left": "auto",
        "margin-right": "auto",
        transition: "all 300ms ease-out",
        transform: 'translate(0, -100%)',

    },
    NavBar: {
        height: "40px",
        "background-color": "#ca6",
        position: "fixed",
        "z-index": 2,
        marginTop: "200px",
        width: "100%",
        transition: "all 300ms ease-in",
        transform: 'none',
    },
    NavBarTranslated: {
        height: "40px",
        "background-color": "#ca6",
        position: "fixed",
        "z-index": 2,
        marginTop: "200px",
        width: "100%",
        transition: "all 300ms ease-out",
        transform: 'translate(0, -200px)',
    },
    SmallLogo: {
        height: "40px",
        /* width: "40px", */
        justifyContent: "center",
        display: "flex",
        padding: 0,
        "background-color": "#1f304a",
        position: "fixed",
        "z-index": 1,

        "margin-left": "auto",
        "margin-right": "auto",
        transition: "all 300ms ease-in",
        /* transform: 'translate(-100%, 0)', */

    },
    SmallLogoHidden: {
        visibility: 'hidden',
        height: "40px",
        width: "40px",
        justifyContent: "center",
        display: "flex",
        padding: 0,
        "background-color": "#1f304a",
        position: "fixed",
        "z-index": 1,

        "margin-left": "auto",
        "margin-right": "auto",
        transition: "all 300ms ease-out",
        transform: 'translate(-100%, 0)',

    },
    NavLink: {
        "font-family": "Abel, sans-serif",
        "text-decoration": "none",
        "font-weight": 100,
        "text-transform": "uppercase",
        "font-size": "14px",
        "margin-right": "35px",
        "letter-spacing": "2px",
        color: "#404040",
        "line-height": "40px",
        '&:hover': { color: "#ffffff", },
        paddingBottom: "5px",
        paddingLeft: "5px",
        paddingRight: "5px",


    },
    NavLinkActive: {
        "border-radius": "0px",
        "border-bottom": "2px solid #e2d8d8d5",
        color: "#ffffff",
    }


}));

interface Props {
    exampleProp: string | undefined,
}

export const Navigation: React.FC<Props> = ({ exampleProp, }) => {

    const classes = useStyles();

    return (

        <Container maxWidth="xl" className={classes.NavContainer} /* className={hideOnScroll ? classes.visibleNavBar : classes.hiddenNavBar} */>
            <div className={props.showLogoDiv ? classes.LogoDiv : classes.LogoDivHidden}>
                <img className={classes.Logo} src={BannerLogo} alt="EllisBrownPropertiesLogo"></img>
            </div>
            <div className={props.showLogoDiv ? classes.NavBar : classes.NavBarTranslated}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <img className={props.showLogoDiv ? classes.SmallLogoHidden : classes.SmallLogo} src={BannerLogo} alt="EllisBrownPropertiesLogo2"></img>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Link className={props.currentPage === 0 ? `${classes.NavLink} ${classes.NavLinkActive}` : classes.NavLink} to={`/#home`} onClick={() => props.handlePageChange(0)}>Home </Link>   {/* See https://github.com/facebook/react/issues/18147  for need to use callback*/}
                                {/*  <button onClick={setCurrentPageDispatch(0)}></button> */}
                            </Grid>
                            <Grid item xs={4}>
                                <Link className={props.currentPage === 1 ? `${classes.NavLink} ${classes.NavLinkActive}` : classes.NavLink} to={`/#about`} onClick={() => props.handlePageChange(1)}>About </Link>
                            </Grid>
                            <Grid item xs={4}>
                                <Link className={props.currentPage === 2 ? `${classes.NavLink} ${classes.NavLinkActive}` : classes.NavLink} to={`/#contact`} onClick={() => props.handlePageChange(2)}>Contact </Link>
                            </Grid>
                        </Grid>



                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
            </div>


        </Container>
    );
};

export default Navigation