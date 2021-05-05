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
import Contact from "../src/components/contact/contact"



function App() {

  const currentPage = useAppSelector((state) => state.navigation.currentPage)
  const currentPageURL = useAppSelector((state) => state.navigation.currentPageURL)
  const scrollY = useAppSelector((state) => state.navigation.scrollY)

  const dispatch = useAppDispatch()

 React.useEffect(()=> {
window.scrollTo(0,0)

 },[])

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




  return (
    <div className="App">
      <Router>
        <Redirect to={{ pathname: `/${currentPageURL}`, }} />
        <Navigation  /* handlePageChange={(number) => handlePageChange(number)} */ ></Navigation>  {/* See https://github.com/facebook/react/issues/18147  for need to use callback*/}
        {/* <ReactPageScroller pageOnChange={handlePageChange}


          customPageNumber={props.currentPage}> */}

          <Home /* currentPage={props.currentPage} scrollDirection={props.scrollDirection} */></Home>
          <About /* currentPage={props.currentPage} */>

          </About>
          <Contact></Contact>
          
          

       {/*  </ReactPageScroller> */}

        <div id='container' className="appcontainer">



        </div>
      </Router>
    </div>
  );
}

export default App;
