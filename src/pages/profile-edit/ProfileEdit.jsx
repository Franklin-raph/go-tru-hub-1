import React, { useEffect, useState } from 'react';
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';
import { useNavigate, useParams } from 'react-router-dom';
import { IoChevronDownOutline } from 'react-icons/io5';
import Alert from '../../components/alert/Alert';
import BtnLoader from '../../components/btn-loader/BtnLoader';

const ProfileEdit = ({baseUrl}) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [userProfile, setUserProfile] = useState()
    const user = JSON.parse(localStorage.getItem('user'))
    const dropDownArray = ['unit', 'subUnit', 'assignment']
    const [dropDown, setDropDown] = useState(false)
    const [selectedUnit, setSelectedUnit] = useState('')
    const [allUnits, setAllUnits] = useState([])
    const [allSubUnits, setAllSubUnits] = useState()
    const [selectedSubUnit, setSelectedSubUnit] = useState('')
    const [allAssignments, setAllAssignments] = useState([])
    const [selectedAssignment, setSelectedAssignment] = useState()
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [fullName, setFullName] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getAllUnits()
        getAllAssignments()
    },[])

    async function getAllUnits(){
        const res = await fetch(`${baseUrl}/units`,{
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
            setAllUnits(data.data.units);
            setAlertType('success');
            return;
        }
    }

    async function getSubUnitInfo(id){
        const res = await fetch(`${baseUrl}/unit/${id}/subunits`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data);
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
        if(res.ok){
            // setUnitName(data?.data?.units[0]?.unit?.name)
            setAllSubUnits(data.data.units);
            setAlertType('success');
            return;
        }
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


    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    const handleFileChange = (e) => {
        setFormData({ ...formData, userImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission
        console.log({fullName, dob, gender, selectedUnit, selectedSubUnit});
        setLoading(true)
        const res = await fetch(`${baseUrl}/users/get-user/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            },
            body:JSON.stringify({fullName, dob, gender, selectedUnit, selectedSubUnit, profileImage:"12345"})
        })
        const data = await res.json()
        if(res) setLoading(false)
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
        if(res.ok){
            setMsg(data.message);
            setAlertType('success');
            return;
        }
        console.log(res, data);
    };

    async function getUserInfo(){
        const res = await fetch(`${baseUrl}/users/get-user/${id}`,{
            headers:{
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        setUserProfile(data?.data)
        setFullName(data?.data?.user?.fullName)
        setSelectedUnit(data?.data?.user?.pivotUnit)
        setSelectedSubUnit(data?.data?.user?.subUnit?.name)
        console.log(data.data.user)
    }

    useEffect(() => {
        getUserInfo()
    },[])

  return (
    <div>
        <SideNav />
        <div className="w-[78%] bg-[#F2FCF7] ml-auto">
        <TopNav />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem] w-full">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate(`/user/${id}`)} className='cursor-pointer' />
                        <p className="text-[28px] text-primary-color font-[600]">Edit Student Profile</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        {/* <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate('/wallet-restriction')}>Reset to default</button> */}
                    </div>
                </div>
                <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mb-8" onSubmit={handleSubmit}>
                    <div className="mb-4">
                    <label className="block text-gray-700">Member full name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                    />
                    </div>

                    <div className='w-full relative mb-4'>
                        <label className='block text-left mb-2'>Unit</label>
                        <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                            <input type="text" value={selectedUnit} className='outline-none w-full rounded-[4px]'/>
                            <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === "unit" ? false : 'unit') } />
                        </div>
                        {
                            dropDown === "unit" &&
                            <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[280px] overflow-y-scroll'>
                                {
                                    allUnits.map(unit => {
                                        return (
                                            <p className='cursor-pointer hover:bg-gray-300 p-2' onClick={() => {
                                                setSelectedUnit(unit.name)
                                                setDropDown(false)
                                                getSubUnitInfo(unit._id)
                                            }}>{unit.name}</p>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>

                    <div className='w-full relative mb-4'>
                        <label className='block text-left mb-2'>Sub-unit</label>
                        <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                            <input type="text" value={selectedSubUnit} className='outline-none w-full rounded-[4px]'/>
                            <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === 'subUnit' ? false : 'subUnit')} />
                        </div>
                        {
                            dropDown === "subUnit" &&
                            <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[150px] overflow-y-scroll'>
                                {
                                    allSubUnits&& allSubUnits?.map(subUnit => {
                                        return (
                                            <p className='cursor-pointer hover:bg-gray-300 p-2' onClick={() => {
                                                setDropDown(false)
                                                setSelectedSubUnit(subUnit.name)
                                            }}>{subUnit.name}</p>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Date of birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            onChange={e => setDob(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Gender</label>
                        <select
                            name="gender"
                            onChange={e => setGender(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        >
                            <option>--Select Gender--</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="mt-7">
                        <label className='block text-text-color text-left mb-2'>User's image</label>
                        <div className='relative flex items-center justify-center flex-col rounded-[16px] h-[300px] w-full' style={{ border:'1.5px dashed #D0D5DD' }}>
                            <img src="./images/file-upload.svg" alt="" />
                            <p className='text-text-color font-[600] mt-5'>Click to upload <span className='font-[400] text-[#475367]'>or drag and drop</span> </p>
                            <p className='text-[#98A2B3]'>PNG, JPG (max. 5mb)</p>
                            <div className='flex items-center gap-[15px] w-full mt-5'>
                                <div className='w-[35%] ml-auto h-[2px] bg-[#F0F2F5]'></div>
                                <p>OR</p>
                                <div className='w-[35%] mr-auto h-[2px] bg-[#F0F2F5]'></div>
                            </div>
                            <input type="file" className='cursor-pointer absolute opacity-0 h-full outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                            <button className='text-white bg-primary-color rounded-[4px] mt-[2.5rem] px-[28px] py-[10px] text-center mx-auto'>Browse Files</button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <button onClick={() => navigate(`/user/${id}`)} type="button" className="bg-white text-black border border-black py-2 px-4 rounded">
                            Back
                        </button>
                        {
                            loading ? 
                            <BtnLoader bgColor="#191f1c"/>
                            :
                            <button type="submit" className="bg-primary-color text-white py-2 px-4 rounded">Save changes</button>
                        }
                    </div>
                </form>
            </div>
        </div>
        {
          msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  );
};

export default ProfileEdit;
