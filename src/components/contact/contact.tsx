import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
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

import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform
} from "framer-motion";

import { useInView } from 'react-intersection-observer';
// @ts-ignore
import mapboxgl, { Map } from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax

import SmallLogoCircle from "../../assets/Small-Logo-Circle.png"

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';

import PhoneAndroidTwoToneIcon from '@material-ui/icons/PhoneAndroidTwoTone';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    outerDiv: {
        /*  height: '500px',
         width: 600, */
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#1f304a"
    },
    container: {
        padding: 0,
        maxWidth: "100vw",
        height: "calc(100vh - 165px)",
        marginTop: 100
    },
    mapContainer: {
        display: "flex",
        height: "55vh",
        width: "40vw",
        margin: "auto"
    },
    smallLogo: {

    },
    contactMainHeading: {
        display: "flex",
        color: "#ccaa66",
        margin: 10,
        marginTop: 0,
        fontSize: "3em",
        textShadow: "2px 2px 2px #000000",
    },
    contactMainHeadingDiv: {
        width: "fit-content",
        display: "flex",
        color: "#ccaa66",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "2em",
        marginBottom: "2em",
        border: "5px solid #ccaa66",


    },
    contactHeading: {
        display: "flex",
        color: "#ccaa66",
        marginBottom: 10,
        textShadow: "2px 2px 2px #000000",
    },
    contactText: {
        display: "flex",
        color: "white",
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
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
    },
    footer : {
        maxWidth: "100vw",
        height: 80,
        backgroundColor: "#ccaa66",
        boxShadow: "-1px -1px 3px 2px #0000003d",
    },
    footerText: {
        color: "#ffffff",
        textShadow: "1px 1px 2px black",
    }

}));


interface Props {
    /* exampleProp: string | undefined, */
}

export const Contact: React.FC<Props> = ({ /* exampleProp, */ }) => {

    const currentPage = useAppSelector((state) => state.navigation.currentPage)
    const currentPageURL = useAppSelector((state) => state.navigation.currentPageURL)
    const scrollY = useAppSelector((state) => state.navigation.scrollY)

    const dispatch = useAppDispatch()

    const classes = useStyles();

    const [contactComponentRef, contactComponentInView, contactComponentEntry] = useInView({
        /* Optional options */
        threshold: 0.4,
    });

    React.useEffect(() => {

        if (contactComponentInView) {

            dispatch(navigationSlice.actions.setCurrentPage(3))
            dispatch(navigationSlice.actions.setCurrentPageURL("#contact"))

        }

    }, [contactComponentInView])

    const contactRef = React.createRef<HTMLDivElement>()

    React.useEffect(() => {

        if (contactRef.current)

            dispatch(navigationSlice.actions.setContactHeight(contactRef.current?.getBoundingClientRect().height))

    }, [])

    const EBLogoMarker = () => {

        const smallLogoVariants = {
            hidden: { opacity: 0, y: "20%", scale: 0.15 },
            visible: { opacity: 1, y: "0%", scale: 0.15 },
        }
        return (
            <motion.img
                animate={{ scale: 0.15, opacity: 1, y: 0 }}
                transition={{ duration: 1 }} style={{ opacity: 0, scale: 0.15, y: "-20%" }} className={classes.smallLogo} src={SmallLogoCircle}></motion.img>
        )
    }

    const markerNode = document.createElement('div');

    mapboxgl.accessToken = "pk.eyJ1IjoicnVwZXJ0ZWIiLCJhIjoiY2twMTVmbTlhMG1xdjJubnZzaGhzazg5NyJ9.z2JuLFrv8x1JxH53M68DDA"

    const map = useRef<any>(null);
    const mapContainer = useRef<any>(null);
    const marker = useRef<any>(null);

    useEffect(() => {
        if (mapContainer.current) {
            map.current = new Map({
                container: mapContainer.current,
                center: [18.456395487102565, -33.97304626926719],
                zoom: 15,
                style: 'mapbox://styles/mapbox/streets-v11',
            })
        }
    }, [])

    useEffect(() => {
        if (marker.current)
            marker.current.remove()
        if (contactComponentInView == true)
            marker.current = new mapboxgl.Marker(markerNode).setLngLat([18.456395487102565, -33.97304626926719]).addTo(map.current)
        ReactDOM.render(EBLogoMarker(), markerNode);

    }, [contactComponentInView])


    return (
        <div ref={contactComponentRef} className={classes.outerDiv}>
            <Container ref={contactRef} maxWidth='lg' className={classes.container} id="#contact">
                <Grid container>
                    <Grid container xs={12} item>
                        <div className={classes.contactMainHeadingDiv}>
                            <h1 className={classes.contactMainHeading}>Contact Us</h1>
                        </div>

                    </Grid>
                    <Grid container xs={6} item>
                        <Grid container xs={5} item></Grid>
                        <Grid container xs={7} item direction={'column'}>
                            <h1 className={classes.contactHeading} style={{ marginTop: 0 }}>General Enquiries</h1>
                            <p className={classes.contactText}><PhoneAndroidTwoToneIcon className={classes.icon}></PhoneAndroidTwoToneIcon> <a className={classes.link} href="tel:082 4555 183">021 686 3160</a></p>
                            <p className={classes.contactText}><EmailTwoToneIcon className={classes.icon}></EmailTwoToneIcon> <a className={classes.link} href="mailto:sean@ellisbrown.co.za">info@ellisbrown.co.za</a></p>
                        </Grid>
                        <Grid container xs={5} item></Grid>
                        <Grid container xs={7} item direction={'column'}>
                            <h1 className={classes.contactHeading}>Sean Ellis Brown</h1>
                            <p className={classes.contactText}><PhoneAndroidTwoToneIcon className={classes.icon}></PhoneAndroidTwoToneIcon> <a className={classes.link} href="tel:082 4555 183">082 4555 183</a></p>
                            <p className={classes.contactText}><EmailTwoToneIcon className={classes.icon}></EmailTwoToneIcon> <a className={classes.link} href="mailto:sean@ellisbrown.co.za">sean@ellisbrown.co.za</a></p>
                        </Grid>
                        <Grid container xs={5} item></Grid>
                        <Grid container xs={7} item direction={'column'}>
                            <h1 className={classes.contactHeading}>Mark Ellis Brown</h1>
                            <p className={classes.contactText}><PhoneAndroidTwoToneIcon className={classes.icon}></PhoneAndroidTwoToneIcon> <a className={classes.link} href="tel:082 449 7316">082 449 7316</a></p>
                            <p className={classes.contactText}><EmailTwoToneIcon className={classes.icon}></EmailTwoToneIcon> <a className={classes.link} href="mailto:mark@ellisbrown.co.za">mark@ellisbrown.co.za</a></p>
                        </Grid>

                    </Grid>
                    <Grid container xs={6} item>
                        <Grid container xs={8} item>
                            <div ref={mapContainer} className={classes.mapContainer}></div>
                        </Grid>
                        <Grid container xs={4} item></Grid>
                    </Grid>
                </Grid>
            </Container>
            <Container className={classes.footer}>
                <Grid style={{padding: "1em"}} container>
                    <Grid item xs={12} >
                        <Typography className={classes.footerText}>Ellis Brown Properties (Pty) Ltd ▪ Reg No. 1997/002190/07 ▪ Directors: MR Ellis Brown, SM Ellis Brown</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.footerText}>4 Apple Lane, Newlands, Cape Town, 7700</Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>

    );
};

export default Contact