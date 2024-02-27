import HeaderLogin from "./layouts/HeaderLogin";
import Footer from "./layouts/Footer";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import constant from "../constant";
import '../Step.css';
import LoadingSpinner from "./LoadingSpinner";


const AfterRegistration = () => {
    const [question, setQuestion] = useState([]);
    const [questionanswer, setQuestionAnswer] = useState([]);
    const [questionError, setQuestionError] = useState(null)
    const [stepOne, setStepOne] = useState(true);
    const [stepTwo, setStepTwo] = useState(false);
    const [stepThree, setStepThree] = useState(false);

    const [stepQuestion, setStepQuestion] = useState(0);
    const [ProfilePicture, setProfilePicture] = useState("");
    const [StudentIdCard, setStudentIdCard] = useState("");
    const [promDate, setPromDate] = useState("");
    const [existingPromDate, setExistingPromDate] = useState(true);
    const [studentProfilePicName, setStudentProfilePicName] = useState(null)
    const [studentIdCardPicName, setStudentIdCardPicName] = useState(null)

    const [ProfilePicturePreview, setProfilePicturePreview] = useState();
    const [StudentIdCardPreview, setStudentIdCardPreview] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [promDateError, setPromDateError] = useState(null)
    const [profilePicError, setProfilePicError] = useState(null)
    const [studentIdCardError, setStudentIdCardError] = useState(null)

    const [minDate,setMinDate]=useState("");

    useEffect(() => {
        if (!ProfilePicture) {
            setProfilePicture(undefined)
            return
        }

        const objeftUrl = URL.createObjectURL(ProfilePicture)
        setProfilePicturePreview(objeftUrl)
        setProfilePicError(null)
        return () => URL.revokeObjectURL(objeftUrl)
    }, [ProfilePicture])

    useEffect(() => {
        if (!StudentIdCard) {
            setStudentIdCard(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(StudentIdCard)
        setStudentIdCardPreview(objectUrl)
        setStudentIdCardError(null)

        return () => URL.revokeObjectURL(objectUrl)
    }, [StudentIdCard])




    const navigate = useNavigate();

    useEffect(() => {
        getCurrentDate()
        questionData();
    }, [])

    //LIMIT CHECKBOX 3 START
    useEffect(()=>{
        var checks = document.querySelectorAll(".checkthree");
        let max = 3;
        for (var i = 0; i < checks.length; i++)
        checks[i].onclick = selectiveCheck;
        function selectiveCheck (event) {
        var checkedChecks = document.querySelectorAll(".checkthree:checked");
        if (checkedChecks.length >= max + 1)
            return false;
        }

    },[stepTwo])
    //LIMIT CHECKBOX 3 END


    const getCurrentDate=()=>{
        var today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        
        today = yyyy + '-' + mm + '-' + dd;
        setMinDate(today)
    }

    const questionData = async () => {
        try {
            if(!localStorage.getItem("questionStatus") || !localStorage.getItem("token") ){
                navigate("/steps");
            }else if(localStorage.getItem("questionStatus")==="2" && localStorage.getItem("token") ){
                navigate("/login");
            }
            if (localStorage.getItem("promDate") === "true") {
                setExistingPromDate(false);
            }
            setIsLoading(true);
            const result = await axios({
                method: "post",
                url: constant.apiUrl + "/afterRegistrationQuestion",
                headers: {
                    "Content-Type": "application/json",

                },
                data: {
                    dance_type_id: 1,
                    dance_level_id: localStorage.getItem("danceLevel"),
                    user_id:localStorage.getItem("userId"),

                },
            })
            if (result.status === 200) {

                console.log('questiondData', result.data.data)
                setQuestion(result.data.data);
                setIsLoading(false);

            }
        } catch (error) {
            console.log(error.message)
            setIsLoading(false);
        }
    }
        // setQuestionAnswer([...questionanswer, data])
        // console.log('questionanswer',questionanswer)
    const nextSteps = async (questionId, index) => {
        // alert(questionId)

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
        // console.log('answrsId',answrsId.length)
        const data = {
            "question_id": questionId, "answer_id": answrsId
        }
        // console.log(data)
        if(answrsId.length>0){
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
            const totalQuestion=index + 1;
            
            finalSubmit(data,totalQuestion)

          

        }

    }
    const nextStep = () => {
        console.log('ProfilePicture',ProfilePicture)
        console.log('StudentIdCard',StudentIdCard)
        if(promDate==="" && existingPromDate===true){
            setPromDateError("Please Enter Prom Date for Event!")
            return false;
        }

        if(ProfilePicture===undefined){
            setProfilePicError("Please Upload Profile Pic!")
            return false;
        }
        if(StudentIdCard===undefined){
            setStudentIdCardError("Please Upload Student Id Card!")
            return false;
        }

        setPromDateError(null)
        setProfilePicError(null)
        setStudentIdCardError(null)

        setStepOne(false);
        setStepTwo(true);
        window.scrollTo(0, 0);
    }

    const finalSubmit=async(data,totalQuestion)=>{
        try {
            // console.log('data last',data);
            let finalquestionData=[];
            if(questionanswer.length<totalQuestion){
                finalquestionData= [...questionanswer, data];

            }else{
                finalquestionData=questionanswer;
            }
           console.log('dats',finalquestionData);
            // console.log('questionanswerinsside',questionanswer);return false;

            let schoolId = localStorage.getItem("schoolId");
            let danceLevelId = localStorage.getItem("danceLevel");
            let prom_date_details = "";

            if (promDate === "") {
                prom_date_details = "";


            } else {
                prom_date_details = {
                    "school_id": schoolId, "dance_type_id": 1, "dance_level_id": danceLevelId, "prom_date": promDate
                }
            }


            console.log('prom_date_details',prom_date_details);

            let bodyFormData = new FormData();
            bodyFormData.append("files", ProfilePicture);
            bodyFormData.append("files", StudentIdCard);
            // bodyFormData.append("userId", localStorage.getItem("userId"));
            bodyFormData.append("after_registration_questions_answers", JSON.stringify(finalquestionData));
            bodyFormData.append("prom_date_details", JSON.stringify(prom_date_details));

            const result = await axios({
                method: "post",
                url: constant.apiUrl + "/afterRegistartion",
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
                data: bodyFormData,

            })
            if (result.status === 200) {
                navigate("/profile");

            }
        } catch (error) {
            alert(error.message)
            console.log(error.message)
        }

    }

    return (
        <>
            <HeaderLogin />
            {isLoading ? <LoadingSpinner /> :

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


                        <section className={stepOne ? "sec-padd adrs-sec steps-padBx what-trim-sec nme-sec activeStep" : "sec-padd adrs-sec steps-padBx what-trim-sec nme-sec deactiveStep"}>


                            <div className="container">

                                <div className="row">

                                    <div className="col-lg-9 offset-lg-3 text-center m-auto">

                                        {/* <h2 className="heading">What is your name as it appears on your school ID?</h2> */}

                                        <div className="fld-hdng text-center m-auto adrs-step">
                                            <form>

                                                <div className="row">

                                                    <div className="col-12 col-md-6">
                                                        <div className="upic fuload">
                                                            <label htmlFor="upic">
                                                                <input type="file" id="upic" name="profilePicture" onChange={e => ( setProfilePicture(e.target.files[0]), setStudentProfilePicName(e.target.files[0].name) )} required />
                                                                <img src="images/icons/upic.png" alt="" />
                                                                <span>Choose Profile Picture</span>
                                                            </label>
                                                        <small className="text-danger">{profilePicError}</small>


                                                        </div>
                                                        {/* <small id="filename">{studentProfilePicName}</small> */}
                                                        {
                                                            ProfilePicture &&
                                                            <div className="uploadedimg">
                                                                <img id="uplodpic" src={ProfilePicturePreview} alt="" />
                                                            </div>
                                                        }

                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <div className="usid fuload">
                                                            <label htmlFor="usid">
                                                                <input type="file" id="usid" name="studentIdCard" onChange={e => ( setStudentIdCard(e.target.files[0]), setStudentIdCardPicName(e.target.files[0].name) )} required />
                                                                <h5>Submit a photo of your Student ID</h5>
                                                                <img src="images/icons/usid.png" alt="" />
                                                                <small>We won't show your student ID on your profile, but we may need it to check which school you go to</small>
                                                            </label>
                                                        <small className="text-danger">{studentIdCardError}</small>

                                                        </div>
                                                        {/* <small id="usid_filename">{studentIdCardPicName}</small> */}
                                                        {
                                                            StudentIdCard &&
                                                            <div className="uploadoc">
                                                                <img id="uplodedoc" src={StudentIdCardPreview} alt="" />
                                                            </div>
                                                        }

                                                    </div>
                                                </div>


                                                {existingPromDate ?
                                                    <div className="row mt-35 mt-30">
                                                        <div className="col-md-12" >
                                                            <label >Select PromDate </label>
                                                            <input type="date" className="form-control" name="promDate" value={promDate} onChange={e => setPromDate(e.target.value)} min={minDate} required />
                                                        </div>
                                                        <small className="text-danger">{promDateError}</small>
                                                    </div>
                                                    
                                                    : null}

                                                <div className="row mt-35 mt-30">

                                                    <div className="col-lg-12"><button type="button" className="btn steps-ContB get-qouts-btn next-move" onClick={() => nextStep()}>Next</button></div>

                                                </div>
                                            </form>


                                        </div>

                                    </div>

                                </div>

                            </div>

                        </section>

                        <section className={stepTwo ? "sec-padd adrs-sec steps-padBx what-trim-sec nme-sec activeStep" : "sec-padd adrs-sec steps-padBx what-trim-sec nme-sec deactiveStep"}>


                            <div className="container">

                                <div className="row">
                                    {question.map((item, index) => {
                                        return (
                                            <div className={index === stepQuestion ? "col-lg-9 offset-lg-3 text-center m-auto activeStepQuestion" : "col-lg-9 offset-lg-3 text-center m-auto deactiveStepQuestion"} key={index}>


                                                <h2 className="heading">{item.question}</h2>
                                                <h6>{item.extra}</h6>


                                                <div className="fld-hdng text-center m-auto next-move-b stepsBtn-f18" >
                                                    <div className="row mt-15 mt-10">
                                                        {item.options.map((answer, keys) => {
                                                            return (
                                                                
                                                                  
                                                                <div key={keys} className="col-12 col-md-6">
                                                                    <div className="form-group">
                                                                        <input className={item.extra==="[pick 3]"?"checkbox-tools checkthree":"checkbox-tools"} type={item.question_type === 1 ? "radio" : "checkbox"} name={item.id} id={answer.answer_id} value={answer.answer_id} />
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

                                                        <div className="col-lg-12"><button type="button" className="btn steps-ContB get-qouts-btn next-move" onClick={() => nextSteps(item.id, index)}> Next</button></div>

                                                    </div>

                                                </div>

                                            </div>
                                        )
                                    })}

                                </div>

                            </div>

                        </section>

                    </section>
                </section>
            }
            <Footer />

        </>
    )
}
export default AfterRegistration;