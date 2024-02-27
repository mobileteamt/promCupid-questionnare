import { useRef, useState } from "react";
import axios from "axios";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

import constant from "../constant";

const ContactUs = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const subjectInputRef = useRef();
  const messageInputRef = useRef();

  const [showElement, setShowElement] = useState("none");
  // Errors
  const [showErrorName, setShowErrorName] = useState(false);
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [showErrorSubject, setShowErrorSubject] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredSubject = subjectInputRef.current.value;
    const enteredMessage = messageInputRef.current.value;
    console.log(enteredName, enteredEmail, enteredSubject, enteredMessage);

    const formdata = {
      name: enteredName,
      email: enteredEmail,
      subject: enteredSubject,
      message: enteredMessage,
    };

    if (enteredName.length === 0) {
      setShowErrorName(true);
    } else {
      setShowErrorName(false);
    }
    if (enteredEmail.length === 0) {
      setShowErrorEmail(true);
    } else {
      setShowErrorEmail(false);
    }
    if (enteredSubject.length === 0) {
      setShowErrorSubject(true);
    } else {
      setShowErrorSubject(false);
    }
    if (enteredMessage.length === 0) {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }

    // console.log(showErrorName);
    if (
      enteredName.length > 0 &&
      enteredEmail.length > 0 &&
      enteredSubject.length > 0 &&
      enteredMessage.length > 0
    ) {
      // Submit form
      axios.post(constant.apiUrl + "/contactUs", formdata).then((res) => {
        // console.log(res);
      });

      setShowElement("block");

      nameInputRef.current.value = "";
      emailInputRef.current.value = "";
      subjectInputRef.current.value = "";
      messageInputRef.current.value = "";

      setTimeout(function () {
        setShowElement("none");
      }, 3000);
    }
  };

  return (
    <>
      <Header />
      <section className="middle-box faq">
        <div className="quote_inner cms container">
          
          <div className="row row-no-gutters">
            
            <div className="col-12 col-lg-8 m-auto">
              <div className="cform">
              <h2 className="about-hdng heading">Contact Us</h2>
              <div
                role="form"
                className="wpcf7"
                id="wpcf7-f1393-p55-o1"
                lang="en-US"
                dir="ltr"
              >
                <div className="screen-reader-response">
                  <p role="status" aria-live="polite" aria-atomic="true"></p>
                  <div
                    className="success_alert alert alert-success"
                    role="alert"
                    style={{ display: showElement }}
                  >
                  Contact Request Submitted Successfully! We will be in touch with you soon.
                </div>
                </div>
                <form className="contact_form" onSubmit={onSubmitHandler}>
                  <div>
                    <label htmlFor="name">
                      Your Name
                      <br />
                      <span className="wpcf7-form-control-wrap">
                        <input
                          type="text"
                          ref={nameInputRef}
                          className="wpcf7-form-control"
                          style={showErrorName ? { borderColor: "red" } : {}}
                        />
                      </span>
                      {showErrorName === true ? (
                        <div className="help-block">Please Enter the Name</div>
                      ) : (
                        ""
                      )}
                    </label>
                  </div>
                  <div>
                    <label htmlFor="email">
                      Your Email
                      <br />
                      <span className="wpcf7-form-control-wrap">
                        <input
                          type="email"
                          ref={emailInputRef}
                          className="wpcf7-form-control"
                          style={showErrorEmail ? { borderColor: "red" } : {}}
                        />
                      </span>
                      {showErrorEmail === true ? (
                        <div className="help-block">Please Enter the Email</div>
                      ) : (
                        ""
                      )}
                    </label>
                  </div>
                  <div>
                    <label>
                      Subject
                      <br />
                      <span className="wpcf7-form-control-wrap">
                        <input
                          type="text"
                          ref={subjectInputRef}
                          className="wpcf7-form-control"
                          style={showErrorSubject ? { borderColor: "red" } : {}}
                        />
                      </span>
                      {showErrorSubject === true ? (
                        <div className="help-block">
                          Please Enter the Subject
                        </div>
                      ) : (
                        ""
                      )}
                    </label>
                  </div>
                  <div>
                    <label>
                      Your Message
                      <br />
                      <span className="wpcf7-form-control-wrap">
                        <textarea
                          cols="40"
                          rows="5"
                          className="wpcf7-form-control"
                          ref={messageInputRef}
                          style={showErrorMessage ? { borderColor: "red" } : {}}
                        ></textarea>
                      </span>
                      {showErrorMessage === true ? (
                        <div className="help-block">
                          Please Enter the Message
                        </div>
                      ) : (
                        ""
                      )}
                    </label>
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Submit"
                      className="btn get-qouts-btn"
                      style={{ width: 0 }}
                    />
                  </div>
                </form>
              </div>
              
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactUs;
