import styles from "./Form.module.css";
import {useState} from 'react'
import {validation} from './validation'
import loginImage from './img/loginimage.png'

export default function Form(props) {
  
  const {handleLogin} = props
  const [userData,setUserData] = useState({email:'',password:''})
  const [errors,setErrors] = useState({email:'',password:''})

  const handleChange = (event) => {
    const property = event.target.name
    setUserData({...userData,[property]:event.target.value})
    setErrors(validation({...userData,[property]:event.target.value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(userData)
  }

  return (
  <div className={styles.formContainer}> 
    <div className={styles.formDiv}>
      <div className={styles.titleContainer}>
        <h1>Please login</h1>
        <img className={styles.loginImg} src={loginImage} alt="Login" />
      </div>
      <form className = {styles.form} onSubmit={handleSubmit}>
        <label htmlFor="">Email: </label>
        <input className={styles.input} type="email" name="email" placeholder='Type your email address...' onChange={handleChange} value={userData.email}/>
        <p className={styles.warning}>{errors.email}</p>
        <br />
        <label htmlFor="">Password: </label>
        <input className={styles.input} type="password" name="password" placeholder='Type your password...' onChange={handleChange} value={userData.password}/>
        <p className={styles.warning}>{errors.password}</p>
        <br />
        <button className={styles.submitButton} type='submit'>Submit</button>
      </form>
    </div>
  </div>
  );
}
