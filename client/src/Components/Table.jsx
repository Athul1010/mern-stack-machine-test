import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Table.css';
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Table = () => {
  const [getuserdata, setUserdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/getdata`);
      setUserdata(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteuser = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/deleteuser/${id}`);
      getdata(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredData = getuserdata.filter(user =>
    user.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <Navbar />
      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <Link to='/register' className='btn btn-primary'>Add data</Link>
            <div>
              <label htmlFor="search">Search</label>
              <input
                type="text"
                id="search"
                placeholder='Enter search keyword'
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <table className="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">ID</th>
                <th scope="col">Image</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Job</th>
                <th scope="col">Number</th>
                <th scope="col">Gender</th>
                <th scope="col">Courses</th>
                <th scope="col">Create Date</th> 
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((element, id) => (
                  <tr key={element._id}>
                    <th scope="row">{id + 1}</th>
                    <td><img src={`uploads/${element.image}`} alt="user-image" width="50" /></td>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.work}</td>
                    <td>{element.mobile}</td>
                    <td>{element.gender}</td>
                    <td>{element.course}</td>
                    <td>{new Date(element.createdAt).toLocaleDateString()}</td> {/* Format and display date */}
                    <td className='d-flex justify-content-between'>
                      <Link to={`edit/${element._id}`}>
                        <button className='btn btn-primary'><MdEdit /></button>
                      </Link>
                      <button className='btn btn-danger' onClick={() => deleteuser(element._id)}><MdDelete /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No users found</td> {/* Adjust colspan */}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
