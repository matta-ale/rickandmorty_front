import styles from "./Register.module.css";
import {useState} from 'react'
import {validation} from './validation'
import loginImage from '../../img/loginimage.png'
export default function Register(props) {
  
  const {handleRegister} = props
  const [userData,setUserData] = useState({email:'',password:'',repeatPassword:''})
  const [errors,setErrors] = useState({email:'',password:'',repeatPassword:''})

  const handleChange = (event) => {
    const property = event.target.name
    setUserData({...userData,[property]:event.target.value})
    setErrors(validation({...userData,[property]:event.target.value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleRegister(userData)
  }

  return (
  <div className={styles.formContainer}> 
    <div className={styles.formDiv}>
      <div className={styles.titleContainer}>
        <h1>Please register</h1>
        <img className={styles.loginImg} src={loginImage} alt="Login" />
      </div>
      <form className = {styles.form} onSubmit={handleSubmit}>
        <label htmlFor="">Email: </label>
        <input className={styles.input} type="email" name="email" placeholder='Type your email address...' onChange={handleChange} value={userData.email}/>
        <p className={styles.warning}>{errors.email}</p>
        <label htmlFor="">Password: </label>
        <input className={styles.input} type="password" name="password" placeholder='Type your password...' onChange={handleChange} value={userData.password}/>
        <p className={styles.warning}>{errors.password}</p>
        <label htmlFor="">Repeat password: </label>
        <input className={styles.input} type="password" name="repeatPassword" placeholder='Repeat your password...' onChange={handleChange} value={userData.repeatPassword}/>
        <p className={styles.warning}>{errors.repeatPassword}</p>
        <br />
        <button className={styles.submitButton} type='submit'>Register</button>
      </form>
    </div>
  </div>
  );
}
