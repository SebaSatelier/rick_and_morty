import { useState } from 'react'
import validation from '../Validation'



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

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email: </label>
            <input type="email" value={userData.email} placeholder='Ingrese su email' onChange={handleChange} name='email'/>
            {errors.email && <p>{errors.email}</p>}

            <label htmlFor="password"></label>
            <input type="password" value={userData.password} placeholder='Ingrese su password' onChange={handleChange} name='password'/>
            {errors.password && <p>{errors.password}</p>}

            <button>Submit</button>
        </form>
    )
}

export default Form;