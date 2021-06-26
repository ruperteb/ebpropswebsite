import * as React from "react";
import { useState } from "react";

import { makeStyles } from '@material-ui/core/styles';

import { AdvancedImage, lazyload } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { format, quality } from "@cloudinary/base/actions/delivery";
import { auto } from "@cloudinary/base/qualifiers/format";
import { auto as qAuto } from "@cloudinary/base/qualifiers/quality";

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Typography from '@material-ui/core/Typography';





const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME

type Maybe<T> = T /* | null */;
type Image = {
    type: string;
    property: string;
    location: string;
    publicID: string;
    description: string
}

interface Props {
    index: number,
    imageData: Image
    /*  imagesArray: Maybe<string>[] */
}

export const ImageSliderMobile: React.FC<Props> = ({ index, imageData }) => {

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'drlfedqyz'
        }
    });



    // cld.image returns a CloudinaryImage with the configuration set.
    const myImage = cld.image(imageData.publicID);

    var width = window.innerWidth

    myImage.resize(fill().width(width).height(450)).delivery(format(auto()))
        .delivery(quality(qAuto()));


    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100vw',

        },
        div: {
            /* height: '500px', */
        },
        sliderContainerClass: {
            "position": "relative",
            /* height: 450, */
            width: "100vw",
            overflow: "hidden",
            padding: 0,
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            zIndex: 0,
            boxShadow: "rgb(0 0 0 / 4%) 0px 1px 0px, rgb(0 0 0 / 5%) 0px 2px 7px, rgb(0 0 0 / 6%) 0px 12px 22px"

        },
        imageTitleDiv: {
            zIndex: 2,
            position: "absolute",
            top: 0,
            height: 50,
            width: "100%",
            display: "flex",
            backgroundColor: "rgb(31 48 74 / 86%);"

        },
        imageTitleText: {
            color: "white",
            /* fontFamily: "Dosis, sans-serif", */
            /* fontSize: 20, */
            textAlign: "center",
            display: "flex",
            margin: "auto"
        },
        imageDescriptionDiv: {
            zIndex: 2,
            position: "absolute",
            bottom: 0,
            height: 50,
            width: "100%",
            display: "flex",
            backgroundColor: "rgb(31 48 74 / 86%);"
        },
        imageDescriptionText: {
            color: "white",
            /* fontFamily: "Dosis, sans-serif",
            fontSize: 16, */
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

            <AdvancedImage cldImg={myImage} plugins={[lazyload('10px 20px 10px 30px', 0.25)]} />

            <div className={classes.imageTitleDiv}>
                <Typography variant="body1" className={classes.imageTitleText} ><em style={{ fontStyle: "normal", color: "#ccaa66" }}>{imageData.type}: &nbsp;</em>{imageData.property}, {imageData.location}</Typography>
            </div>
            <div className={classes.imageDescriptionDiv}>
                <Typography variant="body1" className={classes.imageTitleText}>{imageData.description}</Typography>
            </div>
        </div>

    );
};

export default ImageSliderMobile