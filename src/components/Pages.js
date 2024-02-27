import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

import axios from "axios";


import constant from "../constant";

const baseURL = constant.apiUrl + "/getAllCms";



const Pages = () => {

  const { slug } = useParams();

  const [cms, setCms] = useState([]);



  useEffect(() => {

    axios.get(baseURL).then((response) => {

      // console.log(response.data.data);

      const cms = response.data.data.filter(

        (single_cms) => single_cms.slug === slug

      );

      //   console.log(cms[0]);

      setCms(cms[0]);

    });

  }, [slug]);

  return (

    <>

      <section className="tab-padd padBn" style={{padding:"10px 0"}}>

        <div className="container">

          <div

            className="cms"

            dangerouslySetInnerHTML={{ __html: cms.content }}

          />

        </div>

      </section>

    </>

  );

};



export default Pages;

