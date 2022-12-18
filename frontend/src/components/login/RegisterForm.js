import {Form, Formik} from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput";
import * as Yup from 'yup';
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import {useDispatch} from "react-redux";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

export default function RegisterForm({setVisible}) {
  const navigate = useNavigate()
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth()+1,
    bDay: new Date().getDate(),
    gender: ""
  }
  const yearTemp = new Date().getFullYear()
  const monthTemp = new Date().getMonth()+1
  const [user, setUser] = useState(userInfos);
  const {first_name, last_name,email,password,bYear,bMonth, bDay, gender} = user;
  const handleRegisterChange = (e)=>{
    const {name, value} = e.target;
    setUser({...user, [name]: value})
  }
  const years = Array.from(new Array(108), (val, index)=>yearTemp-index);
  const month = Array.from(new Array(12), (val, index)=>monthTemp-index);
  const getDays = ()=>{
    return new Date(bYear, bMonth, 0).getDate();
  }
  const days = Array.from(new Array(getDays()), (val, index)=>1+index);
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What is your first name?")
      .min(2, "First name must have at least two characters.")
      .max(16, "First name can only be 16 charecters long.")
      .matches(/^[aA-zZ\s]+$/, "Numbers and special characters are not allowed."),
    last_name: Yup.string()
      .required("What is your last name?")
      .min(2, "last name must have at least two characters.")
      .max(16, "last name can only be 16 charecters long.")
      .matches(/^[aA-zZ\s]+$/, "Numbers and special characters are not allowed."),
      email: Yup.string().required("You will need this when you log in and if you ever need to reset your password."),
      password: Yup.string().required("Enter a combination of at least six numbers, letters, and special characters.")
        .min(6,"Password must be at least six characters")
        .max(18, "Password cannot exceed 18 characters.")
  })
  const dispatch = useDispatch();
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const registerSubmit = async()=>{
    try{
      const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`,
      {
        first_name,
        last_name,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        gender
      }
      );
      setError("");
      setSuccess(data.message);
      const {message, ...rest} = data;
      setTimeout(()=>{
        dispatch({type:"LOGIN", payload: rest});
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000)
    } catch(error){
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  }
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={()=>{setVisible(false)}}></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik 
          enableReinitialize 
          initialValues={{first_name, last_name,email,password,bYear,bMonth, bDay, gender}}
          validationSchema={registerValidation}
          onSubmit={()=>{
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let at_least_18 = new Date(1970 + 18, 0, 1);
            let older_than_seventy = new Date(1970+70, 0, 1);
            if (current_date - picked_date < at_least_18){
              setDateError("It looks like you've entered the wrong information. Please make sure that you use your real date of birth.")
            } else if(current_date - picked_date > older_than_seventy){
              setDateError("It looks like you've entered the wrong information. Please make sure that you use your real date of birth.")
            } else if(gender===""){
              setDateError("");
              setGenderError("Please choose a gender. You can change who can see this later.");
            } else {
              setDateError("");
              setGenderError("");
              registerSubmit();
            }
          }}>
          {(formik)=>(
          <Form className="register_form">
            <div className="reg_line">
              <RegisterInput 
                type="text"
                placeholder="First Name"
                name="first_name"
                onChange={handleRegisterChange}
              />
              <RegisterInput 
                type="text"
                placeholder="Last Name"
                name="last_name"
                onChange={handleRegisterChange}
              />
            </div>
            <div className="reg_line">
            <RegisterInput 
                type="text"
                placeholder="Email or Mobile Number"
                name="email"
                onChange={handleRegisterChange}
              />
            </div>
            <div className="reg_line">
            <RegisterInput 
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleRegisterChange}
              />
            </div>
            <div className="reg_col">
              <div className="reg_line_header">
                Date of Birth <i className="info_icon"></i>
              </div>
              <DateOfBirthSelect 
                bMonth={bMonth} 
                bDay={bDay} 
                bYear={bYear}
                month={month}
                day={days}
                year={years}
                handleRegisterChange={handleRegisterChange}
                dateError={dateError}
                />
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
              <GenderSelect
                handleRegisterChange={handleRegisterChange}
                genderError={genderError}/>
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup">Sign Up</button>
              </div>
            </div>
            <DotLoader color="#1876f2" loading={loading} size={30}/>
            {error && <div className="error_text">{error}</div>}
            {success && <div className="error_text">{success}</div>}
            </Form>
            )}
          </Formik>
      </div>
    </div>
  );
}
