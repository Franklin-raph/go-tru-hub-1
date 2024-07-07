import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate, useParams } from 'react-router-dom'

const TimeTable = ({baseUrl}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [allSchedules, setAllSchedules] = useState([])
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const { id } = useParams()

    async function getAllSessions(){
        const res = await fetch(`${baseUrl}/schedule/${id}`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data);
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
        if(res.ok){
            setAllSchedules(data.data);
            setAlertType('success');
            return;
        }
    }

    useEffect(() => {
        getAllSessions()
    },[])

  return (
    <div>
        <SideNav />
        <div className="w-[78%] ml-auto pb-5">
            <TopNav />
            <div className="bg-[#F7F7F7]">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/')} className='cursor-pointer' />
                        <p className="text-[28px] text-primary-color font-[600]">Time Table</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate(`/create-schedule/${id}`)}>Schedule assignment</button>
                    </div>
                </div>
                <div className='px-[30px]'>
                    <div className='flex items-center justify-between pb-3'>
                        <p className='text-[#19201D] text-[18px] font-[600]'>Time Table</p>
                        <p className='text-[#828282] text-[18px] font-[600]'>Total Assignments - {allSchedules?.length}</p>
                    </div>
                    {
                        allSchedules.length < 1 &&
                        <div className="flex items-center gap-5 justify-center text-center px-[3rem]">
                            <p>Create new sessions before updating members' units to ensure session data is accurately collated using units and their members.</p>
                        </div>
                    }
                    <div class="relative overflow-x-auto mx-5 mt-10 p-8">
                        <table class="w-full text-sm text-left rtl:text-left">
                            <thead class="text-[14px] border-b">
                                <tr>
                                    <th scope="col" class="py-3 th1 font-[700]">Day</th>
                                    <th scope="col" class="py-3 font-[700]">Course</th>
                                    <th scope="col" class="py-3 font-[700]">Start Time</th>
                                    <th scope="col" class="py-3 font-[700]">End Time</th>
                                    <th scope="col" class="py-3 font-[700]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allSchedules && allSchedules.map((schedule) => (
                                        <tr className='text-[#19201D]'>
                                            <td className='py-3 capitalize'>{schedule.day}</td>
                                            <td>{schedule?.course?.course?.name}</td>
                                            <td>{schedule?.startTime}</td>
                                            <td>{schedule?.endTime}</td>
                                            <td>
                                                <button onClick={() => navigate(`/session-info/${schedule._id}`)} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px]'>View</button>
                                            </td>
                                        </tr>
                                    )).reverse()
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        allSchedules && allSchedules.map((schedule) => (
                            <div className='flex items-center justify-between p-3 shadow rounded-[8px] my-4 bg-white'>
                                <p>{schedule.name}</p>
                                {/* <button onClick={() => navigate(`/create-semester/${session._id}`)} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px]'>Create Semester</button> */}
                                
                            </div>
                        )).reverse()
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimeTable