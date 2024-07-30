import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../components/alert/Alert'

const StudentId = ({baseUrl}) => {

    const user = JSON.parse(localStorage.getItem('user'))
    const [toggleNav, setToggleNav] = useState(false)
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const { id } = useParams()
    const navigate = useNavigate();
    const [userId, setUserId] = useState()
    const [companyName, setCompanyName] = useState()

    async function getUserInfo(){
        const res = await fetch(`${baseUrl}/users/get-user/${id}`,{
            headers:{
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        setUserId(data.data.user)
        console.log(data.data.user)
    }

    async function getCompanyProfile(){
        console.log(`${baseUrl}/profile/get-profile/${id}`,user.data.access_token);
        const res = await fetch(`${baseUrl}/profile/get-profile`,{
            headers:{
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        setCompanyName(data.data.nameOfEstablishment)
        console.log(data.data.nameOfEstablishment)
    }

    useEffect(() => {
        getCompanyProfile()
        getUserInfo()
    },[])

  return (
    <div className='h-[100vh]'>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/')} className='cursor-pointer' />
                        <p className="text-[24px] lg:text-[28px] text-primary-color font-[600]">Member Id</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        {/* <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate('/create-session')}>Create Session</button> */}
                    </div>
                </div>
            </div>

            <div className="w-64 h-96 bg-white rounded-lg shadow-md flex flex-col items-center mx-auto p-4">
    <div className="w-full flex justify-center items-center mb-4 text-center">
        <span className="text-lg font-bold">{companyName}</span>
    </div>
    <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            {/* {userId?.profileImage?.file} */}
            {
                userId &&
                <img
                    src={userId?.profileImage?.file}
                    alt="Elizabeth Johnson"
                    className="w-full h-full object-cover"
                />
            }
        </div>
        <div className="text-center">
        {/* <h2 className="text-xl font-semibold">Elizabeth Johnson</h2> */}
        <p className="text-md text-gray-600 font-semibold capitalize">{userId?.role}</p>
        </div>
    </div>
    <div className="mt-auto">
        {
            userId &&
            <img
                src={userId?.passQrcode}
                alt="QR Code"
                className="w-[180px] h-[180px]"
            />
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

export default StudentId