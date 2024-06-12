import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';
import { useAuthStore } from '../../hooks';

const loginFormField = {
  email: '',
  password: ''
};

const loginValidationField = {
  email: [ (value) =>  value.includes('@')  , 'El correo electronico es incorrecto'],
  password: [(value) =>  value.length >= 6 , 'La contraseña debe contener mas de 6 caracteres']
};

export const LoginPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { startLogin, errorMessage } = useAuthStore();
  const { email, password, onInputChange, formState, emailValid, passwordValid, isFormValid } = useForm(loginFormField, loginValidationField);



  const loginSubmit = (e) => {
    e.preventDefault();

    setFormSubmitted(true);
    console.log(isFormValid)

    if(!isFormValid) return;

    startLogin(formState);

    setFormSubmitted(false);    
  }

  return (

    <div className="login-form-1">
      <h3 className='heading-login'>Ingreso</h3>
      <form onSubmit={ loginSubmit }>
        <div className="form-group mb-3">
          <input
            type="text"
            className={`form-control input-padding ${ (emailValid && formSubmitted) && emailValid }`}
            placeholder="Correo"
            name="email"
            value={ email }
            onChange={ onInputChange }
          />
        </div>
        <div className="form-group heigth-p">
          <input
            type="password"
            className={`form-control mb-2 input-padding ${ (passwordValid && formSubmitted) && passwordValid  }`}
            placeholder="Contraseña"
            name="password"
            value={ password }
            onChange={ onInputChange }
          />
          <div className="msn-error" style={{ display: (!!errorMessage) ? '' : 'none' }}>
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="ms-1">{ errorMessage }</span>
          </div>
        </div>
        <div className="form-group btnSubmit-container">
          <input type="submit" className="btnSubmit" value="Login" />
          <Link to="register" className="btn btnSubmit" type="button">Registrarse</Link>
        </div>
      </form>
    </div>

  )
}

