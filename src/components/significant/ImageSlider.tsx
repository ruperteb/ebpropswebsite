import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { images } from "./images";
import { makeStyles } from '@material-ui/core/styles';

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


    var locality: Maybe<string> = ""
    var aerial: Maybe<string> = ""
    var imagesArray: Maybe<string>[] = []
    var combinedArray: Maybe<string>[] = []









    const [[page, direction], setPage] = useState([0, 0]);

    const imageIndex = wrap(0, images.length, page);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);

    };

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        div: {
            height: '500px',
        },
        sliderContainerClass: {
            "position": "relative",
            height: 500,
            width: 600,
            overflow: "hidden",
            padding: 0,
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        chevronIconDivRight: {
            /* fontSize: 50, */
            display: "flex",
            height: 40,
            width: 40,
            lineHeight: 40,
            textAlign: "center",
           /*  marginLeft: "auto",
            marginRight: 10, */
            marginTop: "0px !important",
            zIndex: 2,
            /* padding: "5px", */
            
                '&:hover': { backgroundColor: "rgb(208 209 230 / 81%)", borderRadius: 30, "transition": "all .2s ease-in-out", transform: "scale(1.2)" },
            
        },
        chevronIconDivLeft: {
            /* fontSize: 50, */
            display: "flex",
            height: 40,
            width: 40,
            lineHeight: 40,
            textAlign: "center",
            /* marginLeft: 10,
            marginRight: "auto", */
            marginTop: "0px !important",
            zIndex: 2,
            /*  backgroundColor: "rgb(208 209 230 / 50%)",
             borderRadius: 30, */
            /* padding: "5px", */
            
                '&:hover': { backgroundColor: "rgb(208 209 230 / 81%)", borderRadius: 30, "transition": "all .2s ease-in-out", transform: "scale(1.2)" },
            
        },
        chevronClassRight: {
            alignSelf: 'center',
            /* marginLeft: 2, */
            color: "#000000",
            marginTop: "0 !important",
            transform: "translateX(-3px)",
            fontSize: 50,
            flexShrink: 0,
            cursor: "pointer",


        },
        chevronClassLeft: {
            alignSelf: 'center',
            /* marginLeft: 2, */
            color: "#000000",
            marginTop: "0 !important",
            transform: "translateX(-3px)",
            fontSize: 50,
            flexShrink: 0,
            cursor: "pointer",
            /* transform: "scale(-1)", */

        },
        imgStyles: {
            "position": "absolute",
            maxWidth: 600,

        }



    }));








    const classes = useStyles();







    return (
        <div className={classes.sliderContainerClass}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.img

                    className={classes.imgStyles}
                    key={page}
                    src={images[imageIndex]}
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


                </motion.img>
            </AnimatePresence>



            <div className={classes.chevronIconDivLeft} onClick={() => paginate(-1)}><ChevronLeftIcon className={classes.chevronClassLeft} /></div>
            <div className={classes.chevronIconDivRight} onClick={() => paginate(1)}><ChevronRightIcon className={classes.chevronClassRight} /></div>


        </div>

    );
};

export default ImageSlider