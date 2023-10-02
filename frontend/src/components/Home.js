import { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layouts/Loader";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "react-js-pagination";



function Home() {

    return (
      <>

            <MetaData title={'Buy Best Products'}/>

            

       </>
      );
}

export default Home;