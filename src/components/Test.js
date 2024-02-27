import { useState, useEffect } from "react";
import axios from "axios";
import constant from "../constant";
import '../Step.css';
import Header from "./layouts/Header"
import Footer from "./layouts/Footer"
const Test = () => {
    const [school, setSchool] = useState([]);

    const [page, setPage] = useState(0);
    const [keyword, setKeyWord] = useState("");

    const [totalPage, setTotalPage] = useState(1);
    const [schoolListError, setSchoolListError] = useState(false)
    const [inputSearch, setinputSearch] = useState("");

    const [selectSchool, setSelectSchool] = useState();
    const [selectSchoolId, setSelectSchoolId] = useState(0);

  

    useEffect(() => {
        if (keyword) {
            getSchoolaDta()
        }
    }, [page, keyword])

    useEffect(() => {
        const element = document.getElementById("schoolListUl");
        element.addEventListener("scroll", scrollHandle)
    }, [])

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
        console.log("yes handle select")
        // console.log('select', item)
        const data = `${item.school_name}, address:${item.address} ${item.city} ${item.state},${item.zip}`;
        setSelectSchool(data)
        setSelectSchoolId(item.id)
        setSchoolListError(false);
        setSchool([]);
        setinputSearch("");

    }


    return (
        <>
            <Header />
            <section className="middle-box" id="questions">
                <section className="insurance-steps-sec step-anim-02 question active">
                    <section className="sec-padd adrs-sec steps-padBx what-trim-sec nme-sec">
                        <div className="container">

                            <div className="row">

                                <div className="col-lg-9 offset-lg-3 text-center m-auto">

                                    <h2 className="heading"> What school do you go to? </h2>

                                    <div className="fld-hdng text-center m-auto adrs-step">

                                        <div className="row mt-30">



                                            <div className="col-md-12" >



                                                <div className="searchsug">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" placeholder="search" onKeyUp={(e) => searchHandle(e)} id="searchinput" value={inputSearch} onChange={(e) => setinputSearch(e.target.value)} />
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </section>
            <Footer />
        </>
    )
}
export default Test;


{/* <div className="container">
                        <div className="row">

                            <input type="text" name="sarch" onKeyUp={(e) => searchHandle(e)} />

                            <ul>
                                {school.map((item, index) => {
                                    return (
                                        <li key={index}>{item.school_name}</li>
                                    )
                                })}
                            </ul> */}