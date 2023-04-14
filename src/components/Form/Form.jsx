import { useState } from 'react'
import validation from '../Validation'
import styleForm from './Form.module.css'


const Form = ({login}) => {
    const [userData, setUserData] = useState({
        email : '',
        password : ''
     })

     const [errors, setErrors] = useState({
        email : '',
        password : ''
     })

     const handleChange = (event) => {
        setUserData({...userData,
        [event.target.name]: event.target.value})
        setErrors(
            validation({...userData,
                [event.target.name]: event.target.value
            })
        )
     }

     const handleSubmit = (event) => {
        event.preventDefault()
        login(userData)
     }

     const buttonDisable = (userData,errors) => {
        let disable = false;
        if(!userData.email || !userData.password) disable = true;
        if(errors.email || errors.password) disable = true;
        return disable
     } 

    return(

            <form onSubmit={handleSubmit} className={styleForm.container}>
                <div className={styleForm.containerInput}>
                    <label className={styleForm.label} htmlFor="email">Email: </label>
                    <input className={styleForm.input} type="email" value={userData.email} placeholder='Ingrese su email' onChange={handleChange} name='email'/>
                    {errors.email && <p className={styleForm.error}>{errors.email}</p>}
                </div>

                <div className={styleForm.containerInput}>
                    <label className={styleForm.label} htmlFor="password">Password</label>
                    <input className={styleForm.input} type="password" value={userData.password} placeholder='Ingrese su password' onChange={handleChange} name='password'/>
                    {errors.password && <p className={styleForm.error}>{errors.password}</p>}
                </div>

                <button className={styleForm.buttons} disabled={buttonDisable(userData,errors)}>Submit</button>
            </form>

    )
}

export default Form;