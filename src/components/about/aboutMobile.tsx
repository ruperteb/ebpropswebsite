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
import Typography from '@material-ui/core/Typography';
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
        paddingTop: 150
    },
    container: {
        padding: 0,
        width: '100vw',
        backgroundColor: "#1f304a"
    },
    horizontalLineContainer: {
        "&:first-child": {
            "z-index": 0
        }
    },
    horizontalLine: {
        height: "4px",
        width: "6em",
        backgroundColor: "white",
        /* marginTop: "1em",
        marginBottom: "1em", */
    },
    horizontalLineBackground: {
        width: "100%",
        height: "3px",
        backgroundColor: "#ccaa66",
        /* marginTop: "1em",
        marginBottom: "1em", */
        /* transform: "translateY(-4px)", */
        zIndex: -1,
        marginTop: 3
    },
    stickyLine: {
        position: "fixed",
        top: 236
    },
    topPanel: {
        display: "flex",
        flexDirection: "row",

    },
    stickyTopPanel: {
        /* position: '-webkit-sticky', */
        position: 'sticky',
        height: "fit-content",
        top: 100,
        /* maxWidth: "calc((1288px*16.666667/100) - 8px)",
        flexBasis: "16.666667%", */
        marginBottom: "3em",
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#1f304a",
        zIndex: 5,

    },
    topPanelItem: {
        cursor: "pointer",
        fontSize: "24px"

    },
    topPanelText: {
        color: "white"
    },
    mainPanel: {
        marginLeft: "1.5em",
        marginRight: "1.5em",

    },
    mainPanelItem: {
        marginBottom: "6em"
    },
    textMain: {
        color: "white",
        /* fontFamily: "Dosis, sans-serif", */
        /* fontSize: 20, */
        textAlign: "justify",
        lineHeight: 2,
        display: "flex",
        margin: "auto",
        padding: "0.5em"
    },
    textName: {
        color: "white",
        /* fontFamily: "Dosis, sans-serif", */
        /*  fontSize: 36, */
        /* textAlign: "left", */
        lineHeight: 2,
        textShadow: "2px 2px 5px #000000",
    },
    icon: {
        marginTop: "auto",
        marginBottom: "auto",
        marginRight: "0.3em",
    },
    link: {
        color: "#ccaa66",
        textDecoration: "none",
        "&:hover": {
            color: 'white'
        }
    },
    agentImage: {
        width: "100%"
    }


}));

interface Props {
    /* exampleProp: string | undefined, */
}

