import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import constant from "../constant";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

const baseURL = constant.apiUrl + "/getAllCms";

const Cms = () => {
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
      <Header />

      <section className="tab-padd padBn">
        <div className="container">
          <div
            className="cms"
            dangerouslySetInnerHTML={{ __html: cms.content }}
          />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Cms;
