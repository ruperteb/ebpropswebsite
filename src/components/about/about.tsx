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

import { StickyContainer, Sticky } from 'react-sticky';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',

    },
    outerDiv: {
        width: "100vw",
        backgroundColor: "#1f304a",
        paddingTop: 236
    },
    container: {
        padding: 0,
        width: '100vw',
        backgroundColor: "#1f304a"
    },
    verticalLineContainer: {
        "&:first-child": {
            "z-index": 0
        }
    },
    verticalLine: {
        height: "3.5em",
        width: 3,
        backgroundColor: "white",
        marginTop: "1em",
        marginBottom: "1em",
    },
    verticaLineBackground: {
        width: 2,
        backgroundColor: "#ccaa66",
        marginTop: "1em",
        marginBottom: "1em",
        transform: "translateX(-2.5px)",
        zIndex: -1
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
        /* position: '-webkit-sticky', */
        position: 'sticky',
        height: "fit-content",
        top: 236,
        /* maxWidth: "calc((1288px*16.666667/100) - 8px)",
        flexBasis: "16.666667%", */
        marginBottom: 250,
        paddingLeft: 10,

    },
    leftPanelItem: {
        cursor: "pointer"
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
        textShadow: "2px 2px 5px #000000",
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

    const aboutRef = React.createRef<HTMLDivElement>()
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
        if(historyLinkRef.current && agentsLinkRef.current && servicesLinkRef.current )
        setLinkHeights({
            history: historyLinkRef.current?.getBoundingClientRect().top,
            agents: agentsLinkRef.current?.getBoundingClientRect().top,
            services: servicesLinkRef.current?.getBoundingClientRect().top
        })
    }
        , [])

    const aboutRefHeight = aboutRef.current?.getBoundingClientRect().height



    /* const [rerender, setRerender] = React.useState(false); */ // or any state
    /* const [afterRender, setAfterRender] = React.useState(false);  */// internal state

    // (1)
    React.useEffect(() => {
        /* if (!afterRender) return; */
        if (aboutRef.current)
            dispatch(navigationSlice.actions.setAboutHeight(aboutRef.current?.getBoundingClientRect().height))
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
        history: { y: "0px" },
        agents: { y: "85.547px" },
        sevices: { y: "171.094px" }
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
                window.scrollTo({ behavior: 'smooth', top: linkHeights!.agents - 150})
                break;
            case "services":
                window.scrollTo({ behavior: 'smooth', top: linkHeights!.services  - 150 })
                break;
            default:
                window.scrollTo({ behavior: 'smooth', top: linkHeights!.history  - 200 })
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
        <div ref={aboutRef} className={classes.outerDiv}>
            <StickyContainer>

                <Container ref={aboutComponentRef} maxWidth='lg' className={classes.container} id="#about">
                    <Grid container spacing={1} style={{ marginLeft: "auto", marginRight: "auto" }}>
                        <Grid container item xs={2} >
                            {/* <div className={classes.stickyLeftPanel}>test</div> */}


                            <div id="leftPanel" className={classes.stickyLeftPanel} /* style={getLeftPanelStyles()} */ /* layout={"position"} transition={{ ease: "easeOut", duration: 0.2 }} */>
                                <Grid container item >
                                    <Grid item container xs={3} className={classes.verticalLineContainer}>
                                        <motion.div className={classes.verticalLine}
                                            layout
                                            animate={getLineVariant()}
                                            /* variants={lineVariants} */
                                            transition={{ duration: 1 }}>
                                        </motion.div>
                                        <div className={classes.verticaLineBackground}></div>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <div className={classes.leftPanel}>
                                            <motion.h1 className={classes.leftPanelItem} animate={recentInView === "history" ? "selected" : "unselected"} variants={leftPanelTextVariants} transition={{ duration: 0.6 }} onClick={() => aboutPanelLinkClick("history")}>History</motion.h1>
                                            <motion.h1 className={classes.leftPanelItem} animate={recentInView === "agents" ? "selected" : "unselected"} variants={leftPanelTextVariants} transition={{ duration: 0.6 }} onClick={() => aboutPanelLinkClick("agents")}>Agents</motion.h1>
                                            <motion.h1 className={classes.leftPanelItem} animate={recentInView === "services" ? "selected" : "unselected"} variants={leftPanelTextVariants} transition={{ duration: 0.6 }} onClick={() => aboutPanelLinkClick("services")}>Services</motion.h1>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>

                        </Grid>
                        <Grid item xs={10}>
                            <div className={classes.rightPanel}>
                                <div ref={historyLinkRef}></div>
                                <motion.div ref={historyRef} className={classes.rightPanelItem}

                                    animate={historyInView ? "visible" : "hidden"}
                                    variants={rightPanelItemVariants}
                                    transition={{ duration: 1 }}>
                                    <p className={classes.textMain}>Ellis Brown Properties was formed in 1997 by brothers Mark and Sean Ellis Brown to service the commercial and industrial markets of the greater Cape Town Metropolitan and Western Cape Peninsula areas. The company is well established and has a reputation for providing thorough and professional advice. Remaining small and focused, Ellis Brown Properties aims to provide its clients with a personal, confidential, hands-on service. Its key brokers, Mark and Sean Ellis Brown, are both experienced professionals with a sound knowledge of the Cape Town and broader South African property market. The company has a comprehensive data base and its brokers have a thorough understanding of all sectors of the market.</p>
                                </motion.div>
                                <div ref={agentsLinkRef}></div>
                                <motion.div ref={agentsSeanRef} className={classes.rightPanelItem}
                                    animate={agentsSeanInView ? "visible" : "hidden"}
                                    variants={rightPanelItemVariants}
                                    transition={{ duration: 1, }}>
                                    <Grid container direction="row">
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
                                        <Grid xs={2} container item>
                                        </Grid>
                                    </Grid>
                                </motion.div>
                                <motion.div ref={agentsMarkRef} className={classes.rightPanelItem}
                                    animate={agentsMarkInView ? "visible" : "hidden"}
                                    variants={rightPanelItemVariants}
                                    transition={{ duration: 1 }}>
                                    <Grid container direction="row">
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
                                        <Grid xs={2} container item>
                                        </Grid>
                                    </Grid>
                                </motion.div>
                                <div ref={servicesLinkRef}></div>
                                <motion.div ref={servicesRef} className={classes.rightPanelItem}
                                    animate={servicesInView ? "visible" : "hidden"}
                                    variants={rightPanelItemVariants}
                                    transition={{ duration: 1 }}>
                                    <Grid container direction="row">
                                        <Grid xs={3} container item>
                                        </Grid>
                                        <Grid xs={6} container item>
                                            <p className={classes.textName}>Our expertise covers:</p>
                                        </Grid>
                                        <Grid xs={3} container item>
                                        </Grid>
                                        <Grid xs={6} container item>
                                            <Grid xs={12} direction="column" item>
                                                <motion.p className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 0.5 }}>• Commercial leasing and sales</motion.p>
                                                <motion.p className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 0.7 }}>• Industrial leasing and sales</motion.p>
                                                <motion.p className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 0.9 }}>• Investment sales</motion.p>
                                                <motion.p className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 1.1 }}>• Residential sales and letting</motion.p>
                                                <motion.p className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 1.3 }}>• Ad hoc research reports and market studies</motion.p>
                                            </Grid>
                                        </Grid>
                                        <Grid xs={5} container item>
                                            <Grid xs={12} direction="column" item>
                                                <motion.p className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 0.6 }}>• Facilitating new developments</motion.p>
                                                <motion.p className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 0.8 }}>• Site selection and evaluation</motion.p>
                                                <motion.p className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 1 }}>• Sale & lease-back negotiations</motion.p>
                                                <motion.p className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 1.2 }}>• Property development marketing</motion.p>
                                                <motion.p className={classes.textMain} variants={servicesItemVariants} transition={{ duration: 0.7, delay: 1.4 }}>• Sourcing of properties</motion.p>
                                            </Grid>
                                        </Grid>
                                        {/* <Grid xs={1} container item>
                                    </Grid> */}
                                    </Grid>
                                </motion.div>
                            </div>

                        </Grid>
                    </Grid>
                </Container>
                <div /* ref={bottomRef} */></div>
            </StickyContainer>
        </div>


    );
};

export default About