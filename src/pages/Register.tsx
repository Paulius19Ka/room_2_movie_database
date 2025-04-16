import { useFormik } from "formik";
import bcrypt from "bcryptjs";
import { v4 as generatedId } from "uuid";
import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import * as Yup from 'yup';
import styled from "styled-components";

import SkeletonBlock from '../UI/atoms/SkeletonBlock';
import UsersContext from "../contexts/UsersContext";
import { User, UsersContextTypes } from "../types";

const StyledRegister = styled.section`
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
    input[type="submit"],
    input[type="email"],
    input[type="date"],
    input[type="url"] {
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    }
    
    >div {
      margin-bottom: 10px;
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

const Register = () => {

  const { users, dispatch, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
      dob: '',
      profilePicture: '',
      watchlistItems: []
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, 'Username must be at least 5 symbols length')
        .max(20, 'Username must be shorter than 20 symbols')
        .required('Field cannot be empty')
        .trim(),
      email: Yup.string()
        .email('Must be a valid email')
        .required('Field cannot be empty')
        .trim(),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,20}$/,
          'Password must contain at least one: lower case character, upper case character, number, special symbol AND must be between 7 and 20 symbols length.')
        .required('Field cannot be empty')
        .trim(),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password')], 'passwords do not match')
        .required('Field cannot be empty')
        .trim(),
      dob: Yup.date()
        .min(new Date(1900), 'Date must be later than 1900')
        .max(new Date(new Date().setFullYear(new Date().getFullYear() - 14)), 'you must be at leats 14 years old')
        .required(),
      profilePicture: Yup.string()
        .url('profile image must be a valid URL')
        .matches(
          /\.png|\.jpg|\.jpeg|\.webm|\.svg$/i,
          'URL must be an image')
        .trim()
        .default('https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg')
    }),
    onSubmit: (values) => {
      if (users.find(user =>
        user.email === values.email || user.username === values.username
      )) {
        setError('This user already exists');
        return;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordRepeat, ...rest } = values;
        const newUser: User = {
          ...rest,
          id: generatedId(),
          passwordText: rest.password,
          password: bcrypt.hashSync(rest.password, 10),
          profilePicture: rest.profilePicture || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
          role: 'user'
        }
        setLoggedInUser(newUser);
        dispatch({
          type: 'addUser',
          newUser: newUser
        });
        formik.resetForm();
        navigate('/')
      }
    }
  });

  return (
    <StyledRegister>
      <h2>Register</h2>
      {loading ? (
        <SkeletonBlock variant="register" />
      ) : (
        <>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="username">Username:</label>
              <input
                type="text"
                name="username" id="username"
                placeholder="Create username"
                value={formik.values.username}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {
                formik.touched.username && formik.errors.username &&
                <p>{formik.errors.username}</p>
              }
            </div>
            <div>
              <label
                htmlFor="email">Email:</label>
              <input
                type="email"
                name="email" id="email"
                placeholder='Enter your email'
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {
                formik.touched.email && formik.errors.email &&
                <p>{formik.errors.email}</p>
              }
            </div>
            <div>
              <label
                htmlFor="">Password:</label>
              <input
                type="password"
                name="password" id="password"
                placeholder='Create password'
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {
                formik.touched.password && formik.errors.password &&
                <p>{formik.errors.password}</p>
              }
            </div>
            <div>
              <label
                htmlFor="passwordRepeat">Password Repeat:</label>
              <input
                type="password"
                name="passwordRepeat" id="passwordRepeat"
                placeholder='Repeat password'
                value={formik.values.passwordRepeat}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {
                formik.touched.passwordRepeat && formik.errors.passwordRepeat &&
                <p>{formik.errors.passwordRepeat}</p>
              }
            </div>
            <div>
              <label
                htmlFor="dob">Date of birth:</label>
              <input
                type="date"
                name="dob" id="dob"
                value={formik.values.dob}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {
                formik.touched.dob && formik.errors.dob &&
                <p>{formik.errors.dob}</p>
              }
            </div>
            <div>
              <label
                htmlFor="profilePicture">Profile picture:</label>
              <input
                type="url"
                name="profilePicture" id="profilePicture"
                placeholder="Enter a valid URL"
                value={formik.values.profilePicture}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {
                formik.touched.profilePicture && formik.errors.profilePicture &&
                <p>{formik.errors.profilePicture}</p>
              }
            </div>
            <input type="submit" value="Register" />
          </form>
          {
            error && <p>{error}</p>
          }
          <Link to="/login">Aleady have an account? Go login.</Link>
        </>
      )}
    </StyledRegister>
  );
};

export default Register;
