import '../taken.css';

import { useParams } from "react-router-dom";
import HeaderLogin from "./layouts/HeaderLogin";
import Footer from "./layouts/Footer";

import axios from "axios";
import { useState, useEffect } from "react";
import constant from "../constant";
import LoadingSpinner from "./LoadingSpinner";
import moment from 'moment';
import { Link } from 'react-router-dom';


const Taken = () => {

    const { event_id } = useParams();
    const {activeprom} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [schoolName,setSchoolName]=useState("");
    const [matchingList,setMatchingList]=useState("");

    // console.log(activeprom);

    useEffect(() => {
        eventsData(true);
    }, []);

    const eventsData = async (loadingStatus) => {
        try {

            setIsLoading(loadingStatus);
            
            const result = await axios({
                method: "post",
                url: constant.apiUrl + "/takenList",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token"),
                },
                data: {
                    school_id: localStorage.getItem("schoolId"),
                    event_id: event_id,
                    dance_level_id: activeprom //localStorage.getItem("danceLevel")
                },
            })

            if (result.status === 200) {
                setSchoolName(result.data.schoolDetails[0].school_name);
                setMatchingList(result.data.data);

                setIsLoading(false);
            }
            console.log('result', result.data.schoolDetails[0].school_name);
            console.log('matching data', result.data.data);


        } catch (error) {
            console.log(error.message)
            setIsLoading(false);

        }
    };



    // console.log(matchingList);


    return (
        <>
            <HeaderLogin />
            {isLoading ? <LoadingSpinner /> :
            <section className="middle-box">

                <section className="matchead">
                    <div className="container">
                        <img src={constant.baseUrl + "images/match-heart.png"}  alt="" />
                        <h1 className="decorHeading">Look Who We Matched</h1>

                        <h3>{schoolName} </h3>
                        <p>{activeprom == 1 ? 'Senior Prom' : 'Junior Prom' } </p>
                    </div>
                </section>

                <div className="plisting ptb-50">
                <div className="container">           

                {matchingList.length > 0  ? 
                    matchingList.map((item, index) => {
                        return (
                        <div className="list_row matching_row" key={index}>
                        <div className="plist_left">
                            <div className="media">
                                <div className="media-img">
                                {item.reciever_photo ? <img src={constant.backnedBaseUrl + item.reciever_photo} alt="profilePic" />
                                  : <img src="/images/noimg.png" alt="profilePic" />}
                                  {/* <img src={constant.backnedBaseUrl + item.reciever_photo} alt="" /> */}
                                </div>
                                <div className="media-body">
                                    <h4>{item.reciever_name}</h4>
                                    <p>Senior</p>
                                </div>
                            </div>
                        </div>
                        <div className="plist_right">
                            <div className="media">
                                <div className="media-img">
                                {item.sender_photo ? <img src={constant.backnedBaseUrl + item.sender_photo} alt="profilePic" />
                                  : <img src="/images/noimg.png" alt="profilePic" />}
                                {/* <img src={constant.backnedBaseUrl + item.sender_photo} alt="" /> */}
                                </div>
                                <div className="media-body">
                                    <h4>{item.sender_name}</h4>
                                    <p>Senior</p>
                                </div>
                            </div>
                        </div>
                    </div>) 
                    })
                    :  
                    <div className="alert alert-danger alertMessage" role="alert"> No Taken Found.</div>
                }

                    {/* <div className="loading text-center ">
                        <img src="images/icons/loading.png" alt="" />
                    </div> */}
                </div>
                </div>



        </section>
        }

            <Footer />
        </>
    )
}

export default Taken;



