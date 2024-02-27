import { useState, useEffect } from "react";
import axios from "axios";
import constant from "../constant";
import Header from "./layouts/Header"
import Footer from "./layouts/Footer"
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CometChat } from "@cometchat-pro/chat";


const Login = () => {
    const [passwordType, setPasswordType] = useState("password");

    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const { email, password } = data;
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("authenticated");
        localStorage.removeItem("userId");
        localStorage.removeItem("danceLevel");
        localStorage.removeItem("followUpAnswerId");
        localStorage.removeItem("schoolId");
        localStorage.removeItem("promDate");
        localStorage.removeItem("questionStatus");


    }, [])


    const changeHandler = e => {
        setData({ ...data, [e.target.name]: [e.target.value] });
    }

    const submitHandler = async e => {
        e.preventDefault();
        try {
            const loginData = await axios({
                method: "post",
                url: constant.apiUrl + "/weblogin",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    email: data.email,
                    password: data.password

                },
            })
            if (loginData.status === 200) {
                console.log('data', loginData.data)
                localStorage.setItem("token", loginData.data.token);
                localStorage.setItem("authenticated", true);
                localStorage.setItem("userId", loginData.data.data.id);
                localStorage.setItem("schoolId", loginData.data.data.school_id);
                localStorage.setItem("danceLevel", loginData.data.data.dance_level_id);
                localStorage.setItem("questionStatus", loginData.data.questionStatus);
                if (loginData.data.promDateStatus === 1) {
                    localStorage.setItem("promDate", true);
                }

                if (localStorage.getItem("questionStatus") === "1") {
                    navigate("/stepsTwo");
                } else if (localStorage.getItem("questionStatus") === "2") {
                    navigate("/profile");
                } else {
                    navigate("/profile");
                }

                // Chat User Login
                console.log(loginData.data.data.user_chatid);
                
                let authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY;
                console.log(authKey);
                CometChat.login(loginData.data.data.user_chatid, authKey).then(
                    (user) => {
                      console.log("Login Successful:", { user });
                    },
                    (error) => {
                      console.log("Login failed with exception:", { error });
                    }
                  );
                // Chat Code END
            }
        } catch (error) {
            if (error.response.status === 401) {

                toast('Invalid Credential !', {
                    position: toast.POSITION.TOP_CENTER
                });
            } else {
                alert(error.message)
            }
        }

    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }



    return (
        <>
            <Header />
            <section className="middle-box">
                <section className="loginBanner" style={{ "background": "url('./images/login-banner.png') no-repeat center rgb(225 249 251)" }} >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="loginform">
                                    <h1>Login</h1>
                                    <form onSubmit={submitHandler}>
                                        <div className="input-group">
                                            <div className="input-group-prepend prep">
                                                <span className="input-group-text">
                                                    <img src="images/icons/msg.png" alt="" />
                                                </span>
                                            </div>
                                            <input type="email" placeholder="enter email address" className="form-control" name="email" value={email} onChange={changeHandler} required />

                                        </div>
                                        <div className="input-group passinp">
                                            <div className="input-group-prepend prep">
                                                <span className="input-group-text">
                                                    <img src="images/icons/key.png" alt="" />
                                                </span>
                                            </div>
                                            <input type={passwordType} placeholder="enter password" className="form-control" name="password" value={password} onChange={changeHandler} required />
                                            <div className="input-group-append appe" onClick={togglePassword}>

                                                <span className="input-group-text">
                                                    {passwordType === "password" ? <i className="fa fa-eye-slash" aria-hidden="true"></i>
                                                        : <i className="fa fa-eye" aria-hidden="true"></i>
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className="remforg">
                                            
                                        </div>
                                        <div className="logbtnsec">
                                            <div className="noac">
                                                <h6>No account?<Link to="/">SignUp</Link></h6>
                                            </div>
                                            <div className="logbtn_in">
                                                <button className="btn get-qouts-btn" type="submit">Login</button>
                                            </div>
                                        </div>
                                    </form>
                                    <ToastContainer toastStyle={{ backgroundColor: "#e13194", color: "white", fontWeight: "bold" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </section>
            <Footer />
        </>
    )
}

export default Login;