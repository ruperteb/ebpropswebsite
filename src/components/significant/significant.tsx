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

import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform
} from "framer-motion";

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';

import ImageSlider from "./ImageSlider"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    div: {
        height: '500px',
    },


}));

interface Props {
    /* exampleProp: string | undefined, */
}

export const Significant: React.FC<Props> = ({ /* exampleProp, */ }) => {

    const currentPage = useAppSelector((state) => state.navigation.currentPage)
    const currentPageURL = useAppSelector((state) => state.navigation.currentPageURL)
    const scrollY = useAppSelector((state) => state.navigation.scrollY)

    const dispatch = useAppDispatch()

    const classes = useStyles();






    return (
        <div className={classes.div}>
            <ImageSlider></ImageSlider>

        </div>

    );
};

export default Significant