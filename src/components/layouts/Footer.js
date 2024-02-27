import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../images/Final-Logo-PromDate.png";

import constant from "../../constant";

const baseURL = constant.apiUrl + "/getAllCms";

const Footer = () => {
  const [cms, setCms] = useState([]);
  const [danceData, setDanceData] = useState([]);


  useEffect(() => {
    axios.get(baseURL).then((response) => {
      //   console.log(response.data.data);
      setCms(response.data.data);
    });
  }, []);

  useEffect(() => {
    getDanceType();
  }, [])
  const navigate = useNavigate();



  const cms_titles = cms.map((cms, index) => {
    return (
      <li key={index}>
        <Link to={`/cms/${cms.slug}`}>{cms.title}</Link>
      </li>
    );
  });

  const getDanceType = async () => {
    try {
      const result = await axios({
        method: "post",
        url: constant.apiUrl + "/danceLevel",
        headers: {
          "Content-Type": "application/json",

        },
        data: {
          dance_type_id: 1,

        },
      })
      if (result.status === 200) {
        setDanceData(result.data.data);

      }
    } catch (error) {
      console.log(error.message)

    }
  }
  const promHandle = (id) => {
    //  console.log('id',id)
    localStorage.setItem("danceLevel", id)
    navigate("/steps")

  }
  return (
    <>
      <footer className="hm-bn">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-12 footer-about">
                <Link to="/" className="footer-logo">
                  <img src={logo} alt="" className="pb-35" style={{width: "67%"}} />
                </Link>


                {/* <ul>
                  <li>
                    <Link>
                      <i className="fa fa-facebook"></i>
                    </Link>{" "}
                  </li>

                  <li>
                    <Link>
                      <i className="fa fa-twitter"></i>
                    </Link>
                  </li>

                  <li>
                    <Link>
                      <i className="fa fa-linkedin"></i>
                    </Link>{" "}
                  </li>

                  <li>
                    <Link>
                      <i className="fa fa-google-plus"></i>
                    </Link>{" "}
                  </li>
                </ul>  */}
              </div>

              <div className="col-lg-3 col-md-2 col-sm-12 footer-contact">
                <h3>Links</h3>

                {!localStorage.getItem("authenticated") ?
                  <ul>
                    {danceData.map((item, index) => {

                      return (
                        <li key={index} onClick={() => promHandle(item.id)}>
                          <Link >
                            {item.level_name}
                          </Link>
                        </li>

                      )
                    })}
                  </ul>
                  : <ul>
                    {danceData.map((item, index) => {

                      return (
                        <li key={index} >
                          <Link >
                            {item.level_name}
                          </Link>
                        </li>

                      )
                    })}
                  </ul>}
              </div>

              <div className="col-lg-3 col-md-3 col-sm-12 footer-suprt">
                <h3>Help and Support</h3>

                <ul>
                  <li>
                    <Link to="/contactus">Contact Us</Link>
                  </li>

                  {cms_titles}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="">
          <div className="col-md-12 text-center footer-copyright">
            <p>
             {constant.copyRight}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
