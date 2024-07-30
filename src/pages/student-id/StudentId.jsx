import React, { useEffect, useState } from 'react';
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../../components/alert/Alert';

const StudentId = ({ baseUrl }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [toggleNav, setToggleNav] = useState(false);
  const [msg, setMsg] = useState('');
  const [alertType, setAlertType] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [companyName, setCompanyName] = useState('');
  const [bgColor, setBgColor] = useState('#F2FCF8');
  const [textColor, setTextColor] = useState('#333');

  async function getUserInfo() {
    const res = await fetch(`${baseUrl}/users/get-user/${id}`, {
      headers: {
        Authorization: `Bearer ${user.data.access_token}`,
      },
    });
    const data = await res.json();
    setUserId(data.data.user);
    console.log(data.data.user);
  }

  async function getCompanyProfile() {
    console.log(`${baseUrl}/profile/get-profile/${id}`, user.data.access_token);
    const res = await fetch(`${baseUrl}/profile/get-profile`, {
      headers: {
        Authorization: `Bearer ${user.data.access_token}`,
      },
    });
    const data = await res.json();
    setCompanyName(data.data.nameOfEstablishment);
    console.log(data.data.nameOfEstablishment);
  }

  useEffect(() => {
    getCompanyProfile();
    getUserInfo();
  }, []);

  return (
    <div className='h-[100vh]'>
      <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav} />
      <div className="w-full lg:w-[78%] ml-auto pb-5 text-center">
        <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} />
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

        <div className='flex items-center justify-center gap-10'>
          <div className='flex items-center justify-center text-center flex-col gap-2'>
            <div className="relative w-[2.125in] h-[3.375in] bg-white rounded-lg shadow-md flex flex-col items-center mx-auto p-4">
              <div className="h-[120px] z-[1] w-full absolute top-0 rounded-t-lg" style={{ backgroundColor: bgColor }}></div>
              <div className="w-full flex justify-center items-center mb-4 text-center">
                <span className="text-lg font-bold relative z-[2]" style={{ color: textColor }}>{companyName}</span>
              </div>
              <div className="flex flex-col items-center relative z-[2]">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2">
                  {
                    userId &&
                    <img
                      src={userId?.profileImage?.file}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  }
                </div>
                <div className="text-center">
                  <p className="text-md text-gray-600 font-semibold capitalize">{userId?.role}/Member</p>
                </div>
              </div>
              <div className="mt-auto">
                {
                  userId &&
                  <img
                    src={userId?.passQrcode}
                    alt="QR Code"
                    className="w-[120px] h-[120px]"
                  />
                }
              </div>
            </div>
            <p>Front</p>
          </div>

          <div className='flex items-center justify-center text-center flex-col gap-2'>
            <div className="w-[2.125in] h-[3.375in] bg-white rounded-lg shadow-md flex flex-col mx-auto p-4">
              <div className="w-full flex justify-center items-center mb-4 text-center">
                {/* <span className="text-lg font-bold">{companyName}</span> */}
              </div>
              <div className="flex flex-col">
                <div className="w-[120px] h-[120px] mx-auto rounded overflow-hidden text-[10px] mb-4 border-2">
                  {
                    userId &&
                    <img
                      src=""
                      alt="School Logo"
                      className="w-full h-full object-cover"
                    />
                  }
                </div>
                <div className="mt-3 text-left">
                  <p className="text-sm text-gray-600 font-semibold capitalize my-3 text-left">
                    Motto:
                  </p>
                </div>
              </div>
            </div>
            <p>Back</p>
          </div>
        </div>
        <div>
          <div className='flex w-[500px] mx-auto flex-col mt-10'>
            <p className='font-[500] text-[20px] mb-1 text-left'>Settings</p>
            <input onChange={e => setBgColor(e.target.value)} type="text" className='mb-5 border py-3 px-3 rounded w-full outline-none' placeholder='Enter background colour e.g red, blue, #123abc, #ffa326' />
            <input onChange={e => setTextColor(e.target.value)} type="text" className='border py-3 px-3 rounded w-full outline-none' placeholder='Enter text colour e.g red, blue, #123abc, #ffa326' />
            {/* <button onClick={changeBgColor} className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]">Set</button> */}
          </div>
        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px] mt-4">Print Id Card</button>
        </div>
      </div>
      {
        msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />
      }
    </div>
  )
}

export default StudentId;
