import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import '../Styles/Table.css'
import { CiRead } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const Table = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

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


    // ..........................delete functionality...........................

    const deleteuser = async (id) =>{
        const res2 = await fetch(`http://localhost:8003/deleteuser/${id}`,{
            method:"DELETE",
            headers: {
                "content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log(deletedata);
        }else{
            console.log("user deleted");
            getdata(); // delete aayi kazhinjal veedum "getdata();" ne call cheyym
        }
    }

    // ..........................delete functionality...........................


    return (
        <div>
            <Navbar />
            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <Link to='/register' className='btn btn-primary'>Add data</Link>
                    </div>

                    <table class="table">
                        <thead>
                            <tr class="table-dark">
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

                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
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

                                                    {/* App.js il ulla path aan ith */}

                                                    <Link to={`edit/${element._id}`}><button className='btn btn-primary'><MdEdit /></button></Link>
                                                    <button className='btn btn-danger' onClick={()=>deleteuser(element._id)}><MdDelete /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Table
