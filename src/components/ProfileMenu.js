import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import constant from "../constant";


const ProfileMenu = (data) => {
    const [profile, setProfile] = useState(false);
    const [preference, setPreference] = useState(false);
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [ProfilePicturePreview, setProfilePicturePreview] = useState();

    const { url } = data
    


    useEffect(() => {

        if (url === "profile") {
            setProfile(true)
        } else if (url === "preference") {
            setPreference(true);
        }
        getProfile();
    }, [])

    const getProfile = async () => {
        try {
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
                console.log(result.data.data);
                setfirst_name(result.data.data.first_name);
                setlast_name(result.data.data.last_name);
                // setProfilePicturePreview(constant.backnedBaseUrl + result.data.data.photo_upload);
                if(result.data.data.photo_upload.length>0){
                    setProfilePicturePreview(constant.backnedBaseUrl + result.data.data.photo_upload);
                }



            }
        } catch (error) {
            console.log(error.message)

        }
    }

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
            <div className="profleft">
                <div className="media">
                    <div className="media-img">
                        {
                            ProfilePicturePreview ? <img src={ProfilePicturePreview} alt="profilePic" />
                                : <img src="/images/noimg.png" alt="profilePic" />
                        }

                    </div>
                    <div className="media-body">
                        <h5>{first_name} {last_name}</h5>
                        {/* <h6>(Nick)</h6> */}
                    </div>
                </div>

                <ul className="linkul">
                    <li className={profile ? "linkul_active" : null}><Link to="/profile" ><img src="images/icons/userico.png" alt="" /> Profile</Link></li>
                    
                    <li><a onClick={Logout}><img src="images/icons/logout.png" alt="" />Logout</a></li>
                </ul>
            </div>
        </>
    )
}
export default ProfileMenu;