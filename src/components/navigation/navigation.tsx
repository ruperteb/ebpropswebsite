import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BannerLogo from "../../assets/EB_Logo-website.jpg"
import SmallLogo from "../../assets/Small-Logo.jpg"
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

import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform
} from "framer-motion";

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';

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
        /* visibility: 'visible',
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",

        position: "fixed",
        "z-index": 1, */

        "margin-left": "auto",
        "margin-right": "auto",
        /*  transition: "all 300ms ease-in",
         transform: 'none', */
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
        "background-color": "#1f304a",
    },
    NavDiv: {
        "background-color": "#ca6",
        width: "100%",
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
        height: "53px",
        display: "flex",
        padding: 0,
        "background-color": "#1f304a",
    },
    NavLinkDiv: {
        display: "flex",
        flexDirection: "column",
        height: 40,
        width: "fit-content",
        paddingBottom: "5px",
        paddingLeft: "5px",
        paddingRight: "5px",
        marginRight: "auto",
        marginLeft: "auto",
    },
    NavLink: {
        "font-family": "Abel, sans-serif",
        "text-decoration": "none",
        "font-weight": 100,
        "text-transform": "uppercase",
        "font-size": "14px",
        "letter-spacing": "2px",
        color: "#404040",
        "line-height": "25px",
        '&:hover': { color: "#ffffff", },
        marginTop: "auto"
    },
    NavLinkHover: {
        color: "#ffffff"
    },
    NavLinkUnderline: {
        height: 2,
        marginBottom: "auto"
    }

}));

interface Props {
    /* exampleProp: string | undefined, */
}

export const Navigation: React.FC<Props> = ({ /* exampleProp, */ }) => {

    const currentPage = useAppSelector((state) => state.navigation.currentPage)
    const currentPageURL = useAppSelector((state) => state.navigation.currentPageURL)
    const scrollY = useAppSelector((state) => state.navigation.scrollY)

    const dispatch = useAppDispatch()

    const classes = useStyles();

    const { scrollY: scrollYFramer } = useViewportScroll();

    /* const [scroll, setScroll] = React.useState(0); */

    const [isTop, setIsTop] = React.useState(false);

    const navigationRef = React.createRef<HTMLDivElement>()

    React.useEffect(() => {

        if(navigationRef.current)

        dispatch(navigationSlice.actions.setNavigationHeight(navigationRef.current?.getBoundingClientRect().height))

    }, [])

   


    React.useEffect(() => {

        scrollYFramer.onChange((latestY) =>
            dispatch(navigationSlice.actions.setScrollY(latestY))
        )

        if (scrollY <= 50) {
            setIsTop(true)
        } else setIsTop(false)

    }, [scrollYFramer, scrollY])


    const getHeaderTop = () => {
        if (isTop === true) {
            return 0
        } else return -200

    }

    const getHeaderLeft = () => {
        if (isTop === true) {
            return -210
        } else return 0

    }

    const [navLinkToggle1, setNavLinkToggle1] = React.useState(false)
    const [navLinkToggle2, setNavLinkToggle2] = React.useState(false)
    const [navLinkToggle3, setNavLinkToggle3] = React.useState(false)

    const [navLinkHover1, setNavLinkHover1] = React.useState(false)
    const [navLinkHover2, setNavLinkHover2] = React.useState(false)
    const [navLinkHover3, setNavLinkHover3] = React.useState(false)

    React.useEffect(() => {
        if (currentPage === 0) {
            setNavLinkToggle1(true)
            setNavLinkToggle2(false)
            setNavLinkToggle3(false)
        }
        if (currentPage === 1) {
            setNavLinkToggle1(false)
            setNavLinkToggle2(true)
            setNavLinkToggle3(false)
        }
        if (currentPage === 2) {
            setNavLinkToggle1(false)
            setNavLinkToggle2(false)
            setNavLinkToggle3(true)
        }
    }, [currentPage])





    return (

        <motion.div ref={navigationRef} layout style={{ top: getHeaderTop(), left: 0, position: "fixed", zIndex: 1, width: "100%" }} >
            <div className={classes.LogoDiv}>
                <img className={classes.Logo} src={BannerLogo} alt="EllisBrownPropertiesLogo"></img>

            </div>

            <div className={classes.NavDiv}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <div onMouseEnter={() => setNavLinkHover1(true)} onMouseLeave={() => setNavLinkHover1(false)} className={classes.NavLinkDiv}>
                                    <Link className={currentPage === 0 ? `${classes.NavLink} ${classes.NavLinkHover} ` : classes.NavLink} to={`/#home`} onClick={() => dispatch(navigationSlice.actions.setCurrentPage(0))}>Home </Link>
                                    <motion.div className={classes.NavLinkUnderline} transition={{ duration: 0.4, ease: "easeInOut" }} animate={navLinkToggle1 === true || navLinkHover1 === true ? { opacity: 1, width: "100%", backgroundColor: "#e2d8d8d5" } : { opacity: 0, width: "0%", backgroundColor: "#e2d8d8d5" }}></motion.div>
                                </div>


                            </Grid>
                            <Grid item xs={4}>
                                <div onMouseEnter={() => setNavLinkHover2(true)} onMouseLeave={() => setNavLinkHover2(false)} className={classes.NavLinkDiv}>
                                    <Link className={currentPage === 1 ? `${classes.NavLink} ${classes.NavLinkHover}` : classes.NavLink} to={`/#about`} onClick={() => dispatch(navigationSlice.actions.setCurrentPage(1))}>About </Link>
                                    <motion.div className={classes.NavLinkUnderline} transition={{ duration: 0.4, ease: "easeInOut" }} animate={navLinkToggle2 === true || navLinkHover2 === true ? { opacity: 1, width: "100%", backgroundColor: "#e2d8d8d5" } : { opacity: 0, width: "0%", backgroundColor: "#e2d8d8d5" }}></motion.div>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div onMouseEnter={() => setNavLinkHover3(true)} onMouseLeave={() => setNavLinkHover3(false)} className={classes.NavLinkDiv}>
                                    <Link className={currentPage === 2 ? `${classes.NavLink} ${classes.NavLinkHover}` : classes.NavLink} to={`/#contact`} onClick={() => dispatch(navigationSlice.actions.setCurrentPage(2))}>Contact </Link>
                                    <motion.div className={classes.NavLinkUnderline} transition={{ duration: 0.4, ease: "easeInOut" }} animate={navLinkToggle3 === true || navLinkHover3 === true ? { opacity: 1, width: "100%", backgroundColor: "#e2d8d8d5" } : { opacity: 0, width: "0%", backgroundColor: "#e2d8d8d5" }}></motion.div>
                                </div>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
            </div>

            <motion.div layout style={{ top: 200, left: getHeaderLeft(), position: "absolute", zIndex: 1 }} >

                <img className={classes.SmallLogo} src={BannerLogo} alt="EllisBrownPropertiesLogo2"></img>

            </motion.div>

        </motion.div>

        /* <Container maxWidth="xl" className={classes.NavContainer} >
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
                                <Link className={props.currentPage === 0 ? `${classes.NavLink} ${classes.NavLinkActive}` : classes.NavLink} to={`/#home`} onClick={() => props.handlePageChange(0)}>Home </Link> 
                                
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


        </Container> */
    );
};

export default Navigation