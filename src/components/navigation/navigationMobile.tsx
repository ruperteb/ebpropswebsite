import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import BannerLogo from "../../assets/EB_Logo-website.jpg"

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useTheme } from '@material-ui/core/styles';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
    withRouter

} from "react-router-dom";

import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform
} from "framer-motion";

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';

import "./navigationMobile.css"



const useStyles = makeStyles({
    list: {
       /*  width: 250, */
        backgroundColor: "#ca6"
    },
    fullList: {
       /*  width: 'auto', */
        backgroundColor: "#ca6"
    },
    navContainer: {
        backgroundColor: "#1f304a",
        position: "fixed",
        zIndex: 500,
        width: "100vw",
        boxShadow: '-1px 1px 3px 4px rgb(0 0 0 / 15%)'
    },
    NavLinkDiv: {
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        padding: "5px",
        margin: "auto",
        /*  lineHeight: 20, */
    },
    NavLinkDivSelected: {
        borderRadius: 50,
        backgroundColor: "#3f51b580",
    },
    NavLinkInner: {
        textDecoration: "none",
        paddingLeft: "0.5em",
        paddingRight: "0.5em",

    },
    NavLinkInnerSelected: {
        borderRadius: 50,
        backgroundColor: "#3f51b580",
    },
    NavLink: {
        /* "font-family": "Abel, sans-serif", */
        "text-decoration": "none",
        /* "font-weight": 100, */
        /* "text-transform": "uppercase", */
        /* "font-size": "14px", */
        /* "letter-spacing": "2px", */
        color: "#ffffff",
        /*  "line-height": "25px", */
        '&:hover': { color: "#ffffff", },
        marginTop: "auto",
        marginBottom: "auto",
        textShadow: "2px 2px 5px #000000"
    },
    SmallLogo: {
        height: "80px",
        display: "flex",
        padding: 0,
        "background-color": "#1f304a",
        margin: "auto",
    },
    menuButton: {
        margin: "auto",
    },
    menuButtonIcon: {
        fontSize: "2em",
        color: "#b19258",
    }
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface Props {
    /* exampleProp: string | undefined, */
}

export const NavigationMobile: React.FC<Props> = ({ /* exampleProp, */ }) => {

    const classes = useStyles();
    const theme = useTheme();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
        open: false,
    });

    const currentPage = useAppSelector((state) => state.navigation.currentPage)
    const currentPageURL = useAppSelector((state) => state.navigation.currentPageURL)
    const scrollY = useAppSelector((state) => state.navigation.scrollYMobile)

    const aboutScrollDistance = useAppSelector((state) => state.navigation.navigationHeightMobile + state.navigation.homeHeightMobile)

    const significantScrollDistance = useAppSelector((state) => state.navigation.navigationHeightMobile + state.navigation.homeHeightMobile + state.navigation.aboutHeightMobile)

    const contactScrollDistance = useAppSelector((state) => state.navigation.navigationHeightMobile + state.navigation.homeHeightMobile + state.navigation.aboutHeightMobile + state.navigation.significantHeightMobile)

    const dispatch = useAppDispatch()

    const { scrollY: scrollYFramer } = useViewportScroll();

    const navigationMobileRef = React.createRef<HTMLDivElement>()

    React.useEffect(() => {

        if (navigationMobileRef.current)

            dispatch(navigationSlice.actions.setNavigationHeightMobile(navigationMobileRef.current?.getBoundingClientRect().height))

    }, [])

    React.useEffect(() => {

        scrollYFramer.onChange((latestY) =>
            dispatch(navigationSlice.actions.setScrollYMobile(latestY))
        )
    }, [scrollYFramer])

    const navLinkClick = (page: number) => {

        dispatch(navigationSlice.actions.setCurrentPage(page))

        switch (page) {
            case 0:
                window.scrollTo({ behavior: 'smooth', top: 0 })
                break;
            case 1:
                window.scrollTo({ behavior: 'smooth', top: aboutScrollDistance - 0 })
                break;
            case 2:
                window.scrollTo({ behavior: 'smooth', top: significantScrollDistance - 0 })


                break;
            case 3:
                window.scrollTo({ behavior: 'smooth', top: contactScrollDistance })
                break;
            default:
                window.scrollTo({ behavior: 'smooth', top: 0 })
        }


    }

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, open: !state.open });
    };

    const list = (anchor: Anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            style={{ backgroundColor: "#ca6" }}
        >
            <Grid container style={{ height: "6em", }}>
                {/* <Grid item xs={2}></Grid> */}
                <Grid style={{ marginLeft: "0.5em", marginRight: "0.5em", }} container xs={12}>
                    {/* <Grid item xs={1}></Grid> */}
                    <Grid style={{display: "flex"}} item xs={2}>
                        <div className={currentPage === 0 ? `${classes.NavLinkDiv} ${classes.NavLinkDivSelected} ` : classes.NavLinkDiv}>
                            <Link className={currentPage === 0 ? `${classes.NavLinkInner} ${classes.NavLinkInnerSelected} ` : classes.NavLink} to={`/#home`} onClick={() => navLinkClick(0)}>
                                <Typography variant="h6" align="center" className={classes.NavLink} >Home</Typography>
                            </Link>
                        </div>

                    </Grid>
                    <Grid style={{display: "flex"}} item xs={3}>
                        <div className={currentPage === 1 ? `${classes.NavLinkDiv} ${classes.NavLinkDivSelected} ` : classes.NavLinkDiv}>
                            <Link className={currentPage === 1 ? `${classes.NavLinkInner} ${classes.NavLinkInnerSelected} ` : classes.NavLink} to={`/#about`} onClick={() => navLinkClick(1)}>
                                <Typography variant="h6" align="center" className={classes.NavLink} >About</Typography>
                                <Typography variant="h6" align="center" className={classes.NavLink} >Us</Typography>
                            </Link>
                        </div>
                    </Grid>
                    <Grid style={{display: "flex"}} item xs={4}>
                        <div className={currentPage === 2 ? `${classes.NavLinkDiv} ${classes.NavLinkDivSelected} ` : classes.NavLinkDiv}>
                            <Link className={currentPage === 2 ? `${classes.NavLinkInner} ${classes.NavLinkInnerSelected} ` : classes.NavLink} to={`/#significant_transactions`} onClick={() => navLinkClick(2)}>
                                <Typography variant="h6" align="center" className={classes.NavLink} >Significant</Typography>
                                <Typography variant="h6" align="center" className={classes.NavLink} >Transactions</Typography>
                            </Link>
                        </div>
                    </Grid>
                    <Grid style={{display: "flex"}} item xs={3}>
                        <div className={currentPage === 3 ? `${classes.NavLinkDiv} ${classes.NavLinkDivSelected} ` : classes.NavLinkDiv}>
                            <Link className={currentPage === 3 ? `${classes.NavLinkInner} ${classes.NavLinkInnerSelected} ` : classes.NavLink} to={`/#contact`} onClick={() => navLinkClick(3)}>
                                <Typography variant="h6" align="center" className={classes.NavLink} >Contact</Typography>
                                <Typography variant="h6" align="center" className={classes.NavLink} >Us</Typography>
                            </Link>
                        </div>
                    </Grid>
                </Grid>

            </Grid>
        </div>
    );

    return (
        <div ref={navigationMobileRef} className={classes.navContainer}>
           
            <Grid container>
                <Grid container xs={2}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer("top", true)}
                        edge="start"
                        className={clsx(classes.menuButton)}
                    >
                        <MenuIcon className={classes.menuButtonIcon} />
                    </IconButton>

                </Grid>
                <Grid container xs={8}>
                    <img className={classes.SmallLogo} src={BannerLogo} alt="EllisBrownPropertiesLogo"></img>
                </Grid>
                <Grid container xs={2}></Grid>
            </Grid>
            {([/* 'left', 'right',  */'top'/* , 'bottom' */] as Anchor[]).map((anchor) => (
                <React.Fragment key={anchor}>

                    <SwipeableDrawer
                        anchor={"top"}
                        open={state.open}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}

                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}

export default NavigationMobile
