import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [work, setWork] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailPattern.test(email)) {
      newErrors.email = 'Valid email is required';
    }

    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d+$/.test(mobile)) {
      newErrors.mobile = 'Mobile number must be digits only';
    }

    if (!work.trim()) {
      newErrors.work = 'Work designation is required';
    }

    if (!gender) {
      newErrors.gender = 'Gender is required';
    }

    if (course.length === 0) {
      newErrors.course = 'At least one course must be selected';
    }

    if (!image) {
      newErrors.image = 'Image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('work', work);
    formData.append('gender', gender);
    formData.append('course', course.join(','));
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Registration successful');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed');
    }
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCourse([...course, value]);
    } else {
      setCourse(course.filter((c) => c !== value));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validExtensions = ['jpg', 'png'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (validExtensions.includes(fileExtension)) {
      setImage(file);
      setImageError('');
      setImageUrl(URL.createObjectURL(file));
    } else {
      setImageError('Only JPG or PNG images are supported.');
      setImage(null);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        <Link to={'/table'}>Home</Link>
        <h1 className='mt-4'>Create Employee</h1>
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
              {errors.name && <p className="text-danger">{errors.name}</p>}
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
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
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
              {errors.mobile && <p className="text-danger">{errors.mobile}</p>}
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="work" className="form-label">Designation</label>
              <input
                type="text"
                value={work}
                onChange={(e) => setWork(e.target.value)}
                name='work'
                className="form-control"
                id="work"
              />
              {errors.work && <p className="text-danger">{errors.work}</p>}
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
              {errors.gender && <p className="text-danger">{errors.gender}</p>}
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label className="form-label">Course</label>
              <div>
                <input
                  type="checkbox"
                  value="MCA"
                  checked={course.includes("MCA")}
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
                  checked={course.includes("BCA")}
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
                  checked={course.includes("BSC")}
                  onChange={handleCourseChange}
                  name='course'
                  id="bsc"
                />
                <label htmlFor="bsc" className="form-label">BSC</label>
              </div>
              {errors.course && <p className="text-danger">{errors.course}</p>}
            </div>
            
            <div className="mb-3 col-lg-12 col-md-12 col-12">
              <label htmlFor="image" className="form-label">Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                name='image'
                className="form-control"
                id="image"
              />
              {errors.image && <p className="text-danger">{errors.image}</p>}
              {imageError && <p className="text-danger">{imageError}</p>}
              {imageUrl && (
                <img src={imageUrl} alt="Uploaded" className="img-thumbnail mt-3" style={{ maxWidth: '200px' }} />
              )}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
