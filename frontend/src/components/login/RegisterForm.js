import {Form, Formik} from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput";
import * as Yup from 'yup'

export default function RegisterForm() {
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
  return (
    <div classNAme="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik 
          enableReinitialize 
          initialValues={{first_name, last_name,email,password,bYear,bMonth, bDay, gender}}
          validationSchema={registerValidation}>
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
                placeholder="Surname"
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
                type="text"
                placeholder="Password"
                name="password"
                onChange={handleRegisterChange}
              />
            </div>
            <div className="reg_col">
              <div className="reg_line_header">
                Date of Birth <i className="info_icon"></i>
              </div>
              <div className="reg_grid">
              <select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
                  {month.map((month, i)=> (
                    <option value={month} key={i}>
                      {month}
                    </option>
                  ))}
                </select>
                <select name="bDay" value={bDay} onChange={handleRegisterChange}>
                  {days.map((day, i)=>(
                    <option value={day} key={i}>
                      {day}
                    </option>
                  ))}
                </select>
                <select name="bYear" value={bYear} onChange={handleRegisterChange}>
                  {years.map((year, i)=>(
                    <option value={year} key={i}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <label htmlFor="male">
                    Male 
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="female">
                    Female 
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="male">
                    Custom 
                    <input
                      type="radio"
                      name="gender"
                      id="custom"
                      value="custom"
                      onChange={handleRegisterChange}
                    />
                  </label>
                </div>
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
            </Form>
            )}
          </Formik>
      </div>
    </div>
  );
}
