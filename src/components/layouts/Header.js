import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import constant from "../../constant";

import logo from "../../images/Final-Logo-PromDate.png";

const baseURL = constant.apiUrl + "/getArticles";

const Header = () => {
  const [isActive, setActive] = useState("false");
  const [articles, setArticles] = useState([]);
  const ToggleClass = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      //   console.log(response.data.data);
      setArticles(response.data.data);
    });
  }, []);

  // when click links scroll page  top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])



  const articles_titles = articles.map((article, index) => {
    
    return (
      <li key={index} onClick={ToggleClass}>
        <Link to={`/article/${article.slug}`} >{article.title}</Link>
      </li>
    );
  });

  //   console.log(articles_titles);

  return (
    <>
      <header>
        <section className="header-in">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 m-pos">
                <Link to="/" className="logo">
                  <img src={logo} alt="" title="" style={{width: "67%"}} />
                </Link>

                <Link
                  className="mobile-trigger callHdMob"
                  onClick={ToggleClass}
                >
                  <span></span>
                </Link>

                <Link to="/contactus" className="callHdMob">
                <i className="fa-solid fa-envelope"></i>
                </Link>

                <nav
                  className={
                    isActive
                      ? "Fullmenu-bar mobile-mega-Mn rightLinks "
                      : "Fullmenu-bar mobile-mega-Mn rightLinks mobile-open"
                  }
                >
                  <button onClick={ToggleClass} className="sidebarclose">
                    X
                  </button>

                  <div className="rightLinks">
                    <ul>
                      {/* <li className="SuB-fullMnDeskHov">
                        <Link className="SuB-fullMnArw">Prom Articles</Link>
                        <div className="SuB-fullMnDesk artmenu">
                          <h2>Prom Articles</h2>
                          <ul className="clearfix">{articles_titles}</ul>
                        </div>
                      </li> */}
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    </ul>
                  </div>
                </nav>

                <Link className="mobile-trigger-c">Back</Link>
              </div>
            </div>
          </div>
        </section>
      </header>
    </>
  );
};

export default Header;
