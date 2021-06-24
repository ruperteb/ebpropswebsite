import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ConventionTower from "../../assets/Convention-Tower.jpg"
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
        width: '100%',
        height: "100vh",

    },
    container: {

        padding: 0,
        width: '100vw',
        height: "100vh",
    },
    Image: {
        zIndex: -1,
        height: "100vh",
        width: "100%",
        position: "absolute",
        left: 0,
        top: 0

    },
    WelcomeText: {
        zIndex: 1,
        "font-family": "Dosis, sans-serif",
        margin: "0 0 10px 0",
        "text-align": "center",
        color: "#fff",
        "text-transform": "uppercase",
        "letter-spacing": ".25em",
        "font-size": "36px",
        "font-weight": 100,
        padding: "0 5px",
        "z-index": 10,

    },
    ContentWrapper: {
        height: "600px",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        marginLeft: "auto", marginRight: "auto"
    },
    SubHeading: {
        display: "flex",
        "align-items": "center",
        /* "justify-content": "center", */

    },
    SubHeadingText: {
        margin: 0,
        "font-family": "Dosis, sans-serif",
        "text-align": "center",
        color: "#fff",
        "text-transform": "uppercase",
        "letter-spacing": ".25em",

        padding: "0 5px",
        "z-index": 10,

    }


}));

interface Props {
    /* exampleProp: string | undefined, */
}

export const Home: React.FC<Props> = ({ /* exampleProp, */ }) => {

    const currentPage = useAppSelector((state) => state.navigation.currentPage)
    const currentPageURL = useAppSelector((state) => state.navigation.currentPageURL)
    /* const scrollY = useAppSelector((state) => state.navigation.scrollY) */

    const dispatch = useAppDispatch()

    const homeRef = React.createRef<HTMLDivElement>()

    React.useEffect(() => {

        if (homeRef.current)

            dispatch(navigationSlice.actions.setHomeHeight(homeRef.current?.getBoundingClientRect().height))

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
    const y2 = useTransform(scrollY, [0, 400], [0, -50]);


    const variants = {
        before: { x: -50, opacity: 0 },
        after: { x: 0, opacity: 1 },
    }


    return (
        <div ref={homeComponentRef}>

            <Container ref={homeRef} maxWidth='lg' className={classes.container} id={`#home`}>

                <motion.div style={{ y: y1, position: "absolute", top: 0, left: 0, width: "100vw" }} >
                    <img className={classes.Image} src={ConventionTower} alt="ConventionTower"></img>
                </motion.div>

                <div style={{ height: "250px" }}></div>

                <motion.div style={{ y: y2 }} transition={{ duration: 2 }} className={classes.ContentWrapper}>
                    <Grid container spacing={1} style={{ marginLeft: "auto", marginRight: "auto" }}>
                        <Grid item xs={12}>
                            <motion.div initial="before" animate="after" variants={variants} transition={{ duration: 2 }} >
                                <h2 className={classes.WelcomeText}>Welcome to Ellis Brown Properties</h2>
                            </motion.div>

                        </Grid>
                        <Grid item xs={3}>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid style={{ paddingTop: "100px" }} container spacing={1}>
                                <Grid item xs={4}>
                                    <motion.div className={classes.SubHeading} initial="before" animate="after" variants={variants} transition={{ duration: 2, delay: 0.3 }} >
                                        <NavigateNextIcon className={classes.SubHeadingText} /> <h2 className={classes.SubHeadingText}>Letting</h2>
                                    </motion.div>

                                </Grid>
                                <Grid item xs={4}>
                                    <motion.div className={classes.SubHeading} style={{ justifyContent: "center" }} initial="before" animate="after" variants={variants} transition={{ duration: 2, delay: 0.6 }} >
                                        <NavigateNextIcon className={classes.SubHeadingText} /> <h2 className={classes.SubHeadingText}>Sales</h2>
                                    </motion.div>

                                </Grid>
                                <Grid item xs={4}>
                                    <motion.div className={classes.SubHeading} initial="before" animate="after" variants={variants} transition={{ duration: 2, delay: 0.9 }} >
                                        <NavigateNextIcon className={classes.SubHeadingText} /> <h2 className={classes.SubHeadingText}>Consultancy</h2>
                                    </motion.div>

                                </Grid>
                            </Grid>
                            <div>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                        </Grid>

                    </Grid>
                </motion.div>



            </Container>

        </div>


    );
};

export default Home