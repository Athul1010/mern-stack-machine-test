import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Edit.css';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';

const Edit = () => {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [work, setWork] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState('');

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:8003/getuser/${id}`);
      const data = response.data;

      setName(data.name);
      setEmail(data.email);
      setMobile(data.mobile);
      setWork(data.work);
      setGender(data.gender);
      setCourse(data.course); // Assuming course data is also fetched
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    const updatedData = {
      name,
      email,
      mobile,
      work,
      gender,
      course
    };

    try {
      const response = await axios.patch(`http://localhost:8003/updateuser/${id}`, updatedData);
      console.log("User updated:", response.data);
      alert("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Update failed");
    }
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setCourse(selectedCourse);
  };

  return (
    <div>
      <Navbar/>
      <div className='container'>
        
        <Link to={'/table'}>Home</Link>
        <form className='mt-4'>
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
              <label htmlFor="work" className="form-label">Designation</label>
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
                  checked={gender === 'Male'}
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
                  checked={gender === 'Female'}
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
                  checked={course === 'MCA'}
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
                  checked={course === 'BCA'}
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
                  checked={course === 'BSC'}
                  onChange={handleCourseChange}
                  name='course'
                  id="bsc"
                />
                <label htmlFor="bsc" className="form-label">BSC</label>
              </div>
            </div>
  
            <button type="submit" onClick={updateUser} className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Edit;
