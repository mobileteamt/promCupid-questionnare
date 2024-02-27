import axios from "axios";
import constant from "../constant";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

import { useParams } from "react-router-dom";

const Verify = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);




    const { slug } = useParams();
    console.log(slug)

    useEffect(() => {
        verifyEmail();
    }, [slug]);

    const verifyEmail = async () => {
        try {
            setIsLoading(true);

            const result = await axios({
                method: "post",
                url: constant.apiUrl + "/registerUserVerify",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    student_id: slug,
                    status:1,
                },
            })
            if (result.status === 200) {
                setIsLoading(false);
                setSuccess(true);
            } else if (result.status === 203) {
                // alert("Invalid Token");
                setIsLoading(false);

                setSuccess(false);

            } else {
                setIsLoading(false);

                setSuccess(false);
            }

        } catch (error) {
            setIsLoading(false);

            setSuccess(false);

        }

    }

    return (
        <>
            <Header />
            {isLoading ? <LoadingSpinner /> :

                <section className="middle-box">
                    <section className="loginBanner" style={{ "background": "url('../images/login-banner.png') no-repeat center rgb(225 249 251)" }} >
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="loginform">
                                        {success ? <h1>Thank you for your verification of your School Email Address, You can Now login and find your Prom partner on website.</h1> :

                                            <h1>Invalid token</h1>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            }

            <Footer />
        </>
    )
}
export default Verify;
