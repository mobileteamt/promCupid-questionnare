import Header from "./layouts/Header"
import Footer from "./layouts/Footer"
const Age=()=>{
    return(
        <>
        <Header/>
        <section className="middle-box">
                <section className="sec-padd congrates-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <div className="">
                                    {/* <h2 className="agents-list-hdng mb-22">Congratulations Anne,</h2> */}
                                    {/* <p>We are Sorry to Inform You!</p> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                <section className="sec-padd-60 we-believe-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-22 text-center">
                                <img src="images/list-search-icon.png" alt="" className="pb-35" />
                                <h4 className="we-believe">We are Sorry to Inform You!</h4>
                                <p>You are not old enough to have an account on PromCupid.</p>
                            </div>
                        </div>

                    </div>
                </section>
            </section >
        <Footer/>
        </>
    )
}
export default Age;