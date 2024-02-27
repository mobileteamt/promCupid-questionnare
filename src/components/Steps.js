import { CometChat } from "@cometchat-pro/chat";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import constant from "../constant";
import '../Step.css';
import Success from "./Success";
import LoadingSpinner from "./LoadingSpinner";



const Steps = () => {
    const [question, setQuestion] = useState([]);
    const [questionanswer, setQuestionAnswer] = useState([]);
    const [stepQuestion, setStepQuestion] = useState(0);

    const [stepOne, setStepOne] = useState(true);
    const [stepTwo, setStepTwo] = useState(false);
    const [stepThree, setStepThree] = useState(false);


    const [existingSchool, setExistingSchool] = useState(true);
    const [newSchool, setNewSchool] = useState(false);
    const [final, setFinal] = useState(false);





    const [questionError, setQuestionError] = useState(null)
    const [existingSchoolError, setExistingSchoolError] = useState(null)
    const [newSchoolNameError, setNewSchoolNameError] = useState(null)
    const [newSchoolAddressError, setNewSchoolAddressError] = useState(null)
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [schoolEmailError, setSchoolEmailError] = useState(null)

    

    // School Listing State Start
    const [school, setSchool] = useState([]);
    const [page, setPage] = useState(0);
    const [keyword, setKeyWord] = useState("");
    const [totalPage, setTotalPage] = useState(1);
    const [schoolListError, setSchoolListError] = useState(false)
    const [inputSearch, setinputSearch] = useState("");
    const [selectSchool, setSelectSchool] = useState();
    const [selectSchoolId, setSelectSchoolId] = useState(0);
    // School Listing State End


    const [isLoading, setIsLoading] = useState(false);

    const [age, setAge] = useState(18);
    const navigate = useNavigate();

    // const [dob, setDob] = useState("");

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        schoolName: "",
        schoolAddress: "",
        legalFirstName: "",
        legalLastName: "",
        confirmPassword: "",
        dob: "",
        schoolEmail: "",


    })
    const { firstName, lastName, email, password, schoolName, schoolAddress, legalFirstName, legalLastName, confirmPassword, dob, schoolEmail } = userData;

    const changeHandler = e => {
        setUserData({ ...userData, [e.target.name]: [e.target.value] });
    }


    // console.log('oap', searchParams.get("step"))

    useEffect(() => {
        questionData();
    }, [])

    // School Search Listing Start
    useEffect(() => {
        if(stepTwo===true){
            const element = document.getElementById("schoolListUl");
            element.addEventListener("scroll", scrollHandle)
        }
    }, [stepTwo])

    useEffect(() => {
        if (keyword) {
            getSchoolaDta()
        }
    }, [page, keyword])
    // School Search Listing End



    const questionData = async () => {
        try {
            console.log("yes question")
            if (!localStorage.getItem("danceLevel")) {
                navigate("/");
            }
            setIsLoading(true);
            const result = await axios({
                method: "post",
                url: constant.apiUrl + "/question",
                headers: {
                    "Content-Type": "application/json",

                },
                data: {
                    dance_type_id: 1,
                    dance_level_id: localStorage.getItem("danceLevel")
                },
            })
            if (result.status === 200) {

                // console.log('data', result.data.data)
                const beforeRegistration = result.data.data.filter((item) => {
                    return item.position === 1;
                })

                setQuestion(beforeRegistration);
                setIsLoading(false);

            }
        } catch (error) {
            console.log(error.message)
            setIsLoading(false);

        }
    }
    const nextStep = (questionId, index) => {

        const ele = document.getElementsByName(questionId);
        const answerData = [];
        const s = [];

        for (let i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                const answer_id = ele[i].value;
                answerData.push(1)
                s.push(answer_id)
            }

        }
        const answrsId = s.toString();
        const data = {
            "question_id": questionId, "answer_id": answrsId
        }
        if (answrsId.length > 0) {
            setQuestionAnswer([...questionanswer, data])

        }

        if (answerData.length === 0) {
            setQuestionError("Please choose correct answer!")

        } else {
            setQuestionError(null)
            setStepQuestion(index + 1)
            window.scrollTo(0, 0);
        }

        if (question.length === index + 1 && answerData.length > 0) {
            setStepOne(false);
            setStepTwo(true);
        }

        // history.push(`/steps?step=${index + 1}`)

    }



    // School Search Autocomplete start here 
    const scrollHandle = async () => {
        try {
            const element = document.getElementById("schoolListUl");
            let totalhigh = element.scrollHeight;
            let innerHight = element.clientHeight;
            let scrollTop = element.scrollTop;

            if (innerHight + scrollTop >= totalhigh) {
                const valuie = document.getElementById("searchinput").value;
                setKeyWord(valuie);
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const searchHandle = async (e) => {
        setSchool([]);
        if (e.target.value.length > 2) {
            setPage(1)
            setKeyWord(e.target.value);
        }
    }

    const getSchoolaDta = async () => {
        try {
            setSchoolListError(false);
            console.log('page', page)
            console.log('totalPage', totalPage)
            if (page > totalPage) {
                return false;

            }

            const result = await axios({
                method: "post",
                url: constant.apiUrl + "/schoolSearchListWeb",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    page: page,
                    keyword: keyword
                }
            })
            if (result.status === 200) {
                if (result.data.status === "success") {
                    console.log('result', result.data);
                    const results = result.data.data;
                    setSchool((prev) => [...prev, ...results]);
                    setTotalPage(result.data.totalPaginiation)

                } else {
                    setSchoolListError("No result found");

                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const clearInputSearch = () => {
        setSchoolListError(false);
        setSchool([]);
        setinputSearch("");
    }

    const schoolHandle = (item) => {
        const data = `${item.school_name}, address:${item.address} ${item.city} ${item.state},${item.zip}`;
        setSelectSchool(data)
        setSelectSchoolId(item.id)
        setSchoolListError(false);
        setSchool([]);
        setinputSearch("");
    }
    // School Search Autocomplete end here 


    const addNewSchool = () => {
        setExistingSchool(false);
        setNewSchool(true);
        setSelectSchoolId(0);

    }

    const stepTwp = (id) => {
        console.log('yes stepTwp')
        setNewSchoolAddressError(null)
        setNewSchoolNameError(null)
        setExistingSchoolError(null)
        console.log('id', id)
        console.log('selectSchool', selectSchoolId)
        console.log("userData", userData)


        if (selectSchoolId === 0 && id === 0) {
            setExistingSchoolError("School details is required!")
            setStepOne(false);
            setStepTwo(true);
            setStepThree(false);
            return false
        } else if (selectSchoolId === 0 && id === 1) {
            if (userData.schoolName === "" || userData.schoolName[0] === "") {
                setNewSchoolNameError("School name is required!")
                setStepOne(false);
                setStepTwo(true);
                setStepThree(false);
                return false;
            }
            if (userData.schoolAddress === "" || userData.schoolAddress[0] === "") {
                setNewSchoolAddressError("School address is required!")
                setStepOne(false);
                setStepTwo(true);
                setStepThree(false);
                return false;
            }

            setStepOne(false);
            setStepTwo(false);
            setStepThree(true);


        } else {
            setStepOne(false);
            setStepTwo(false);
            setStepThree(true);

        }
    }

    const registerHandler = async (e) => {
        e.preventDefault();
        try {
            if (age < 13) {
                navigate("/message")
            } else {

                console.log('yes register')
                console.log('question', questionanswer);
                console.log('userData', userData);
                console.log('schoold Id', selectSchoolId);
                // console.log('dob',dob);
                // return false;
                setEmailError(null)
                setPasswordError(null)
                setSchoolEmailError(null)


                if (userData.password[0] !== userData.confirmPassword[0]) {
                    setPasswordError("Password & confirm password do not match!")
                    return false;

                }
                const registerData = await axios({
                    method: "post",
                    url: constant.apiUrl + "/register",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        first_name: userData.firstName[0],
                        last_name: userData.lastName[0],
                        email: userData.email[0],
                        schoolEmail: userData.schoolEmail[0],
                        password: userData.password[0],
                        dob: userData.dob[0],
                        dance_level_id: localStorage.getItem("danceLevel"),
                        dance_type_id: 1,
                        nick_name_details: {
                            legal_first_name: userData.legalFirstName[0],
                            legal_last_name: userData.legalLastName[0]
                        },
                        school_id: selectSchoolId,
                        school_details: {
                            school_name: userData.schoolName[0],
                            school_address: userData.schoolAddress[0],
                        },
                        before_registration_questions_answers: questionanswer,
                    },
                })
                console.log(registerData);
                // console.log("selectSchoolId",selectSchoolId)


                if (registerData.status === 201) {
                    // alert("register successfylly !")
                    // console.log('answerId', registerData.data.schoolEventData);return false;
                    if (selectSchoolId === 0) {
                        setFinal(true)
                    } else {
                        localStorage.setItem("token", registerData.data.token);
                        localStorage.setItem("authenticated", true);
                        // localStorage.setItem("followUpAnswerId", true);
                        localStorage.setItem("userId", registerData.data.data.id)
                        localStorage.setItem("schoolId", registerData.data.data.school_id)
                        localStorage.setItem("questionStatus", registerData.data.questionStatus)

                        if (registerData.data.promDateStatus === 1) {
                            localStorage.setItem("promDate", true);
                        }




                        // await cometRegister(registerData.data.data.first_name, registerData.data.data.id);
                        navigate("/stepsTwo");
                    }

                } else if (registerData.status === 203) {
                    setEmailError("You already have an account, Kindly log in")
                    // alert("Email already taken !")
                }else if(registerData.status === 202){
                    setSchoolEmailError("Please enter valid school email address!")
                }
            }

        } catch (error) {
            console.log(error.message);
        }

    }

    // const cometRegister = async (uname, id) => {
    //     try {

    //         const appID = process.env.REACT_APP_COMETCHAT_ID;

    //         const region = process.env.REACT_APP_COMETCHAT_REGION;

    //         const appSetting = new CometChat.AppSettingsBuilder()
    //             .subscribePresenceForAllUsers()
    //             .setRegion(region)
    //             .build();
    //             CometChat.init(appID, appSetting).then(
    //             () => {
    //                 console.log("Initialization completed successfully");


    //                 // Create User
    //                 let authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY;
    //                 var uid = `${uname}-${id}`;
    //                 var name = uname;

    //                 var user = new CometChat.User(uid);
    //                 user.setName(name);
    //                 CometChat.createUser(user, authKey).then(
    //                     (user) => {
    //                         console.log("user created", user);
    //                         CometChat.login(uid, authKey).then(
    //                             async (user) => {
    //                                 console.log("Login Successful:", { user });

    //                                 const registerData = await axios({
    //                                     method: "post",
    //                                     url: constant.apiUrl + "/chatIdUpdate",
    //                                     headers: {
    //                                         "Content-Type": "application/json",
    //                                         "x-access-token": localStorage.getItem("token"),
    //                                     },
    //                                     data: {
    //                                         user_chatid: uid,
    //                                     }
    //                                 });

    //                                 if (registerData.status === 200) {
    //                                     console.log("chat id  updated successfully!")

    //                                 }
    //                             },
    //                             (error) => {
    //                                 console.log("Login failed with exception:", { error });
    //                             }
    //                         );
    //                     },
    //                     (error) => {
    //                         console.log("error", error);
    //                     }
    //                 );
    //             },
    //             (error) => {
    //                 console.log("Initialization failed with error:", error);
    //             }
    //         );






    //     } catch (error) {

    //         console.log(error.message);

    //     }
    // }

    const dobHandle = (e) => {
        setUserData({ ...userData, [e.target.name]: [e.target.value] });


        console.log('value', e.target.value);
        const dob = new Date(e.target.value);
        //calculate month difference from current date in time  
        const month_diff = Date.now() - dob.getTime();

        //convert the calculated difference in date format  
        const age_dt = new Date(month_diff);

        //extract year from date      
        const year = age_dt.getUTCFullYear();

        //now calculate the age of the user  
        const ageYear = Math.abs(year - 1970);
        setAge(ageYear);
       
    }



    return (
        <>
            <Header />
            {isLoading ? <LoadingSpinner /> :

                !final ?

                    <section className="middle-box" id="questions">
                        <section className="insurance-steps-sec step-anim-02 question active">


                            {/* <div className="small-banner" style={{ "background": "url('./images/small-banner.jpg') no-repeat center rgb(219 232 251)" }}>
                                <div className="container">
                                    <div className="banner-heading">
                                        <h1>The Safe and Easy way to find a date to your school dance.</h1>
                                        <p>Find your perfect match for the perfect night. </p>
                                    </div>
                                </div>
                            </div> */}



                            {stepOne ?
                                <section className="sec-padd adrs-sec steps-padBx what-trim-sec nme-sec">


                                    <div className="container">

                                        <div className="row">
                                            {question.map((item, index) => {
                                                return (
                                                    <div className={index === stepQuestion ? "col-lg-9 offset-lg-3 text-center m-auto activeStepQuestion" : "col-lg-9 offset-lg-3 text-center m-auto deactiveStepQuestion"} key={item.id}>


                                                        <h2 className="heading">{item.question}</h2>
                                                        <h6>{item.extra}</h6>

                                                        <div className="fld-hdng text-center m-auto next-move-b stepsBtn-f18" >
                                                            <div className="row mt-15 mt-10">
                                                                {item.options.map((answer, keys) => {
                                                                    return (

                                                                        <div key={answer.answer_id} className="col-12 col-md-6">
                                                                            <div className="form-group">
                                                                                <input className="checkbox-tools" type={item.question_type === 1 ? "radio" : "checkbox"} name={item.id} id={answer.answer_id} value={answer.answer_id} />
                                                                                <label className="for-checkbox-tools" htmlFor={answer.answer_id}>
                                                                                    {answer.answer}
                                                                                </label>
                                                                            </div>

                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                            <span className="text-danger">{questionError}</span>
                                                            <div className="row mt-35 mt-30">

                                                                <div className="col-lg-12"><button type="button" className="btn steps-ContB get-qouts-btn next-move" onClick={() => nextStep(item.id, index)}> Next</button></div>

                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                            })}

                                        </div>

                                    </div>

                                </section>
                                : null}

                            {/* School Step Start */}
                            {stepTwo ?
                                <section className="sec-padd adrs-sec steps-padBx what-trim-sec nme-sec">
                                    {existingSchool ?
                                        <div className="container">

                                            <div className="row">

                                                <div className="col-lg-9 offset-lg-3 text-center m-auto">

                                                    <h2 className="heading"> What school do you go to? </h2>

                                                    <div className="fld-hdng text-center m-auto adrs-step">

                                                        <div className="row mt-30">



                                                            <div className="col-md-12" >



                                                                <div className="searchsug">
                                                                    <div className="input-group">
                                                                        <input type="text" className="form-control" placeholder="search" onKeyUp={(e) => searchHandle(e)} id="searchinput" value={inputSearch} onChange={(e) => setinputSearch(e.target.value)} autoComplete="off" />
                                                                        <span className="search_clear" onClick={clearInputSearch}>x</span>
                                                                        <button className="btn input-group-text"><i className="fas fa-search"></i></button>
                                                                    </div>
                                                                    <div className="searchsuglst">
                                                                        <ul id="schoolListUl" >
                                                                            {schoolListError === false && school.length > 0 ?
                                                                                <>
                                                                                    {school.map((item, index) => {
                                                                                        return (
                                                                                            <li key={index} onClick={() => schoolHandle(item)}  >{item.school_name} <small>Address: {`${item.address},${item.city},${item.state},${item.zip}`}</small></li>
                                                                                        )
                                                                                    })}
                                                                                </>
                                                                                : <li>{schoolListError}</li>}

                                                                        </ul>
                                                                    </div>
                                                                </div>

                                                            </div>


                                                        </div>

                                                        <div className="row mt-35 mt-30">

                                                            <div className="col-md-12">

                                                                <textarea className="form-control" value={selectSchool} readOnly='' />

                                                            </div>

                                                        </div>
                                                        <div className="row mt-35 mt-30">

                                                            <div className="col-lg-12"><button type="button" className="btn steps-ContB get-qouts-btn next-move" onClick={() => stepTwp(0)}> Continue</button></div>

                                                        </div>
                                                        <span className="text-danger">{existingSchoolError}</span>


                                                        <div className="row mt-35 mt-30">

                                                            <div className="col-lg-12"><button type="button" className="btn steps-ContB get-qouts-btn next-move w-auto" onClick={addNewSchool}>I don't see my school</button></div>

                                                        </div>



                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                        : null}


                                    {/* Add new School Start */}
                                    {newSchool ?
                                        <div className="container">


                                            <div className="row">

                                                <div className="col-lg-9 offset-lg-3 text-center m-auto">

                                                    <h2 className="heading">Add Your School</h2>

                                                    <div className="fld-hdng text-center m-auto adrs-step">

                                                        <div className="row ">



                                                            <div className="col-md-12" >

                                                                <input type="text" className="form-control" placeholder="Enter your school name" name="schoolName" value={schoolName} onChange={changeHandler} required />

                                                            </div>



                                                        </div>
                                                        <span className="text-danger">{newSchoolNameError}</span>


                                                        <div className="row mt-35 mt-30">

                                                            <div className="col-md-12">

                                                                <textarea className="form-control" placeholder="Enter your school Address" name="schoolAddress" value={schoolAddress} onChange={changeHandler} required />

                                                            </div>

                                                        </div>
                                                        <span className="text-danger">{newSchoolAddressError}</span>


                                                        <div className="row mt-35 mt-30">

                                                            <div className="col-lg-12"><button type="button" className="btn steps-ContB get-qouts-btn next-move" onClick={() => (stepTwp(1))}>Submit</button></div>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                        : null}

                                    {/* Add new School End */}

                                </section>
                                : null}
                            {/* School Step End */}

                            {/* Register Step Start */}
                            {stepThree ?
                                <section className="sec-padd adrs-sec steps-padBx what-trim-sec nme-sec">


                                    <div className="container">


                                        <div className="row">

                                            <div className="col-lg-9 offset-lg-3 text-center m-auto">

                                                {/* <h2 className="heading">What is your name as it appears on your school ID?</h2> */}

                                                <div className="fld-hdng text-center m-auto adrs-step">
                                                    <form onSubmit={registerHandler}>


                                                        <div className="row mt-30">
                                                            <div className="col-md-12  col-12 col-xl-6" >
                                                                <div className="form-group">
                                                                    <label htmlFor="">Profile First Name</label>
                                                                    <input type="text" className="form-control" placeholder="Profile First Name" name="firstName" value={firstName} onChange={changeHandler} required />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12  col-12 col-xl-6" >
                                                                <div className="form-group">
                                                                    <label htmlFor="">Profile Last Name</label>
                                                                    <input type="text" className="form-control" placeholder="Profile Last Name" name="lastName" value={lastName} onChange={changeHandler} required />
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="form-group text-start">
                                                                    <h6 className="text-info lglntxt"><b>Enter your name as it appears on your Student Identification Card</b></h6>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12  col-12 col-xl-6" >
                                                                <div className="form-group">
                                                                    <label htmlFor="">Legal First Name</label>
                                                                    <input type="text" className="form-control" placeholder="Legal First Name" name="legalFirstName" value={legalFirstName} onChange={changeHandler} required />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12  col-12 col-xl-6" >
                                                                <div className="form-group">
                                                                    <label htmlFor="">Legal Last Name</label>
                                                                    <input type="text" className="form-control" placeholder="Legal Last Name" name="legalLastName" value={legalLastName} onChange={changeHandler} required />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 col-12 col-xl-12" >
                                                                <div className="form-group">
                                                                    <label htmlFor="">Enter Your Email</label>
                                                                    <input type="email" className="form-control" placeholder="Enter Your Email" name="email" value={email} onChange={changeHandler} required />
                                                                    <small className="text-danger">{emailError}</small>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 col-12 col-xl-12" >
                                                                <div className="form-group">
                                                                    <label htmlFor="">Date of Birth</label>
                                                                    <input type="date" className="form-control" pleaceholder="Date of Birth" name="dob" value={dob} onChange={dobHandle} required />
                                                                </div>
                                                            </div>

                                                            <div className="col-12">
                                                                <div className="form-group text-start condishow">
                                                                    <h6><b>What is your school email address?</b></h6>
                                                                    <p><small>We need your school email address to verify you are a student at the school. We will send you an email to your school email address.</small></p>
                                                                    <p><small>We will use your school email address for school verification purpose. All other email communication will be sent to the email address you previously entered. After hitting submit, please go to your school email address and verify your email address.</small></p>
                                                                    <input type="email" value={schoolEmail} name="schoolEmail" className="form-control mt-3" placeholder="Enter Your School Email" onChange={changeHandler} required />
                                                                    <small className="text-danger">{schoolEmailError}</small>
                                                                </div>
                                                            </div>


                                                            <div className="col-md-12 col-12 col-xl-6" >
                                                                <div className="form-group">
                                                                    <label htmlFor="">Password</label>
                                                                    <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={changeHandler} autoComplete="on" required />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 col-12 col-xl-6" >
                                                                <div className="form-group">
                                                                    <label htmlFor="">Confirm Password</label>
                                                                    <input type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} name="confirmPassword" onChange={changeHandler} autoComplete="on" />
                                                                </div>
                                                                <small className="text-danger">{passwordError}</small>
                                                            </div>
                                                        </div>






                                                        <div className="row mt-30">

                                                            <div className="col-lg-12"><button type="submit" className="btn steps-ContB get-qouts-btn next-move">Submit</button></div>

                                                        </div>
                                                    </form>


                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </section>
                                : null}

                            {/* Register Step End */}


                        </section>
                    </section>

                    : <Success />
            }


            <Footer />
            {/* } */}

        </>
    )
}
export default Steps;