import { useFormik } from "formik";
import bcrypt from "bcryptjs";
import { v4 as generatedId } from "uuid";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";
import * as Yup from 'yup';

import UsersContext from "../contexts/UsersContext";
import { User, UsersContextTypes } from "../types";

const Register = () => {

  const { users, dispatch, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
      dob: ''
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
    <section>
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label
            htmlFor="username">Username:</label>
          <input
            type="text"
            name="username" id="username"
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
        <button type="submit">Register</button>
      </form>
      {
        error && <p>{error}</p>
      }
      <Link to="/login">Aleady have an account? Go login.</Link>
    </section>
  );
}

export default Register;