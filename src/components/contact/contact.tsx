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

import mapboxgl, { Map } from 'mapbox-gl'

import SmallLogoCircle from "../../assets/Small-Logo-Circle.png"

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';


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
        /* width: '100vw',
        maxWidth: "100vw" */
        /*  backgroundColor: "#1f304a" */
    },
    mapContainer: {
        height: 400,
        width: 600

    },
    smallLogo: {

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

            dispatch(navigationSlice.actions.setSignificantHeight(contactRef.current?.getBoundingClientRect().height))

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
                <div ref={mapContainer} className={classes.mapContainer}></div>

            </Container>
        </div>

    );
};

export default Contact