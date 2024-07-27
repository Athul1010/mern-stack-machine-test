import React, { useEffect, useState } from 'react'
import '../Styles/Details.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Navbar from './Navbar'
import profile from '../Assets/profile.png'
import { MdMailOutline } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';

const Details = () => {

  //eye nte icon click cheyyumbol oro "id" kk anusarich details varan
  const { id } = useParams("")
  console.log(id);

  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const getdata = async (e) => {

    const res = await fetch(`http://localhost:8003/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });


    // backend il varunnath success aano failure aano enn nokki aa varunnath frontend il varan
    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      console.log("error");
    } else {
      setUserdata(data)
      console.log("get data");
    }
  }

  //details nte page open aakmbol call cheyyan, ith aayal aan "getdata()" work aakua
  useEffect(() => {
    getdata();
  })


  // ...............ith Table.jsx il ninn copy cheyyunnathaan..............

  const deleteuser = async (id) => {
    const res2 = await fetch(`http://localhost:8003/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json"
      }
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log(deletedata);
    } else {
      console.log("user deleted");
      
    }
  }

  // ...............ith Table.jsx il ninn copy cheyyunnathaan..............


  return (
    <div>
      <Navbar />
      <div className='container'>
        <h1 style={{ fontWeight: 400 }}>Welcome Harsh Pathak</h1>

        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <div className="add_btn">

              {/* edit cheyyunnathinte path aan ith */}
              <Link to={`/edit/${getuserdata._id}`}><button className='btn btn-primary mx-2'><MdEdit /></button></Link>

              <button className='btn btn-danger' onClick={() => deleteuser(getuserdata._id)}><MdDelete /></button>
            </div>

            <div className='row'>
              <div className="left_view col-lg-6 col-md-6 col-sm-12">
                <img src={profile} style={{ width: 50 }} alt="" />
                <h3 className='mt-3'>Name: <span>{getuserdata.name}</span></h3>
                <h3 className='mt-3'>Age: <span>21</span></h3>
                <p className='mt-3'><MdMailOutline />Email: <span>{getuserdata.name}</span></p>
                <p className='mt-3'><MdWork />Occupation: <span>{getuserdata.work}</span></p>
              </div>

              <div className="right_view col-lg-6 col-md-6 col-sm-12">

                <p className='mt-5'><FaMobileAlt />Mobile: <span>{getuserdata.mobile}</span></p>
                <p className='mt-3'><FaLocationDot />Location: <span>{getuserdata.add}</span></p>
                <p className='mt-3'>Description: <span>{getuserdata.desc}</span></p>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Details
