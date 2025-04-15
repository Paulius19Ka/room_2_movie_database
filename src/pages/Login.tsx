import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';
import styled from 'styled-components';

import UsersContext from '../contexts/UsersContext';
import { UsersContextTypes } from '../types';

const StyledLogin = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  >h2 {
    text-align: center;
    color: yellow;
  }

  >form {
    display: grid;
    flex-direction: column;
    align-items: flex-start;
    color: yellow;
    width: 300px;

    input[type="text"],
    input[type="password"],
    input[type="submit"] {
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    }
    
    >div {
      margin-bottom: 10px;

      >label.loggedIn {
        font-size: 12px;
      }
    }

    >input[type="submit"] {
      color: yellow;
    }

  }
  > a {
    margin-top: 12px;
    color: yellow;
    font-size: 14px;
    text-decoration: underline;

    &:hover {
      text-decoration: underline;
      color: gold;
    }
  }
`

const Login = () => {

  const { users, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      stayLoggedIn: false
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email()
        .required('Field cannot be empty')
        .trim(),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,20}$/,
          'Password must contain at least one: lower case character, upper case character, number, special symbol AND must be between 7 and 20 symbols length.'
        )
        .required('Field cannot be empty')
        .trim('Empty spaces are ignored')

    }),
    onSubmit: (values) => {
      if (users) {
        const foundUser = users.find(user =>
          user.email === values.email &&
          bcrypt.compareSync(values.password, user.password)
        );
        if (foundUser) {
          if (values.stayLoggedIn) {
            localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
          }
          setLoggedInUser(foundUser);
          navigate('/');
        } else {
          setError('No such user, wrong username or password')
        }
      }
    }
  })

  return (
    <StyledLogin>
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label
            htmlFor="email"
          >Email: </label>
          <input
            type="text"
            name='email' id='email'
            placeholder='Enter your email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.errors.email && formik.touched.email &&
            <p>{formik.errors.email}</p>
          }
        </div>
        <div>
          <label
            htmlFor="password"
          >Password: </label>
          <input
            type="password"
            name='password' id='password'
            placeholder='Enter your password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.errors.password && formik.touched.password &&
            <p>{formik.errors.password}</p>
          }
        </div>
        <div>
          <input
            type="checkbox"
            name="stayLoggedIn" id="stayLoggedIn"
            checked={formik.values.stayLoggedIn}
            onChange={formik.handleChange}
          />
          <label htmlFor="stayLoggedIn" className='loggedIn'>Stay Logged In</label>
        </div>
        <input type="submit" value="Login" />
      </form>
      {
        error && <p>{error}</p>
      }
      <Link to="/register">Don't have an account yet? Go create one.</Link>
    </StyledLogin>
  );
}

export default Login;
