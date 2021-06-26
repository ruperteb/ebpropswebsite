import React from 'react';
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
import Typography from '@material-ui/core/Typography';

import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform
} from "framer-motion";


import { useInView } from 'react-intersection-observer';

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';

import ImageSliderMobile from "./imageSliderMobile"
import "./significant.css"

import { imagesArray } from "./imagesArray";
import { lazyload } from '@cloudinary/html';

import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar]);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    outerDiv: {
        /*  height: '500px',
         width: 600, */
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#ffffff"
    },
    container: {
        padding: 0,
        width: '100vw',
        maxWidth: "100vw",
        height: "calc(100vh - 80px)",
        /* marginTop: 100 */
        /*  backgroundColor: "#1f304a" */
    },
    headingTextDiv: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 50,
        display: "flex",
        flexDirection: 'row'
    },
    headingText: {
        textShadow: "1px 1px 1px #00000029",
        margin: "auto"
        /* s */
    },
    imageSliderDiv: {
        marginLeft: "auto",
        marginRight: "auto",
        height: 550
    }


}));

interface Props {
    /* exampleProp: string | undefined, */
}

export const SignificantMobile: React.FC<Props> = ({ /* exampleProp, */ }) => {

    const currentPage = useAppSelector((state) => state.navigation.currentPage)
    const currentPageURL = useAppSelector((state) => state.navigation.currentPageURL)
    const scrollY = useAppSelector((state) => state.navigation.scrollY)

    const dispatch = useAppDispatch()

    const classes = useStyles();

    const [significantComponentRef, significantComponentInView, significantComponentEntry] = useInView({
        /* Optional options */
        threshold: 0.4,
    });

    React.useEffect(() => {

        if (significantComponentInView) {

            dispatch(navigationSlice.actions.setCurrentPage(2))
            dispatch(navigationSlice.actions.setCurrentPageURL("#significant"))

        }

    }, [significantComponentInView])

    const significantRef = React.createRef<HTMLDivElement>()

    React.useEffect(() => {

        if (significantRef.current)

            dispatch(navigationSlice.actions.setSignificantHeightMobile(significantRef.current?.getBoundingClientRect().height))

    }, [])


    const imageSliderVariants = {
        hidden: { opacity: 0, y: "20%" },
        visible: { opacity: 1, y: "0%" },
    }

    const significantHeadingTextVariants = {
        hidden: { opacity: 0, },
        visible: { opacity: 1, },
    }

    const [activeSlide, setActiveSlide] = React.useState(0)
    const [activeSlide2, setActiveSlide2] = React.useState(0)





    return (
        <div ref={significantComponentRef} className={classes.outerDiv}>
            <Container ref={significantRef} maxWidth='lg' className={classes.container} id="#significant">

                <motion.div
                    className={classes.headingTextDiv}
                    animate={significantComponentInView ? "visible" : "hidden"}
                    variants={significantHeadingTextVariants}
                    transition={{ duration: 1 }}>

                    <Grid container direction="row" wrap="wrap" >
                        <Typography align="center" variant="h4" className={classes.headingText}><em style={{ fontWeight: 600, marginLeft: "auto", color: "#ccaa66", fontStyle: "normal", whiteSpace: "nowrap" }}>Significant Transactions</em> concluded by <em style={{ fontWeight: 600, marginLeft: "auto", color: "#ccaa66", fontStyle: "normal", whiteSpace: "nowrap" }}>Ellis Brown Properties </em>include:</Typography>
                    </Grid>


                </motion.div>

                <motion.div
                    className={classes.imageSliderDiv}
                    animate={significantComponentInView ? "visible" : "hidden"}
                    variants={imageSliderVariants}
                    transition={{ duration: 1 }}>


                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        centeredSlides={true}
                        loop={true}
                        navigation
                        pagination={{ clickable: true }}
                        /* scrollbar={{ draggable: true }} */
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                        className="mySwiper"
                    >

                        {imagesArray.map((image, index) => {
                            return (
                                <SwiperSlide>
                                    <motion.div
                                        whileHover={{ scale: 1.025 }}
                                        whileTap={{ scale: 0.975 }}
                                        style={{ cursor: "grabbing" }}>
                                        <ImageSliderMobile index={index + 1} key={index} imageData={image}></ImageSliderMobile>
                                    </motion.div>
                                </SwiperSlide>

                            )

                        })}


                    </Swiper>



                </motion.div>




            </Container>





        </div>

    );
};

export default SignificantMobile