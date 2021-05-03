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
import PhoneAndroidTwoToneIcon from '@material-ui/icons/PhoneAndroidTwoTone';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';

import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform
} from "framer-motion";

import { useInView } from 'react-intersection-observer';

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';
import { AndroidTwoTone } from '@material-ui/icons';

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
        marginBottom: 200
    },
    textMain: {
        color: "white",
        fontFamily: "Dosis, sans-serif",
        fontSize: 20,
        textAlign: "left",
        lineHeight: 2,
        display: "flex",
    },
    textName: {
        color: "white",
        fontFamily: "Dosis, sans-serif",
        fontSize: 36,
        textAlign: "left",
        lineHeight: 2,
        textShadow: "6px 2px 5px #000000",
    },
    icon: {
        marginTop: "auto",
        marginBottom: "auto",
        marginRight: "20px",
    },
    link: {
        color: "#ccaa66",
        textDecoration: "none",
        "&:hover": {
            color: 'white'
        }
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

    React.useEffect(() => {
        if (ref) {
            if (ref.current) {
                /*  console.log(ref.current.getBoundingClientRect()) */
            }

        }
    }, [ref])

    const [historyRef, historyInView, historyEntry] = useInView({
        /* Optional options */
        threshold: 0,
    });

    const [agentsSeanRef, agentsSeanInView, agentsSeanEntry] = useInView({
        /* Optional options */
        threshold: 0,
    });

    const [agentsMarkRef, agentsMarkInView, agentsMarkEntry] = useInView({
        /* Optional options */
        threshold: 0,
    });

    const [servicesRef, servicesInView, servicesEntry] = useInView({
        /* Optional options */
        threshold: 0,
    });

    const variants = {
        hidden: { opacity: 0, y: "20%" },
        visible: { opacity: 1, y: "0%" },
    }

    const lineVariants = {
        history: {  y: "0px" },
        agents: { y: "85.547px" },
        sevices: {y: "171.094px" }
    }

    const [recentInView, setRecentInView] = React.useState("history")

    console.log(recentInView)

    React.useEffect (()=> {
        if(historyInView === true) {
            setRecentInView("history")
        }

        if(agentsSeanInView === true || agentsMarkInView === true ) {
            setRecentInView("agents")
        }

        if(servicesInView === true) {
            setRecentInView("services")
        }

    },[historyInView, agentsSeanInView, agentsMarkInView, servicesInView  ])

    const getLineVariant = () => {
        switch(recentInView) {
            case "history":
              return lineVariants.history
              case "agents":
                return lineVariants.agents
                case "services":
                return lineVariants.sevices
            default:
                return lineVariants.history
          }
    }

   console.log(getLineVariant())


    return (
        <div className={classes.outerDiv}>
            <Container maxWidth='lg' className={classes.container} id="#about">
                <Grid container spacing={1} style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <Grid container item xs={2}>
                        <Grid ref={ref} container item xs={scrollY > 900 ? 2 : 12} className={scrollY > 900 ? classes.stickyLeftPanel : ""}>
                            <Grid item xs={3} /* className={scrollY > 700 ? classes.stickyLine : ""} */>
                                <motion.div className={classes.verticalLine}
                                animate={getLineVariant()}
                                /* variants={lineVariants} */
                                transition={{ duration: 1 }}>
                                </motion.div>
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
                            <motion.div ref={historyRef} className={classes.rightPanelItem}
                                animate={historyInView ? "visible" : "hidden"}
                                variants={variants}
                                transition={{ duration: 1 }}>
                                <p className={classes.textMain}>Ellis Brown Properties was formed in 1997 by brothers Mark and Sean Ellis Brown to service the commercial and industrial markets of the greater Cape Town Metropolitan and Western Cape Peninsula areas. The company is well established and has a reputation for providing thorough and professional advice. Remaining small and focused, Ellis Brown Properties aims to provide its clients with a personal, confidential, hands-on service. Its key brokers, Mark and Sean Ellis Brown, are both experienced professionals with a sound knowledge of the Cape Town and broader South African property market. The company has a comprehensive data base and its brokers have a thorough understanding of all sectors of the market.</p>
                            </motion.div>
                            <motion.div ref={agentsSeanRef} className={classes.rightPanelItem}
                                animate={agentsSeanInView ? "visible" : "hidden"}
                                variants={variants}
                                transition={{ duration: 1 }}>
                                <Grid container direction="column">
                                    <Grid xs={1} container item>
                                    </Grid>
                                    <Grid xs={10} container item>
                                        <Grid xs={4} container item>
                                            <div style={{ margin: "auto" }}>
                                                <img src={Sean} alt="Sea Ellis Brown"></img>
                                            </div>

                                        </Grid>
                                        <Grid xs={8} direction="column" item>
                                            <p className={classes.textName}>Sean Ellis Brown</p>
                                            <p className={classes.textMain}>Sean holds a Bachelor of Business Science honours degree from the University of Cape Town. He is actively involved in all sectors of the market with a focus on land and investment sales, as well as office and industrial letting.</p>
                                            <p className={classes.textMain}><PhoneAndroidTwoToneIcon className={classes.icon}></PhoneAndroidTwoToneIcon> <a className={classes.link} href="tel:082 4555 183">082 4555 183</a></p>
                                            <p className={classes.textMain}><EmailTwoToneIcon className={classes.icon}></EmailTwoToneIcon> <a className={classes.link} href="mailto:sean@ellisbrown.co.za">sean@ellisbrown.co.za</a></p>
                                        </Grid>

                                    </Grid>
                                    <Grid xs={1} container item>
                                    </Grid>
                                </Grid>
                            </motion.div>
                            <motion.div ref={agentsMarkRef} className={classes.rightPanelItem}
                                animate={agentsMarkInView ? "visible" : "hidden"}
                                variants={variants}
                                transition={{ duration: 1 }}>
                                <Grid container direction="column">
                                    <Grid xs={1} container item>
                                    </Grid>
                                    <Grid xs={10} container item>
                                        <Grid xs={4} container item>
                                            <div style={{ margin: "auto" }}>
                                                <img src={Mark} alt="Mark Ellis Brown"></img>
                                            </div>

                                        </Grid>
                                        <Grid xs={8} direction="column" item>
                                            <p className={classes.textName}>Mark Ellis Brown</p>
                                            <p className={classes.textMain}>Mark has over 25 years experience in the Cape Town commercial and industrial property market with a focus on office letting, site selection and the facilitation of new developments.</p>
                                            <p className={classes.textMain}><PhoneAndroidTwoToneIcon className={classes.icon}></PhoneAndroidTwoToneIcon> <a className={classes.link} href="tel:082 449 7316">082 449 7316</a></p>
                                            <p className={classes.textMain}><EmailTwoToneIcon className={classes.icon}></EmailTwoToneIcon> <a className={classes.link} href="mailto:mark@ellisbrown.co.za">mark@ellisbrown.co.za</a></p>
                                        </Grid>

                                    </Grid>
                                    <Grid xs={1} container item>
                                    </Grid>
                                </Grid>
                            </motion.div>
                        </div>

                    </Grid>
                </Grid>
            </Container>
        </div>


    );
};

export default About