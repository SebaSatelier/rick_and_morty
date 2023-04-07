const regexpEmail = /^[^@]+@[^@]+\.[^@]+$/;

const regexpPassword = /^(?=.*\d)(?=.*[a-zA-Z]).{6,10}$/;

const validation = (input)=>{
    const errors = {}
        if(!input.email || !regexpEmail.test(input.email) 
            || input.email.length > 35)  errors.email = `Ingrese un e-mail valido`;     
        if(!regexpPassword.test(input.password)) errors.password = `Ingrese un password valido`;

    return errors;
}

export default validation;