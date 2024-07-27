import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import '../Styles/Table.css';
import { CiRead } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const Table = () => {
    const [getuserdata, setUserdata] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch user data
    const getdata = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/getdata`);
            setUserdata(result.data); // Assuming result.data is the desired data structure
            console.log("get data", result.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getdata();
    }, []); // Empty dependency array to run once when the component mounts

    // Delete user
    const deleteuser = async (id) => {
        const res2 = await fetch(`http://localhost:8003/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log(deletedata);
        } else {
            console.log("user deleted");
            getdata(); // Refresh data after deletion
        }
    }

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // Filter users based on search term
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
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((element, id) => (
                                    <tr key={element._id}>
                                        {/* "id+1" koduthath oronn details varumbozum 1,2,3,4,....angane pokan */}
                                        <th scope="row">{id + 1}</th>
                                        <td>{element?.image}</td>
                                        <td>{element?.name}</td>
                                        <td>{element?.email}</td>
                                        <td>{element?.work}</td>
                                        <td>{element?.mobile}</td>
                                        <td>{element?.gender}</td>
                                        <td>{element?.course}</td>
                                        <td className='d-flex justify-content-between'>
                                            <Link to={`edit/${element._id}`}>
                                                <button className='btn btn-primary'>
                                                    <MdEdit />
                                                </button>
                                            </Link>
                                            <button className='btn btn-danger' onClick={() => deleteuser(element._id)}>
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9">No users found</td>
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
