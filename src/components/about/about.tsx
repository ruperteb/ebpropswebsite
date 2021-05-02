import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sean from "../../assets/sean.png"
import Mark from "../../assets/mark.png"
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
    outerDiv: {
        width: "100vw",
        backgroundColor: "#1f304a",
        paddingTop: 218
    },
    container: {
        padding: 0,
        width: '100vw',
        backgroundColor: "#1f304a"
    },
    verticalLine: {
        height: "3.5em",
        width: 3,
        backgroundColor: "white",
        marginTop: "0.67em",
        marginBottom: "0.67em",
    },
    stickyLine: {
        position: "fixed",
        top: 236
    },
    leftPanel: {
        display: "flex",
        flexDirection: "column",
    },
    stickyLeftPanel: {
        position: "fixed",
        top: 136,
        maxWidth: "calc((1288px*16.666667/100) - 8px)",
        flexBasis: "16.666667%",
    },
    leftPanelText: {
        color: "white"
    },
    rightPanel: {
        marginLeft: "6em",
        marginRight: "3em",

    },
    rightPanelItem: {

    },
    textMain: {
        color: "white",
        fontFamily: "Dosis, sans-serif",
        fontSize: 20,
        textAlign: "left",
        lineHeight: 2,
    }


}));

interface Props {
    /* exampleProp: string | undefined, */
}

export const About: React.FC<Props> = ({ /* exampleProp, */ }) => {

    const currentPage = useAppSelector((state) => state.navigation.currentPage)
    const currentPageURL = useAppSelector((state) => state.navigation.currentPageURL)
    const scrollY = useAppSelector((state) => state.navigation.scrollY)

    const dispatch = useAppDispatch()

    const classes = useStyles();

const ref = React.createRef<HTMLDivElement>()

React.useEffect(()=>{
    if(ref) {
        if(ref.current) {
           /*  console.log(ref.current.getBoundingClientRect()) */
        }
        
    }
},[ref])




    return (
        <div  className={classes.outerDiv}>
            <Container maxWidth='lg' className={classes.container} id="#about">
                <Grid container spacing={1} style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <Grid container item xs={2}>
                        <Grid ref={ref}  container item xs={scrollY > 900 ? 2: 12} className={scrollY > 900 ? classes.stickyLeftPanel : ""}>
                            <Grid item xs={3} /* className={scrollY > 700 ? classes.stickyLine : ""} */>
                                <motion.div className={classes.verticalLine}></motion.div>
                            </Grid>
                            <Grid item xs={9} /* className={scrollY > 700 ? classes.stickyLeftPanel : ""} */>
                                <div className={classes.leftPanel}>
                                    <h1 className={classes.leftPanelText}>History</h1>
                                    <h1 className={classes.leftPanelText}>Agents</h1>
                                    <h1 className={classes.leftPanelText}>Services</h1>
                                </div>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={10}>
                        <div className={classes.rightPanel}>
                            <div className={classes.rightPanelItem}>
                                <p className={classes.textMain}>Ellis Brown Properties was formed in 1997 by brothers Mark and Sean Ellis Brown to service the commercial and industrial markets of the greater Cape Town Metropolitan and Western Cape Peninsula areas.The company is well established and has a reputation for providing thorough and professional advice. Remaining small and focused, Ellis Brown Properties aims to provide its clients with a personal, confidential, hands-on service. Its key brokers, Mark and Sean Ellis Brown, are both experienced professionals with a sound knowledge of the Cape Town and broader South African property market. The company has a comprehensive data base and its brokers have a thorough understanding of all sectors of the market.</p>
                            </div>
                            <div className={classes.rightPanelItem}>
                                <Grid container direction="column">
                                    <Grid xs={6} container item>
                                        <Grid xs={4} item>
                                            <div>
                                                <img src={Sean} alt="Sea Ellis Brown"></img>
                                            </div>

                                        </Grid>
                                        <Grid xs={8} direction="column" item>
                                            <h5>Sean Ellis Brown</h5>
                                            <p className={classes.textMain}>Sean holds a Bachelor of Business Science honours degree from the University of Cape Town. He is actively involved in all sectors of the market with a focus on land and investment sales, as well as office and industrial letting.</p>
                                            <p>Cell: 082 455 5183</p>
                                            <p>Email: <a>sean@ellisbrown.co.za</a></p>
                                        </Grid>

                                    </Grid>
                                    <Grid xs={6} container item>

                                    </Grid>

                                </Grid>
                            </div>
                            <div className={classes.rightPanelItem}>
                                <p></p>
                            </div>
                        </div>

                    </Grid>
                </Grid>
            </Container>
        </div>


    );
};

export default About