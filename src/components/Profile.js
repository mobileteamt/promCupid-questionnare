import HeaderLogin from "./layouts/HeaderLogin";
import Footer from "./layouts/Footer"
import ProfileMenu from './ProfileMenu';
import { useState, useEffect } from "react";
import axios from "axios";
import constant from "../constant";
import LoadingSpinner from "./LoadingSpinner";
import moment from 'moment'

const Profile = () => {


    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [legal_first_name, setlegal_first_name] = useState("");
    const [legal_last_name, setlegal_last_name] = useState("");
    // const [id_upload, setFirst_name] = useState("");
    const [email, setemail] = useState("");
    const [school_email, setschool_email] = useState("");
    const [facebook, setfacebook] = useState("");
    const [instagram, setinstagram] = useState("");
    const [dob, setdob] = useState("");
    const [tiktok, settiktok] = useState("");
    const [photo_upload, setphoto_upload] = useState("");
    const [id_upload, setid_upload] = useState("");
    const [twitter, settwitter] = useState("");

    const [ProfilePicturePreview, setProfilePicturePreview] = useState();
    const [StudentIdCardPreview, setStudentIdCardPreview] = useState();
    const [schoolDetails, setSchoolDetails] = useState("");


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);



    


    const [isLoading, setIsLoading] = useState(false);
    const [success,setSuccess]=useState(false)
    const [successPassword,setSuccessPassword]=useState(false)

    const [oldPasswordType, setOldPasswordType] = useState("password");
    const [newPasswordType, setNewPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");



    


    useEffect(() => {
        if (!photo_upload) {
            setphoto_upload("")
            return
        }

        const objeftUrl = URL.createObjectURL(photo_upload)
        setProfilePicturePreview(objeftUrl)

        return () => URL.revokeObjectURL(objeftUrl)
    }, [photo_upload])

    useEffect(() => {
        if (!id_upload) {
            setid_upload("")
            return
        }

        const objectUrl = URL.createObjectURL(id_upload)
        setStudentIdCardPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [id_upload])

    useEffect(() => {
        getProfile();
    }, [])

    const getProfile = async () => {
        try {
            setIsLoading(true);
            const result = await axios({
                method: "post",
                url: constant.apiUrl + "/getStudentProfile",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token"),

                },
                data: {
                    userId: localStorage.getItem("userId")
                },
            })
            if (result.status === 200) {
                setfirst_name(result.data.data.first_name);
                setlast_name(result.data.data.last_name);
                setlegal_first_name(result.data.data.legal_first_name);
                setlegal_last_name(result.data.data.legal_last_name);
                setemail(result.data.data.email);
                setschool_email(result.data.data.school_email);
                setfacebook(result.data.data.facebook);
                setinstagram(result.data.data.instagram);
                settiktok(result.data.data.tiktok);
                if(result.data.data.photo_upload.length>0){
                    setProfilePicturePreview(constant.backnedBaseUrl + result.data.data.photo_upload);
                }
                setStudentIdCardPreview(constant.backnedBaseUrl + result.data.data.id_upload);
                setdob(moment(result.data.data.dob).format('YYYY-MM-DD'));
                settwitter(result.data.data.twitter)
                setSchoolDetails(`${result.data.data.school_name}, Address:${result.data.data.school_address},${result.data.data.school_city},${result.data.data.school_state},${result.data.data.school_zip}`);

                // setfirst_name(result.data.data)
                setIsLoading(false);


            }
        } catch (error) {
            console.log(error.message)
            setIsLoading(false);

        }
    }
    const updateProfile = async e => {
        e.preventDefault();
        try {
            

            // console.log('first_name', first_name);
            // console.log('last_name', last_name);
            // console.log('legal_first_name', legal_first_name);
            // console.log('legal_last_name', legal_last_name);
            // console.log('email', email);
            // console.log('school_email', school_email);
            // console.log('facebook', facebook);
            // console.log('instagram', instagram);
            // console.log('tiktok', tiktok);
            // console.log('photo_upload', photo_upload);
            // console.log('id_upload', id_upload);

            // console.log('dob', dob);
            let id_upload_status="yes";
            if(id_upload!==""){
                id_upload_status="yes";
            }else{
                id_upload_status="no";
            }

            let photo_upload_status="yes";
            if(photo_upload!==""){
                photo_upload_status="yes";
            }else{
                photo_upload_status="no";
            }

            let bodyFormData = new FormData();
            bodyFormData.append("files", photo_upload);
            bodyFormData.append("files", id_upload);
            bodyFormData.append("userId", localStorage.getItem("userId"));
            bodyFormData.append("first_name", first_name);
            bodyFormData.append("last_name", last_name);
            bodyFormData.append("legal_first_name", legal_first_name);
            bodyFormData.append("legal_last_name", legal_last_name);
            bodyFormData.append("email", email);
            bodyFormData.append("school_email", school_email);
            bodyFormData.append("facebook", facebook);
            bodyFormData.append("instagram", instagram);
            bodyFormData.append("tiktok", tiktok);
            bodyFormData.append("twitter", twitter);
            bodyFormData.append("dob", dob);
            bodyFormData.append("photo_upload_status", photo_upload_status);
            bodyFormData.append("id_upload_status", id_upload_status);


            const result = await axios({
                method: "post",
                url: constant.apiUrl + "/updateStudentProfile",
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
                data: bodyFormData,

            })
            if (result.status === 200) {
                window.scrollTo(0, 0);
                setSuccess("Profile Updated Successfully!")
                setTimeout(() => (setSuccess(false)), 3000);

            }
        } catch (error) {
            console.log(error.message)
            alert(error.message)
        }

    }
    const changePasswordHandle = async e => {
        e.preventDefault();
        try {
            setConfirmPasswordError(null)
            setOldPasswordError(null)
            if(newPassword!==confirmPassword){
                setConfirmPasswordError("New password & confirm password do not match!");
                return false;
            }
            // const [oldPassword, setOldPassword] = useState("");
            // const [newPassword, setNewPassword] = useState("");
            // const [confirmPassword, setConfirmPassword] = useState("");
            const passwordData = await axios({
                method: "post",
                url: constant.apiUrl + "/changePassword",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token"),

                },
                data: {
                    oldPassword:oldPassword,
                    newPassword: newPassword
                },
            })
            if (passwordData.status === 200) {
                console.log(passwordData.data)
                setSuccessPassword("New password has been updated successfully!")
                setTimeout(() => (setSuccessPassword(false)), 3000);
                

            }else if(passwordData.status === 203){
                setOldPasswordError("Old password is incorrect!");

            }
        } catch (error) {
            
            alert(error.message);
        }

    }
    const toggleOldPassword = () => {
        if (oldPasswordType === "password") {
            setOldPasswordType("text")
            return;
        }
        setOldPasswordType("password")
    }

    const toggleNewPassword = () => {
        if (newPasswordType === "password") {
            setNewPasswordType("text")
            return;
        }
        setNewPasswordType("password")
    }

    const toggleConfirmPassword = () => {
        if (confirmPasswordType === "password") {
            setConfirmPasswordType("text")
            return;
        }
        setConfirmPasswordType("password")
    }



    return (
        <>
            <HeaderLogin />
            {isLoading ? <LoadingSpinner /> :

                <section className="middle-box">

                    <div className="profilebody ptb-50">
                        <div className="container">
                            <div className="row">
                                <ProfileMenu url="profile" />
                                <div className="profright ">
                                    {success?<div className="alert alert-success alertMessage" role="alert">
                                        {success}
                                    </div>:null}
                                    
                                    <div className="frmheadng">
                                        <h1 className="main-heading">Update Profile</h1>
                                        <p>Enter your name as it appears on your Student Identification Card</p>
                                    </div>
                                    <form onSubmit={updateProfile}>
                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="">Profile First Name</label>
                                                    <input type="text" value={first_name} className="form-control" name="first_name" onChange={(e) => setfirst_name(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="">Profile Last Name</label>
                                                    <input type="text" className="form-control" value={last_name} name="last_name" onChange={(e) => setlast_name(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="">Legal First Name</label>
                                                    <input type="text" className="form-control" value={legal_first_name} name="legal_first_name" onChange={(e) => setlegal_first_name(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="">Legal Last Name</label>
                                                    <input type="text" className="form-control" value={legal_last_name} name="legal_last_name" onChange={(e) => setlegal_last_name(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="">Personal Email</label>
                                                    <input type="email" className="form-control" value={email} name="email" onChange={(e) => setemail(e.target.value)} readOnly />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="">School Email</label>
                                                    <input type="email" className="form-control" value={school_email} name="school_email" onChange={(e) => setschool_email(e.target.value)} readOnly />
                                                </div>
                                            </div>
                                            
                                        </div>

                                        <div className="row mt-35 mt-30">
                                            <div className="col-md-12">
                                            <label htmlFor="">School Details</label>
                                                <textarea className="form-control" value={schoolDetails}  readOnly />
                                            </div>
                                        </div>

                                        <div className="row">

                                            <div className="col-12 col-md-12 col-xl-6">

                                                <div className="form-group">
                                                    <label htmlFor="">Facebook</label>

                                                    <input type="text" className="form-control" pleaceholder="Facebook profile link" name="facebook" value={facebook} onChange={(e) => setfacebook(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-12 col-xl-6">

                                                <div className="form-group">
                                                    <label htmlFor="">Instagram</label>

                                                    <input type="text" className="form-control" pleaceholder="Instagram profile link" name="instagram" value={instagram} onChange={(e) => setinstagram(e.target.value)} />
                                                </div>
                                            </div>



                                            <div className="col-12 col-md-12 col-xl-6">

                                                <div className="form-group">
                                                    <label htmlFor="">Tiktok</label>

                                                    <input type="text" className="form-control" pleaceholder="Tiktok profile link" name="tiktok" value={tiktok} onChange={(e) => settiktok(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-12 col-xl-6">

                                                <div className="form-group">
                                                    <label htmlFor="">Twitter</label>

                                                    <input type="text" className="form-control" pleaceholder="Twitter profile link" name="twitter" value={twitter} onChange={(e) => settwitter(e.target.value)} />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="">Date of birth</label>

                                                    <input type="date" className="form-control" pleaceholder="Date of Birth" name="dob" value={dob} onChange={(e) => setdob(e.target.value)} readOnly required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <div className="form-group profimg">
                                                    <label htmlFor="">Change your profile picture</label>
                                                    <div className="uimg">
                                                        {
                            ProfilePicturePreview ? <img src={ProfilePicturePreview} alt="profilePic" />
                                : <img src="/images/noimg.png" alt="profilePic" />
                        }
                                                    </div>
                                                    <div className="input-group">
                                                        <input type="file" className="form-control" onChange={(e) => setphoto_upload(e.target.files[0])} />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group profimg">
                                                    <label htmlFor="">Update your Student ID</label>
                                                    <div className="ucard">
                                                        <img src={StudentIdCardPreview} alt="" />
                                                    </div>
                                                    <div className="input-group">
                                                        <input type="file" className="form-control" onChange={(e) => setid_upload(e.target.files[0])} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="btnsec">
                                            <button className="btn btn-auto get-qouts-btn" type="submit">Update</button>
                                        </div>
                                    </form>
                                    <form className="mt-4" onSubmit={changePasswordHandle}>
                                    {successPassword?<div classsName="alert alert-success alertMessage" role="alert">
                                        {successPassword}
                                    </div>:null}
                                        <div className="row">
                                            <div className="col-12">
                                                <label htmlFor="">Change Password</label>
                                            </div>
                                            <div className="col-12 col-md-6">
                                            <label htmlFor="">Old Password</label>
                                                 <div className="form-group input-group pwdt">
                                                    <input type={oldPasswordType} placeholder="*********" className="form-control" value={oldPassword} name="oldPassword" onChange={(e)=>setOldPassword(e.target.value)} required/>
                                                    <div className="input-group-append appe" onClick={toggleOldPassword}>

                                                        <span className="input-group-text">
                                                            {oldPasswordType === "password" ? <i className="fa fa-eye-slash" aria-hidden="true"></i>
                                                                : <i className="fa fa-eye" aria-hidden="true"></i>
                                                            }
                                                        </span>
                                                    </div>
                                                </div> 
                                                <small className="text-danger">{oldPasswordError}</small> 

                                            </div>

                                            <div className="col-12 col-md-6"></div>
                                            <div className="col-12 col-md-6">
                                                    <label htmlFor="">New Password</label>
                                                <div className="form-group input-group pwdt">
                                                    <input type={newPasswordType} placeholder="*********" className="form-control" value={newPassword} name="newPssword" required onChange={(e)=>setNewPassword(e.target.value)} />
                                                    <div className="input-group-append appe" onClick={toggleNewPassword}>

                                                        <span className="input-group-text">
                                                            {newPasswordType === "password" ? <i className="fa fa-eye-slash" aria-hidden="true"></i>
                                                                : <i className="fa fa-eye" aria-hidden="true"></i>
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                    <label htmlFor="">Confirm Password</label>
                                                <div className="form-group input-group pwdt">
                                                    <input type={confirmPasswordType} placeholder="*********" className="form-control" name="confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required />
                                                    <div className="input-group-append appe" onClick={toggleConfirmPassword}>

                                                        <span className="input-group-text">
                                                            {confirmPasswordType === "password" ? <i className="fa fa-eye-slash" aria-hidden="true"></i>
                                                                : <i className="fa fa-eye" aria-hidden="true"></i>
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <small className="text-danger">{confirmPasswordError}</small>
                                        </div>
                                        <div className="btnsec">
                                            <button className="btn btn-auto get-qouts-btn" type="submit">Change</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
            <Footer />
        </>
    )
}
export default Profile;