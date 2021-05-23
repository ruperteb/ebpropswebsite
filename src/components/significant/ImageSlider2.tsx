import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { imagesArray } from "./imagesArray";
import { makeStyles } from '@material-ui/core/styles';

import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/base";
import { pad } from "@cloudinary/base/actions/resize";

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME

type Maybe<T> = T /* | null */;

interface Props {
    /* propertyId: number, */
    /*  imagesArray: Maybe<string>[] */
}

export const ImageSlider: React.FC<Props> = ({ /* propertyId */ }) => {

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'drlfedqyz'
        }
    });




    /* var locality: Maybe<string> = ""
    var aerial: Maybe<string> = ""
    var imagesArray: Maybe<string>[] = []
    var combinedArray: Maybe<string>[] = [] */









    const [[page, direction], setPage] = useState([0, 0]);

    const imageIndex = wrap(0, imagesArray.length, page);

    // cld.image returns a CloudinaryImage with the configuration set.
    const myImage = cld.image(imagesArray[imageIndex].publicID);

    myImage.resize(pad().width(800).height(600));


    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);

    };

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100vw',

        },
        div: {
            /* height: '500px', */
        },
        sliderContainerClass: {
            "position": "relative",
            height: 600,
            width: 800,
            overflow: "hidden",
            padding: 0,
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            zIndex: 0,
        },
        imageTitleDiv: {
            zIndex: 2,
            position: "absolute",
            top: 0,
            height: 50,
            width: "100%",
            display: "flex",
            backgroundColor: "rgb(208 209 230 / 81%)"

        },
        imageTitleText: {
            color: "black",
            fontFamily: "Dosis, sans-serif",
            fontSize: 20,
            textAlign: "center",
            display: "flex",
            marginTop: "auto",
            marginBottom: "auto",
        },
        imageDescriptionDiv: {
            zIndex: 2,
            position: "absolute",
            bottom: 0,
            height: 50,
            width: "100%",
            display: "flex",
            backgroundColor: "rgb(208 209 230 / 81%)"
        },
        imageDescriptionText: {
            color: "black",
            fontFamily: "Dosis, sans-serif",
            fontSize: 16,
            textAlign: "center",
            display: "flex",
            marginTop: "auto",
            marginBottom: "auto",
        },
        chevronIconDivRight: {
            /* fontSize: 50, */
            /*  display: "flex", */
            /*  height: 40,
             width: 40, */
            lineHeight: 40,
            textAlign: "center",
            /* marginLeft: "auto",
            marginRight: 10,
            marginTop: "0px !important", */
            zIndex: 2,
            position: "absolute",
            right: 0,
            cursor: "pointer",
            /* padding: "5px", */

            '&:hover': { backgroundColor: "rgb(204 170 102 / 71%)", borderRadius: 30, "transition": "all .2s ease-in-out", transform: "scale(1.2)" },

        },
        chevronIconDivLeft: {
            /* fontSize: 50, */
            /* display: "flex", */
            /* height: 40,
            width: 40, */
            lineHeight: 40,
            textAlign: "center",
            /*  marginLeft: 10,
             marginRight: "auto",
             marginTop: "0px !important", */
            zIndex: 2,
            position: "absolute",
            left: 0,
            cursor: "pointer",
            /*  backgroundColor: "rgb(208 209 230 / 50%)",
             borderRadius: 30, */
            /* padding: "5px", */

            '&:hover': { backgroundColor: "rgb(204 170 102 / 71%)", borderRadius: 30, "transition": "all .2s ease-in-out", transform: "scale(1.2)" },

        },
        chevronClassRight: {
            alignSelf: 'center',
            /* marginLeft: 2, */
            color: "#000000",
            marginTop: "0 !important",
            /* transform: "translateX(-3px)", */
            fontSize: 50,
            flexShrink: 0,
            cursor: "pointer",


        },
        chevronClassLeft: {
            alignSelf: 'center',
            /* marginLeft: 2, */
            color: "#000000",
            marginTop: "0 !important",
            /* transform: "translateX(-3px)", */
            fontSize: 50,
            flexShrink: 0,
            cursor: "pointer",
            /* transform: "scale(-1)", */

        },
        imgStyles: {
            "position": "absolute",
            /* height: 600,
            width: 800, */

        }



    }));








    const classes = useStyles();


    const constraintsRef = React.useRef(null)




    return (
        <div ref={constraintsRef} className={classes.sliderContainerClass}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div

                    className={classes.imgStyles}
                    key={page}
                    /* src={images[imageIndex]} */
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                >

                    {/*  <Image cloudName={CLOUD_NAME} publicId={combinedArray[imageIndex]} width="600" height="400" crop="fill_pad" gravity="auto" /> */}
                    <AdvancedImage cldImg={myImage} />

                </motion.div>
            </AnimatePresence>

            <div className={classes.imageTitleDiv}>
                <p className={classes.imageTitleText} style={{ marginLeft: "auto", marginRight: 8, fontWeight: 800 }}>{imagesArray[imageIndex].type}:</p>
                <p className={classes.imageTitleText} style={{ transform: "translateY(2px)", marginRight: 8, }}>{imagesArray[imageIndex].property},</p>
                <p className={classes.imageTitleText} style={{ marginRight: "auto", transform: "translateY(2px)" }}>{imagesArray[imageIndex].location}</p>
            </div>
            <div className={classes.imageDescriptionDiv}>
                <p className={classes.imageTitleText} style={{ marginLeft: "auto", marginRight: "auto", /* fontWeight: 800 */ }}>{imagesArray[imageIndex].description}</p>
            </div>



            <div className={classes.chevronIconDivLeft} onClick={() => paginate(-1)}><ChevronLeftIcon className={classes.chevronClassLeft} /></div>
            <div className={classes.chevronIconDivRight} onClick={() => paginate(1)}><ChevronRightIcon className={classes.chevronClassRight} /></div>


        </div>

    );
};

export default ImageSlider