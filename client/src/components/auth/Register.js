import React, { Fragment, useState } from "react";
import axios from "axios";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    number: "",
    country: "",
    city: "",
    address: "",
    description: "",
    password: "",
    password2: ""
  });
  const {
    name,
    email,
    password,
    password2,
    website,
    number,
    country,
    city,
    description,
    address
  } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Password do not match");
    } else {
      const newUser = {
        name,
        email,
        password,
        website,
        number,
        country,
        city,
        description,
        address
      };
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        const body = JSON.stringify(newUser);
        const res = await axios.post("/api/companies", body, config);
        console.log(res.data);
      } catch (error) {
        console.error(error.response.data);
      }
    }
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={e => onChange(e)}
            value={email}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="number"
            name="number"
            value={number}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="country"
            name="country"
            value={country}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="city"
            name="city"
            value={city}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="address"
            name="address"
            value={address}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </Fragment>
  );
};

export default Register;
