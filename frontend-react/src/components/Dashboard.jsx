//import axios from 'axios';
import React, {useEffect} from 'react'
import axiosInstance from '../axiosinstance'

const Dashboard = () => {

  useEffect(() => {
    const fetchProtectedData = async () => {

     try {
        const response = await axiosInstance.get('/protected-view')
        console.log("Protected data: ", response.data);
     } catch (error) {
        console.error("Error fetching protected data: ", error);
     }  
    }

    fetchProtectedData();    
  }, []);

  return (
    <div className='container text-light'>Dashboard</div>
  )
}

export default Dashboard