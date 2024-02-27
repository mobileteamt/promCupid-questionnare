import Header from "./layouts/Header"
import Footer from "./layouts/Footer"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import constant from "../constant";
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";


const Home = () => {
    const [danceData, setDanceData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectDance, setSelectDance] = useState(1);
    useEffect(() => {
        getDanceType(); 
    }, [])
    const navigate = useNavigate();

    const getDanceType = async () => {
        try {
            setIsLoading(true);
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
                setIsLoading(false);

            }
        } catch (error) {
            console.log(error.message)
            setIsLoading(false);

        }
    }
    const promHandle = (id) => {
        //    console.log('id',id)
        localStorage.setItem("danceLevel", id)
        navigate("/steps")

    }

    const promDanaceHandle = (e) => {
        e.preventDefault();
        console.log('dancelevel', selectDance)

        localStorage.setItem("danceLevel", selectDance)
        navigate("/steps")

    }

    return (
        <>
            <Header />
            {isLoading ? <LoadingSpinner /> :

                <section className="middle-box">

                    <section className="conmBox get-free-quotes-tp-sec">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <h1 className="moveUp">The Safe and Easy way to<br /> <b className="midTxt">find a date</b> to your school dance. <span>Find your perfect match for the perfect night. <br />Choose a dance type to get started:</span></h1>
                                    <ul>
                                        {danceData.map((item, index) => {

                                            return (
                                                <li key={index} onClick={() => promHandle(item.id)}>
                                                    <Link >
                                                        <h3>{item.level_name}</h3>
                                                        <div className="icon-bx icon-bx-01"> <img src={constant.backnedBaseUrl + "public/" + item.icon_url} alt="" /></div>
                                                    </Link>
                                                </li>

                                            )
                                        })}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="conmBox sec-padd how-it-works-sec">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 text-center pb-80">
                                    <h2>How it works.</h2>
                                </div>

                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <div className="d-flex flex-column works_bx pad-left25">
                                        <div><img src="/images/how-it-works-icon-01.png" alt="" /></div>
                                        <h5> Answer Quick <br />Questions.</h5>
                                        <p>We'll ask you about yourself and what you are looking for in your date to the dance.</p>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <div className="d-flex flex-column works_bx">
                                        <div><img src="/images/how-it-works-icon-02.png" alt="" /></div>
                                        <h5> We Analyze your answers.</h5>
                                        <p>We'll filter through your classmates and give you your percentage of match with each person.</p>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <div className="d-flex flex-column works_bx pad-right25">
                                        <div><img src="/images/how-it-works-icon-03.png" alt="" /></div>
                                        <h5> Connect with your matches. </h5>
                                        <p>Message them on the app to find your perfect match! </p>
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

export default Home;