import { Outlet } from 'react-router-dom';

export const AuthLayout = ({ title }) => {
  return (
    <div className='login-container container-fluid'>
      <div className="row">
        <h1 className="heading-main">Calendar App</h1>
      </div>
      <div className="container-lg">
        <div className="row login">
          <div className="col-md-6">
            

            <Outlet />
            
          </div>

          <div className="col-md-6 d-flex justify-content-center">
            <img src="./../assets/calendar-login.png" className="img-calendar" alt="Calendar" width="400" height="400"/>
          </div>
        </div>
      </div>
    </div>
  )
}

