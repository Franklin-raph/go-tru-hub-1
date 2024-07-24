import React, { useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom'
import Alert from '../../components/alert/Alert'
import BtnLoader from '../../components/btn-loader/BtnLoader'

const CreateAssignment = ({baseUrl}) => {

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [msg, setMsg] = useState('')
  const [alertType, setAlertType] = useState()
  const [name, setName] = useState('')
  const [courseCode, setCourseCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [toggleNav, setToggleNav] = useState(false)

  async function createAssignment(){
    if(!name || !courseCode){
      setMsg("Assignment name and code is required!");
      setAlertType('error');
      return;
    }
    setLoading(true)
    console.log(JSON.stringify({name}));
    const res = await fetch(`${baseUrl}/course`,{
        method:"POST",
        body: JSON.stringify({name, courseCode}),
        headers:{
          "Content-Type":"application/json",
          'Authorization':`Bearer ${user.data.access_token}`
      }
    })
    const data = await res.json()
    if(res) setLoading(false)
    if(res.ok){
      setMsg(data.message);
      setAlertType('success');
      return;
    }
    if(!res.ok){
      setMsg(data.message);
      setAlertType('error');
      return;
    }
  }


  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/assignments')} className='cursor-pointer' />
                        <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Create Assignment</p>
                    </div>
                </div>
                <div className='px-[10px] lg:px-[30px] max-w-[500px] mx-auto'>
                  <div className='mb-5'>
                      <p className='text-[#19201D]'>Assignment Name</p>
                      <input type="text" onChange={e => setName(e.target.value)} className='border py-3 px-3 rounded mt-1 w-full outline-none' placeholder='Enter assignment name' />
                  </div>
                  <div className='mb-5'>
                      <p className='text-[#19201D]'>Assignment Code</p>
                      <input type="text" onChange={e => setCourseCode(e.target.value)} className='border py-3 px-3 rounded mt-1 w-full outline-none' placeholder='Enter assignment / course code' />
                  </div>
                  {
                      loading ? 
                      <BtnLoader bgColor="#191f1c"/>
                      :
                      <button onClick={createAssignment} className='text-white bg-primary-color w-full rounded-[4px] mt-[.5rem] px-[35px] py-[16px] text-center mx-auto'>Create Assignment</button>
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

export default CreateAssignment