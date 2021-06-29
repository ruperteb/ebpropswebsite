import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ConventionTower from "../../assets/Convention-Tower.jpg"
import TheVogue from "../../assets/The-Vogue.jpg"
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
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform,
    useMotionValue
} from "framer-motion";

import { useInView } from 'react-intersection-observer';

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
        /* height: "100vh", */

    },
    container: {

        padding: 0,
        width: '100vw',
        /*  height: "100vh", */
    },
    Image: {
        zIndex: -5,
        /* height: "100vh", */
        width: "100vw",
        height: "100vh",
        position: "absolute",
        objectFit: "cover",
        left: 0,
        top: 0

    },
    WelcomeText: {
        zIndex: 20,
        /* "font-family": "Dosis, sans-serif", */
        /* margin: "0 0 10px 0", */
        "text-align": "center",
        color: "#fff",
        "text-transform": "uppercase",
        "letter-spacing": ".25em",
        /* "font-size": "36px", */
        /* "font-weight": 100, */
        padding: "5px",
        textShadow: "-1px 1px 3px black;"

    },
    ContentWrapper: {
        height: "100vh",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        marginLeft: "auto", marginRight: "auto"
    },
    SubHeading: {
        display: "flex",
        "align-items": "center",
        "justify-content": "center",

    },
    SubHeadingText: {
        margin: 0,
        "font-family": "Dosis, sans-serif",
        "text-align": "center",
        color: "#fff",
        "text-transform": "uppercase",
        "letter-spacing": ".25em",

        padding: "5px",
        zIndex: 20,
        textShadow: "-1px 1px 3px black;",

    }


}));

interface Props {
    /* exampleProp: string | undefined, */
}

export const HomeMobile: React.FC<Props> = ({ /* exampleProp, */ }) => {

    /* const currentPage = useAppSelector((state) => state.navigation.currentPage)
    const currentPageURL = useAppSelector((state) => state.navigation.currentPageURL) */
    /* const scrollY = useAppSelector((state) => state.navigation.scrollY) */

    const dispatch = useAppDispatch()

    const homeMobileRef = React.createRef<HTMLDivElement>()

    React.useEffect(() => {

        if (homeMobileRef.current)

            dispatch(navigationSlice.actions.setHomeHeightMobile(homeMobileRef.current?.getBoundingClientRect().height))

    }, [])

    const [homeComponentRef, homeComponentInView, homeComponentEntry] = useInView({
        /* Optional options */
        threshold: 0.2,
    });

    React.useEffect(() => {

        if (homeComponentInView) {

            dispatch(navigationSlice.actions.setCurrentPage(0))
            dispatch(navigationSlice.actions.setCurrentPageURL("#home"))

        }



    }, [homeComponentInView])



    const classes = useStyles();

    const { scrollY } = useViewportScroll();
    const y1 = useTransform(scrollY, [0, 400], [0, 100]);
    const y2 = useTransform(scrollY, [0, 400], [0, -200]);


    const variants = {
        before: { x: -50, opacity: 0 },
        after: { x: 0, opacity: 1 },
    }


    return (
        <div ref={homeComponentRef}>

            <Container ref={homeMobileRef} className={classes.container} id={`#home`}>

                <motion.div style={{ y: y1, position: "absolute", top: "2em", left: 0, width: "100vw" }} >
                    <img className={classes.Image} src={TheVogue} alt="The Vogue"></img>
                </motion.div>

                {/* <div style={{ height: "6em" }}></div> */}

                <motion.div style={{ y: y2 }} transition={{ duration: 2 }} className={classes.ContentWrapper}>
                    <Grid container style={{ marginLeft: "auto", marginRight: "auto" }}>
                        <Grid item xs={12}>
                            <motion.div style={{marginTop: "4em"}} initial="before" animate="after" variants={variants} transition={{ duration: 2 }} >
                                <Typography variant="h4" align="center"  className={classes.WelcomeText} >Welcome to </Typography>
                                <Typography variant="h3" align="center" style={{color: "#ca6"}} className={classes.WelcomeText} >Ellis Brown</Typography>
                                <Typography variant="h3" align="center" style={{color: "#ca6"}} className={classes.WelcomeText} >Properties</Typography>
                            </motion.div>

                        </Grid>
                        
                        <Grid item xs={12}>
                            <Grid style={{ paddingTop: "50px" }} container >
                                <Grid item xs={2}>
                                </Grid>
                                <Grid item xs={8}>
                                    <motion.div className={classes.SubHeading} initial="before" animate="after" variants={variants} transition={{ duration: 2, delay: 0.3 }} >
                                        <NavigateNextIcon className={classes.SubHeadingText} />
                                        <Typography variant="h5" align="center" className={classes.SubHeadingText} >Letting</Typography>
                                    </motion.div>
                                </Grid>
                                <Grid item xs={2}>
                                </Grid>
                                <Grid item xs={2}>
                                </Grid>
                                <Grid item xs={8}>
                                    <motion.div className={classes.SubHeading}  initial="before" animate="after" variants={variants} transition={{ duration: 2, delay: 0.6 }} >
                                        <NavigateNextIcon className={classes.SubHeadingText} />
                                        <Typography variant="h5" align="center" className={classes.SubHeadingText} >Sales</Typography>
                                    </motion.div>
                                </Grid>
                                <Grid item xs={2}>
                                </Grid>
                                <Grid item xs={2}>
                                </Grid>
                                <Grid item xs={8}>
                                    <motion.div className={classes.SubHeading} initial="before" animate="after" variants={variants} transition={{ duration: 2, delay: 0.9 }} >
                                        <NavigateNextIcon className={classes.SubHeadingText} />
                                        <Typography variant="h5" align="center" className={classes.SubHeadingText} >Consultancy</Typography>
                                    </motion.div>
                                </Grid>
                                <Grid item xs={2}>
                                </Grid>
                            </Grid>
                            <div>
                            </div>
                        </Grid>
                        

                    </Grid>
                </motion.div>



            </Container>

        </div>


    );
};

export default HomeMobile