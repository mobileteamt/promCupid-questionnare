import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

import logo from "../../images/Final-Logo-PromDate.png";

const HeaderLogin = () => {
    const [isActive, setActive] = useState("false");


    const ToggleClass = () => {
        setActive(!isActive);
    };

      // when click links scroll page  top
        useEffect(() => {
            window.scrollTo(0, 0)
        }, [])

    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("authenticated");
        localStorage.removeItem("userId");
        localStorage.removeItem("danceLevel");
        localStorage.removeItem("followUpAnswerId");
        localStorage.removeItem("schoolId");
        localStorage.removeItem("promDate");
        navigate("/login");
    }

  

    return (
        <>
            <header>
                <section className="header-in">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 m-pos">
                                <Link  className="logo"> <img src={logo} alt="" title="" style={{width:"70%"}} /></Link>
                                <Link className="mobile-trigger callHdMob" onClick={ToggleClass} ><span></span></Link>
                                <Link to="callto:+(111) 65 458 856" className="callHdMob"><i className="fa-solid fa-envelope"></i></Link>
                              


                                <nav className={isActive ? "Fullmenu-bar mobile-mega-Mn rightLinks " : "Fullmenu-bar mobile-mega-Mn rightLinks mobile-open"} >
                                    <button onClick={ToggleClass} className="sidebarclose">X</button>
                                    <div className="rightLinks">
                                        <ul>


                                         
                                            <li className="SuB-fullMnDeskHov">
                                                <Link className="pinkActive user SuB-fullMnArw">Dashboard <i className="fa-regular fa-circle-user"></i></Link>
                                                <div className="SuB-fullMnDesk submenu2">
                                                    <ul className="clearfix">
                                                        <li><Link to="/profile">Profile</Link></li>

                                                        <li><a onClick={Logout}>Logout</a></li>
                                                    </ul>
                                                </div>
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
    )
}
export default HeaderLogin;