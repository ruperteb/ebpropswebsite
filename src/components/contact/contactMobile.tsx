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

import "./contact.css"


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
        width: "100vw",
        /*  height: "calc(100vh - 80px)", */
        marginTop: 50
    },
    mapContainer: {
        marginTop: 50,
        display: "flex",
        height: "50vh",
        width: "100vw",
        marginRight: "auto",
        marginLeft: "auto",
        position: "relative",
        bottom: 0,
        /*   zIndex: -20 */
    },
    smallLogo: {
       /*  height: 500,
        width: 500, */
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
        marginTop: 50,
        marginBottom: 50,
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
        marginLeft: "3em",
        marginTop: "1em",
        marginBottom: "1em",
    },
    icon: {
        marginTop: "auto",
        marginBottom: "auto",
        marginRight: "1em",
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

export const ContactMobile: React.FC<Props> = ({ /* exampleProp, */ }) => {

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

    var markerNode = document.createElement('div');
    markerNode.className = 'marker';

    mapboxgl.accessToken = "pk.eyJ1IjoicnVwZXJ0ZWIiLCJhIjoiY2twMTVmbTlhMG1xdjJubnZzaGhzazg5NyJ9.z2JuLFrv8x1JxH53M68DDA"

    const map = useRef<any>(null);
    const mapContainer = useRef<any>(null);
    const marker = useRef<any>(null);

    console.log(mapContainer.current)

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
            marker.current = new mapboxgl.Marker(/* markerNode */).setLngLat([18.456395487102565, -33.97304626926719]).addTo(map.current)
        ReactDOM.render(EBLogoMarker(), markerNode);

    }, [contactComponentInView])


    return (
        <div ref={contactComponentRef} className={classes.outerDiv}>
            <Container ref={contactRef} maxWidth='lg' className={classes.container} id="#contact">
                <Grid container>
                    <Grid container xs={12} >
                        <div className={classes.contactMainHeadingDiv}>
                            <h1 className={classes.contactMainHeading}>Contact Us</h1>
                        </div>

                    </Grid>
                    <Grid container xs={12} >

                        <Grid container xs={12} alignItems="center" direction={'column'}>
                            <div>
                                <h1 className={classes.contactHeading} style={{ marginTop: 0 }}>General Enquiries</h1>
                                <p className={classes.contactText}><PhoneAndroidTwoToneIcon className={classes.icon}></PhoneAndroidTwoToneIcon> <a className={classes.link} href="tel:082 4555 183">021 686 3160</a></p>
                                <p className={classes.contactText}><EmailTwoToneIcon className={classes.icon}></EmailTwoToneIcon> <a className={classes.link} href="mailto:sean@ellisbrown.co.za">info@ellisbrown.co.za</a></p>
                            </div>
                        </Grid>

                        <Grid container xs={12} alignItems="center" direction={'column'}>
                            <div>
                                <h1 className={classes.contactHeading}>Sean Ellis Brown</h1>
                                <p className={classes.contactText}><PhoneAndroidTwoToneIcon className={classes.icon}></PhoneAndroidTwoToneIcon> <a className={classes.link} href="tel:082 4555 183">082 4555 183</a></p>
                                <p className={classes.contactText}><EmailTwoToneIcon className={classes.icon}></EmailTwoToneIcon> <a className={classes.link} href="mailto:sean@ellisbrown.co.za">sean@ellisbrown.co.za</a></p>
                            </div>
                        </Grid>

                        <Grid container xs={12} alignItems="center" direction={'column'}>
                            <div>
                                <h1 className={classes.contactHeading}>Mark Ellis Brown</h1>
                                <p className={classes.contactText}><PhoneAndroidTwoToneIcon className={classes.icon}></PhoneAndroidTwoToneIcon> <a className={classes.link} href="tel:082 449 7316">082 449 7316</a></p>
                                <p className={classes.contactText}><EmailTwoToneIcon className={classes.icon}></EmailTwoToneIcon> <a className={classes.link} href="mailto:mark@ellisbrown.co.za">mark@ellisbrown.co.za</a></p>
                            </div>
                        </Grid>

                    </Grid>
                    <Grid container xs={12} >

                    </Grid>


                </Grid>


            </Container>
            <div id="mapContainer" ref={mapContainer} className={classes.mapContainer}></div>
        </div>

    );
};

export default ContactMobile