export const AboutMobile: React.FC<Props> = ({ /* exampleProp, */ }) => {

    const currentPage = useAppSelector((state) => state.navigation.currentPage)
    const currentPageURL = useAppSelector((state) => state.navigation.currentPageURL)
    const scrollY = useAppSelector((state) => state.navigation.scrollY)

    const initialBottomDistance = useAppSelector((state) => state.navigation.navigationHeight + state.navigation.homeHeight + state.navigation.aboutHeight)

    const dispatch = useAppDispatch()

    const [aboutComponentRef, aboutComponentInView, aboutComponentEntry] = useInView({
        /* Optional options */
        threshold: 0.2,
    });

    React.useEffect(() => {

        if (aboutComponentInView) {

            dispatch(navigationSlice.actions.setCurrentPage(1))
            dispatch(navigationSlice.actions.setCurrentPageURL("#about"))

        }

    }, [aboutComponentInView])

    const aboutMobileRef = React.createRef<HTMLDivElement>()
    const historyLinkRef = React.createRef<HTMLDivElement>()
    const agentsLinkRef = React.createRef<HTMLDivElement>()
    const servicesLinkRef = React.createRef<HTMLDivElement>()

    type LinkHeights = {
        history: number
        agents: number
        services: number
    }
    const [linkHeights, setLinkHeights] = React.useState<LinkHeights>()
    React.useEffect(() => {
        if (historyLinkRef.current && agentsLinkRef.current && servicesLinkRef.current)
            setLinkHeights({
                history: historyLinkRef.current?.getBoundingClientRect().top,
                agents: agentsLinkRef.current?.getBoundingClientRect().top,
                services: servicesLinkRef.current?.getBoundingClientRect().top
            })
    }
        , [])

    const aboutRefHeight = aboutMobileRef.current?.getBoundingClientRect().height



    /* const [rerender, setRerender] = React.useState(false); */ // or any state
    /* const [afterRender, setAfterRender] = React.useState(false);  */// internal state

    // (1)
    React.useEffect(() => {
        /* if (!afterRender) return; */
        if (aboutMobileRef.current)
            dispatch(navigationSlice.actions.setAboutHeightMobile(aboutMobileRef.current?.getBoundingClientRect().height))
        /*  setAfterRender(false); */
    }, [/* afterRender */]);

    /* React.useEffect(() => {
        setAfterRender(true); 
        
        
    }, []);  */

    // (1) will be called after DOM rendered

    // or don't set any if you want to listen to all re-render events

    /* return {
        setRerender, // expose function trigger re-render data
    } */



    const classes = useStyles();

    /* const bottomRef = React.createRef<HTMLDivElement>() */

    /* const [bottomDistance, setBottomDistance] = React.useState<number>() */

    /* React.useEffect(() => {
        setBottomDistance(bottomRef.current?.getBoundingClientRect().y)
    }, [bottomRef]) */



    const [historyRef, historyInView, historyEntry] = useInView({
        /* Optional options */
        threshold: 0,
    });

    const [agentsSeanRef, agentsSeanInView, agentsSeanEntry] = useInView({
        /* Optional options */
        threshold: 0.4,
    });

    const [agentsMarkRef, agentsMarkInView, agentsMarkEntry] = useInView({
        /* Optional options */
        threshold: 0,
    });

    const [servicesRef, servicesInView, servicesEntry] = useInView({
        /* Optional options */
        threshold: 0.4,
    });

    const rightPanelItemVariants = {
        hidden: { opacity: 0, y: "20%" },
        visible: { opacity: 1, y: "0%" },
    }

    const servicesItemVariants = {
        hidden: { opacity: 0, y: "20%", x: -50 },
        visible: { opacity: 1, y: "0%", x: 0 },
    }

    const lineVariants = {
        history: { x: "0px" },
        agents: { x: "2em" },
        sevices: { x: "4em" }
    }

    const leftPanelTextVariants = {
        selected: { color: "#ffffff" },
        unselected: { color: "#ccaa66" },

    }

    const [recentInView, setRecentInView] = React.useState("history")

    React.useEffect(() => {
        if (historyInView === true) {
            setRecentInView("history")
        }

        if (agentsSeanInView === true || agentsMarkInView === true) {
            setRecentInView("agents")
        }

        if (servicesInView === true) {
            setRecentInView("services")
        }

    }, [historyInView, agentsSeanInView, agentsMarkInView, servicesInView])

    const getLineVariant = () => {
        switch (recentInView) {
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

    const aboutPanelLinkClick = (section: string) => {


        switch (section) {
            case "history":
                window.scrollTo({ behavior: 'smooth', top: linkHeights!.history - 200 })
                break;
            case "agents":
                window.scrollTo({ behavior: 'smooth', top: linkHeights!.agents - 200 })
                break;
            case "services":
                window.scrollTo({ behavior: 'smooth', top: linkHeights!.services - 200 })
                break;
            default:
                window.scrollTo({ behavior: 'smooth', top: linkHeights!.history - 200 })
        }
    }

    console.log(linkHeights?.history)


    /* const getLeftPanelStyles: any = () => {
        if (bottomDistance) {
            if (bottomDistance <= 735) {
                return { position: "absolute", top: initialBottomDistance! - 735, width: "calc((1288px*16.666667/100) - 8px)", flexBasis: "16.666667%", }
            } else {
                if (scrollY >= window.innerHeight) {
                    return { position: "fixed", top: 236, width: "calc((1288px*16.666667/100) - 8px)", flexBasis: "16.666667%", }
                } else return { position: "static", top: 236, width: "100%", marginBottom: "auto" }
            }
        } else return { position: "static", top: 236, width: "100%", marginBottom: "auto" }


    } */


    return (
        <div ref={aboutMobileRef} className={classes.outerDiv}>
            <Container ref={aboutComponentRef} maxWidth='lg' className={classes.container} id="#about">
                <div id="topPanel" className={classes.stickyTopPanel} /* style={getLeftPanelStyles()} */ /* layout={"position"} transition={{ ease: "easeOut", duration: 0.2 }} */>
                    <Grid container item >
                        <Grid item container xs={12} className={classes.horizontalLineContainer}>
                            <div className={classes.horizontalLineBackground}></div>
                        </Grid>
                        <Grid container xs={12}>
                            <Grid item xs={4}>
                                <motion.h1 className={classes.topPanelItem} animate={recentInView === "history" ? "selected" : "unselected"} variants={leftPanelTextVariants} transition={{ duration: 0.6 }} onClick={() => aboutPanelLinkClick("history")}>History</motion.h1>
                            </Grid>
                            <Grid item xs={4}>
                                <motion.h1 className={classes.topPanelItem} animate={recentInView === "agents" ? "selected" : "unselected"} variants={leftPanelTextVariants} transition={{ duration: 0.6 }} onClick={() => aboutPanelLinkClick("agents")}>Agents</motion.h1>
                            </Grid>
                            <Grid item xs={4}>
                                <motion.h1 className={classes.topPanelItem} animate={recentInView === "services" ? "selected" : "unselected"} variants={leftPanelTextVariants} transition={{ duration: 0.6 }} onClick={() => aboutPanelLinkClick("services")}>Services</motion.h1>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} className={classes.horizontalLineContainer}>
                            <div className={classes.horizontalLineBackground}></div>
                        </Grid>
                    </Grid>
                </div>
                <Grid container /* spacing={1} style={{ marginLeft: "auto", marginRight: "auto" }} */>

                    <Grid item xs={12}>
                        <div className={classes.mainPanel}>
                            <div ref={historyLinkRef}></div>
                            <motion.div ref={historyRef} className={classes.mainPanelItem}

                                animate={historyInView ? "visible" : "hidden"}
                                variants={rightPanelItemVariants}
                                transition={{ duration: 1 }}>
                                <Typography variant="body1" className={classes.textMain}>
                                    Ellis Brown Properties was formed in 1997 by brothers Mark and Sean Ellis Brown to service the commercial and industrial markets of the greater Cape Town Metropolitan and Western Cape Peninsula areas. The company is well established and has a reputation for providing thorough and professional advice. Remaining small and focused, Ellis Brown Properties aims to provide its clients with a personal, confidential, hands-on service. Its key brokers, Mark and Sean Ellis Brown, are both experienced professionals with a sound knowledge of the Cape Town and broader South African property market. The company has a comprehensive data base and its brokers have a thorough understanding of all sectors of the market.
                                </Typography>
                            </motion.div>
                            <div ref={agentsLinkRef}></div>
                            <motion.div ref={agentsSeanRef} className={classes.mainPanelItem}
                                animate={agentsSeanInView ? "visible" : "hidden"}
                                variants={rightPanelItemVariants}
                                transition={{ duration: 1, }}>
                                <Grid container direction="row">
                                    <Grid xs={12} container item>
                                        <Grid xs={4} container item>
                                            <div style={{ margin: "auto", }}>
                                                <img className={classes.agentImage} src={Sean} alt="Sea Ellis Brown"></img>
                                            </div>
                                        </Grid>
                                        <Grid alignItems="center" xs={8} direction="column" container>
                                            <Typography variant="h4" className={classes.textName}>Sean Ellis Brown</Typography>
                                            <div>
                                                <Typography align="left" variant="body1" className={classes.textMain}><PhoneAndroidTwoToneIcon className={classes.icon}></PhoneAndroidTwoToneIcon> <a className={classes.link} href="tel:082 4555 183">082 4555 183</a></Typography>
                                                <Typography align="left" className={classes.textMain}><EmailTwoToneIcon className={classes.icon}></EmailTwoToneIcon> <a className={classes.link} href="mailto:sean@ellisbrown.co.za">sean@ellisbrown.co.za</a></Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid xs={12} style={{ marginTop: "1em" }} container item>
                                        <Typography variant="body1" className={classes.textMain}>Sean holds a Bachelor of Business Science honours degree from the University of Cape Town. He is actively involved in all sectors of the market with a focus on land and investment sales, as well as office and industrial letting.</Typography>
                                    </Grid>
                                </Grid>
                            </motion.div>
                            <motion.div ref={agentsMarkRef} className={classes.mainPanelItem}
                                animate={agentsMarkInView ? "visible" : "hidden"}
                                variants={rightPanelItemVariants}
                                transition={{ duration: 1 }}>
                                <Grid container direction="row">
                                    <Grid xs={12} container item>
                                        <Grid xs={4} container item>
                                            <div style={{ margin: "auto" }}>
                                                <img className={classes.agentImage} src={Mark} alt="Mark Ellis Brown"></img>
                                            </div>
                                        </Grid>
                                        <Grid alignItems="center" xs={8} direction="column" container>
                                            <Typography variant="h4" className={classes.textName}>Mark Ellis Brown</Typography>
                                            <div>
                                                <Typography align="left" variant="body1" className={classes.textMain}><PhoneAndroidTwoToneIcon className={classes.icon}></PhoneAndroidTwoToneIcon> <a className={classes.link} href="tel:082 449 7316">082 449 7316</a></Typography>
                                                <Typography align="left" className={classes.textMain}><EmailTwoToneIcon className={classes.icon}></EmailTwoToneIcon> <a className={classes.link} href="mailto:mark@ellisbrown.co.za">mark@ellisbrown.co.za</a></Typography>
                                            </div>
                                        </Grid>

                                    </Grid>
                                    <Grid xs={12} style={{ marginTop: "1em" }} container item>
                                        <Typography variant="body1" className={classes.textMain}>Mark has over 25 years experience in the Cape Town commercial and industrial property market with a focus on office letting, site selection and the facilitation of new developments.</Typography>
                                    </Grid>
                                </Grid>
                            </motion.div>
                            <div ref={servicesLinkRef}></div>
                            <motion.div ref={servicesRef} className={classes.mainPanelItem}
                                animate={servicesInView ? "visible" : "hidden"}
                                variants={rightPanelItemVariants}
                                transition={{ duration: 1 }}>
                                <Grid container direction="row">
                                    <Grid xs={1} item>
                                    </Grid>
                                    <Grid xs={10} alignItems="center" item style={{marginBottom: "2em"}}>
                                        <Typography align="center" variant="h4" className={classes.textName}>Our expertise covers:</Typography>
                                    </Grid>
                                    <Grid xs={1} item>
                                    </Grid>
                                    <Grid xs={12} container item>
                                        <Grid xs={12} direction="row" container>
                                            <motion.p style={{textAlign: "center"}} className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 0.5 }}>•&nbsp; Commercial leasing and sales</motion.p>
                                            <motion.p style={{textAlign: "center"}} className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 0.6 }}>•&nbsp; Industrial leasing and sales</motion.p>
                                            <motion.p style={{textAlign: "center"}} className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 0.7 }}>•&nbsp; Investment sales</motion.p>
                                            <motion.p style={{textAlign: "center"}} className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 0.8 }}>•&nbsp; Residential sales and letting</motion.p>
                                            <motion.p style={{textAlign: "center"}} className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 0.9 }}>•&nbsp; Ad hoc research reports and market studies</motion.p>
                                            <motion.p style={{textAlign: "center"}} className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 1 }}>•&nbsp; Facilitating new developments</motion.p>
                                            <motion.p style={{textAlign: "center"}} className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 1.1 }}>•&nbsp; Site selection and evaluation</motion.p>
                                            <motion.p style={{textAlign: "center"}} className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 1.2 }}>•&nbsp; Sale & lease-back negotiations</motion.p>
                                            <motion.p style={{textAlign: "center"}} className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 1.3 }}>•&nbsp; Property development marketing</motion.p>
                                            <motion.p style={{textAlign: "center"}} className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 1.4 }}>•&nbsp; Sourcing of properties</motion.p>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </motion.div>
                        </div>

                    </Grid>
                </Grid>
            </Container>
            <div /* ref={bottomRef} */></div>
        </div>


    );
};

export default AboutMobile