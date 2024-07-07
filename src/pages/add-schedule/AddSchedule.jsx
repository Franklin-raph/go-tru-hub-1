import React, { useEffect, useState } from 'react'
import TopNav from '../../components/top-nav/TopNav'
import SideNav from '../../components/side-nav/SideNav'
import { useNavigate, useParams } from 'react-router-dom'
import { IoChevronDownOutline } from "react-icons/io5";
import { FiLoader } from "react-icons/fi";
import Alert from '../../components/alert/Alert';
import BtnLoader from '../../components/btn-loader/BtnLoader';

const AddSchedule = ({baseUrl}) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [dropDown, setDropDown] = useState()
    const [day, setDay] = useState()
    const [course, setCourse] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [coordinators, setCoordinators] = useState()
    const { id } = useParams()
    const [allAssignments, setAllAssignments] = useState([])
    const [locations, setLocations] = useState({
        location: {
          lat: "",
          long: ""
        },
        endLocation: {
          lat: "",
          long: ""
        }
      });

      const handleStartLatChange = (e) => {
        setLocations({
          ...locations,
          location: {
            ...locations.location,
            lat: e.target.value
          }
        });
      };

      const handleStartLongChange = (e) => {
        setLocations({
          ...locations,
          location: {
            ...locations.location,
            long: e.target.value
          }
        });
      };
    
      const handleEndLatChange = (e) => {
        setLocations({
          ...locations,
          endLocation: {
            ...locations.endLocation,
            lat: e.target.value
          }
        });
      };
    
      const handleEndLongChange = (e) => {
        setLocations({
          ...locations,
          endLocation: {
            ...locations.endLocation,
            long: e.target.value
          }
        });
      };

      const [allStaffs, setAllStaffs] = useState()
      const user = JSON.parse(localStorage.getItem('user'))
      const days = ["monday", "tuesday", "wednesday", "thursday", "friday"]

      async function getAllStaffs(){
        const res = await fetch(`${baseUrl}/users/get-users/staffs`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data.users);
        setAllStaffs(data.data.users)
      }

      async function getAllAssignments(){
        const res = await fetch(`${baseUrl}/course`,{
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
            setAllAssignments(data.data);
            setAlertType('success');
            return;
        }
    }

      useEffect(() => {
        getAllStaffs()
        getAllAssignments()
      },[])

      async function createSchedule(){
        console.log({locations, course:course?._id, day, startTime, endTime});
      }

  return (
    <div>
        <SideNav />
        <div className="w-[78%] ml-auto pb-5 h-[100dvh]">
            <TopNav />
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate(`/time-table/${id}`)} className='cursor-pointer' />
                            <p className="text-[28px] text-primary-color font-[600]">Schedule assignment</p>
                        </div>
                        {/* <p className='text-[#4F4F4F]'>Enter your preferred bank account for wallet deposits</p> */}
                    </div>
                    {/* <div className='flex items-center gap-5'>
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate('/update-bank-account')}>Update Account</button>
                    </div> */}
                </div>
                <div className='flex item-center justify-center flex-col w-[90%] mx-auto'>
                    <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[1rem]'>
                        <div className='w-full relative'>
                            <label className='block text-left mb-2'>Select assignment</label>
                            <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                                <input type="text" value={course?.name} onChange={e => setCourse(e.target.value)} className='capitalize outline-none w-full rounded-[4px]'/>
                                <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown('assignment')} />
                            </div>
                            {
                                dropDown === "assignment" &&
                                <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[350px] overflow-y-scroll'>
                                    {
                                        allAssignments.map(assignment => {
                                            return (
                                                <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                    setDropDown(false)
                                                    setCourse(assignment)
                                                }}>{assignment.name}</p>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <div className='w-full relative'>
                            <label className='block text-left mb-2'>Select assignee(s)</label>
                            <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                                <input type="text" value={coordinators} onChange={e => setCoordinators(e.target.value)} className='capitalize outline-none w-full rounded-[4px]'/>
                                <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown('assignee')} />
                            </div>
                            {
                                dropDown === "assignee" &&
                                <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[350px] overflow-y-scroll'>
                                    {
                                        allStaffs.map(staff => {
                                            return (
                                                <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                    setDropDown(false)
                                                    // setBankDropDown(!bankDropDown)
                                                    // setBankCode(bank.code)
                                                }}>{staff.fullName}</p>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>

                    <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[1rem]'>
                        <div className='w-full relative'>
                            <label className='block text-left mb-2'>Select days</label>
                            <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                                <input type="text" value={day} onChange={e => setDay(e.target.value)} className='outline-none w-full rounded-[4px] capitalize'/>
                                <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown('days')} />
                            </div>
                            {
                                dropDown === 'days' &&
                                <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[350px] overflow-y-scroll'>
                                    {
                                        days.map(day => {
                                            return (
                                                <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                    setDay(day)
                                                    setDropDown(false)
                                                }}>{day}</p>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <div className='w-full relative'>
                            <label className='block text-left mb-2'>Time - range</label>
                            <div className='flex items-center gap-5'>
                                <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                                    <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className='outline-none w-full rounded-[4px]'/>
                                </div>
                                <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                                    <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className='outline-none w-full rounded-[4px]'/>
                                </div>
                            </div>
                            {/* {
                                bankDropDown &&
                                <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[350px] overflow-y-scroll'>
                                    {
                                        allBanks.map(bank => {
                                            return (
                                                <p className='cursor-pointer hover:bg-gray-300 p-2' onClick={() => {
                                                    setSelectedBank(bank.name)
                                                    setBankDropDown(!bankDropDown)
                                                    setBankCode(bank.code)
                                                }}>{bank.name}</p>
                                            )
                                        })
                                    }
                                </div>
                            } */}
                        </div>
                    </div>
                    <label className='block text-left mb-2'>Assignment location</label>
                    <div className='mb-5'>
                        <p className='text-[#19201D]'>Start Coordinates</p>
                        <div className='flex items-center gap-3'>
                        <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='Latitude'
                            value={locations.location.lat}
                            onChange={handleStartLatChange}
                        />
                        <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='Longitude'
                            value={locations.location.long}
                            onChange={handleStartLongChange}
                        />
                        </div>
                    </div>
                    <div className='mb-5'>
                        <p className='text-[#19201D]'>Stop Coordinates</p>
                        <div className='flex items-center gap-3'>
                        <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='Latitude'
                            value={locations.endLocation.lat}
                            onChange={handleEndLatChange}
                        />
                        <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='Longitude'
                            value={locations.endLocation.long}
                            onChange={handleEndLongChange}
                        />
                        </div>
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button className='text-white bg-primary-color w-full rounded-[4px] px-[35px] py-[16px] text-center mx-auto mb-10' onClick={createSchedule}>Proceed</button>
                    }
                </div>
            </div>
        </div>
        {
        msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default AddSchedule