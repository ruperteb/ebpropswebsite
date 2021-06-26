import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { useAppSelector, useAppDispatch } from './redux/hooks'
import './App.css';
import { navigationSlice } from './redux/slices/navigationSlice';

import Navigation from "../src/components/navigation/navigation"
import Home from "../src/components/home/home"
import About from "../src/components/about/about"
import Significant from "../src/components/significant/significant"
import Contact from "../src/components/contact/contact"

import NavigationMobile from "../src/components/navigation/navigationMobile"
import HomeMobile from "../src/components/home/homeMobile"
import AboutMobile from "../src/components/about/aboutMobile"
import SignificantMobile from "../src/components/significant/significantMobile"
import ContactMobile from "../src/components/contact/contactMobile"


import useMediaQuery from '@material-ui/core/useMediaQuery';

import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';



function App() {

  const currentPage = useAppSelector((state) => state.navigation.currentPage)
  const currentPageURL = useAppSelector((state) => state.navigation.currentPageURL)
  const scrollY = useAppSelector((state) => state.navigation.scrollY)

  const dispatch = useAppDispatch()


  type ComponentHeights = {
    navigation: number
    home: number
    about: number
    featured: number
    contact: number
  }

  const [componentHeights, setComponentHeights] = React.useState<ComponentHeights>({
    navigation: 0,
    home: 0,
    about: 0,
    featured: 0,
    contact: 0,
  })

  const matches = useMediaQuery('(min-width:1280px)');


  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);

  if (matches)

    return (
      <div className="App">
        <Router>
          <Redirect to={{ pathname: `/${currentPageURL}`, }} />

          <Navigation></Navigation>
          <Home></Home>
          <About></About>
          <Significant></Significant>
          <Contact></Contact>

        </Router>
      </div>
    );

  else return (
    <div className="App">
      <Router>
        <Redirect to={{ pathname: `/${currentPageURL}`, }} />
        <ThemeProvider theme={theme}>
          <NavigationMobile></NavigationMobile>
          <HomeMobile></HomeMobile>
          <AboutMobile></AboutMobile>
          <SignificantMobile></SignificantMobile>
          <ContactMobile></ContactMobile>
        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App;
