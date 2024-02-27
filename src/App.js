import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Steps from './components/Steps';
import Protected from './middleware/Protected';
import AfterRegistrationStep from './components/AfterRegistrationStep';

import ContactUs from "./components/ContactUs";

import Cms from "./components/Cms";
import Age from "./components/Age";
import Verify from "./components/Verify";
import Test from "./components/Test";
import Pages from "./components/Pages";
import Taken from "./components/Taken";


const Pagenotfound = () => {
  return (
    <>Page Not Found 404</>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>
          <Route exact path="/login" element={<Login></Login>}></Route>
          <Route exact path="/test" element={<Test></Test>}></Route>



          <Route exact path="/login" element={<Login></Login>}></Route>
          <Route exact path="/message" element={<Age></Age>}></Route>
          <Route exact path="/verifypage/:slug" element={<Verify></Verify>}></Route>


          
          <Route exact path="/profile" element={<Protected><Profile /></Protected>}></Route>
          <Route exact path="/steps" element={<Steps></Steps>}></Route>
          <Route exact path="/stepsTwo" element={<Protected><AfterRegistrationStep/></Protected>}></Route>
          {/* <Route exact path="/stepsTwo" element={<AfterRegistrationStep></AfterRegistrationStep>}></Route> */}



          {/* Cms Routes Start Here */}
          
          <Route exact path="/cms/:slug" element={<Cms></Cms>}></Route>

          {/* Pages without Header and footer */}
          <Route exact path="/pages/:slug" element={<Pages></Pages>}></Route>
          <Route exact path="/taken/:event_id/:activeprom" element={<Taken></Taken>}></Route>
          
          
          <Route
            exact
            path="/contactus"
            element={<ContactUs></ContactUs>}
          ></Route>
          {/* Cms Routes End Here */}


          <Route path="*" element={<Pagenotfound></Pagenotfound>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;