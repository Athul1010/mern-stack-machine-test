import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Register.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [work, setWork] = useState('');
  const [add, setAdd] = useState('');
  const [desc, setDesc] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState('');
  const [image, setImage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('work', work);
    formData.append('add', add);
    formData.append('desc', desc);
    formData.append('gender', gender);
    formData.append('course', course);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert('Registration successful');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed');
    }
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setCourse(selectedCourse);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        <Link to={'/'}>home</Link>
        <h1 className='mt-4'>Register</h1>
        <form className='mt-4' onSubmit={handleRegister}>
          <div className='row'>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name='name'
                className="form-control"
                id="name"
              />
            </div>

            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name='email'
                className="form-control"
                id="email"
                required
              />
            </div>

            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="mobile" className="form-label">Mobile</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                name='mobile'
                className="form-control"
                id="mobile"
              />
            </div>

            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="work" className="form-label">Work</label>
              <input
                type="text"
                value={work}
                onChange={(e) => setWork(e.target.value)}
                name='work'
                className="form-control"
                id="work"
              />
            </div>

            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label className="form-label">Gender</label>
              <div>
                <input
                  type="radio"
                  value="Male"
                  onChange={(e) => setGender(e.target.value)}
                  name='gender'
                  id="male"
                />
                <label htmlFor="male" className="form-label">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  value="Female"
                  onChange={(e) => setGender(e.target.value)}
                  name='gender'
                  id="female"
                />
                <label htmlFor="female" className="form-label">Female</label>
              </div>
            </div>

            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label className="form-label">Course</label>
              <div>
                <input
                  type="checkbox"
                  value="MCA"
                  checked={course === "MCA"}
                  onChange={handleCourseChange}
                  name='course'
                  id="mca"
                />
                <label htmlFor="mca" className="form-label">MCA</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="BCA"
                  checked={course === "BCA"}
                  onChange={handleCourseChange}
                  name='course'
                  id="bca"
                />
                <label htmlFor="bca" className="form-label">BCA</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="BSC"
                  checked={course === "BSC"}
                  onChange={handleCourseChange}
                  name='course'
                  id="bsc"
                />
                <label htmlFor="bsc" className="form-label">BSC</label>
              </div>
            </div>

            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="add" className="form-label">Address</label>
              <input
                type="text"
                value={add}
                onChange={(e) => setAdd(e.target.value)}
                name='add'
                className="form-control"
                id="add"
              />
            </div>

            <div className="mb-3 col-lg-12 col-md-12 col-12">
              <label htmlFor="desc" className="form-label">Description</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                name="desc"
                className='form-control'
                id="desc"
                cols="30"
                rows="5"
              ></textarea>
            </div>

            <div className="mb-3 col-lg-12 col-md-12 col-12">
              <label htmlFor="image" className="form-label">Upload Image</label>
              <input
                type="file"
                accept=".jpg, .png"
                onChange={handleImageChange}
                name='image'
                className="form-control"
                id="image"
              />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
