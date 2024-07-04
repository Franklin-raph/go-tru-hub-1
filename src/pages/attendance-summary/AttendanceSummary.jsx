import React, { useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom'

const AttendanceSummary = () => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [allSessions, setAllSessions] = useState([])

  return (
    <div>
        <SideNav />
        <div className="w-[78%] ml-auto pb-5">
            <TopNav />
            <div className="bg-[#F7F7F7]">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/')} className='cursor-pointer' />
                        <p className="text-[28px] text-primary-color font-[600]">Attendance Summary</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        {/* <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate('/create-session')}>Create Session</button> */}
                    </div>
                </div>
                <div className='px-[30px]'>
                    <p className='text-[#19201D] text-[18px] font-[600] mb-3'>All Sessions</p>
                    {
                        allSessions.length < 1 &&
                        <div className="flex items-center gap-5 justify-center text-center px-[3rem]">
                            <p>Create new sessions before updating members' units to ensure session data is accurately collated using units and their members.</p>
                        </div>
                    }
                    {
                        allSessions && allSessions.map((session) => (
                            <div className='flex items-center justify-between p-3 shadow rounded-[8px] my-4 bg-white'>
                                <p>{session.name}</p>
                                <button onClick={() => navigate(`/semester-result-info/${session._id}`)} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px]'>View</button>
                            </div>
                        )).reverse()
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default AttendanceSummary