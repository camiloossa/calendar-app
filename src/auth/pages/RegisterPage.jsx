import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks/useAuthStore';

const registerFormField = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const registerFormValidating = {
  username: [(value) => value.length >= 1, 'is-invalid'],
  email: [(value) => value.includes('@'), 'is-invalid'],
  password: [(value) => value.length >= 6, 'is-invalid'],
  confirmPassword: [(value) => value.length >= 6, 'is-invalid']
};

// TODO: Crear validaciones al  registrar usuario

export const RegisterPage = () => {

  const refCampo = useRef();
  const [formSubmitted, setformSubmitted] = useState(false);
  const { username, email, password, confirmPassword, formState, onInputChange, onResetForm, usernameValid, emailValid, passwordValid, confirmPasswordValid, isFormValid } = useForm( registerFormField, registerFormValidating );

  const { startRegister, errorMessage } = useAuthStore();

  useEffect(() => {
    if(errorMessage !== undefined) {
      Swal.fire('Ocurrio un error durante el Registro', errorMessage, 'error');
      onResetForm();      
    }
  }, [errorMessage])


  const registerSubmit = (e) => {
    e.preventDefault();

    if( password !== confirmPassword){
      Swal.fire('Error en el Registro', 'Las contraseñas no son iguales', 'error');
      return;
    }

    setformSubmitted(true);

    if(!isFormValid) return;

    startRegister(formState);

    setformSubmitted(false);
    refCampo.current.focus();
  }

  return (
    <div className="login-form-1">
      <h3 className='heading-login'>Registro</h3>
      <form onSubmit={ registerSubmit }>
        <div className="form-group mb-3">
          <input
            ref={ refCampo }
            type="text"
            className={`form-control p-2 ${ (usernameValid && formSubmitted) && usernameValid }`}
            placeholder="Nombre"
            name="username"
            value={ username }
            onChange={ onInputChange }
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="email"
            className={`form-control p-2 ${ (emailValid && formSubmitted) && emailValid }`}
            placeholder="Correo"
            name="email"
            value={ email }
            onChange={ onInputChange }
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            className={`form-control p-2 ${ (passwordValid && formSubmitted) && passwordValid }`}
            placeholder="Contraseña"
            name="password"
            value={ password }
            onChange={ onInputChange }
          />
        </div>

        <div className="form-group mb-3">
          <input
            type="password"
            className={`form-control p-2 ${ (confirmPasswordValid && formSubmitted) && confirmPasswordValid }`}
            placeholder="Repita la contraseña"
            name="confirmPassword"
            value={ confirmPassword }
            onChange={ onInputChange }
          />
        </div>       
        <div className="form-group btnSubmit-container mt-5">
          <input type="submit" className="btnSubmit" value="Crear cuenta" />
        </div>
        <div className="text-end mt-3">
          <Link to="/auth" className="btn-register">¿Ya tienes cuenta?<strong className="text-underline"> Ingresa ahora</strong></Link>
        </div>
      </form>
    </div>
  )
}

