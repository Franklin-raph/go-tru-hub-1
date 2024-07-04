import React, { useEffect, useState } from 'react'
import TopNav from '../../components/top-nav/TopNav'
import SideNav from '../../components/side-nav/SideNav'
import { IoChevronDownOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import AlertModal from '../../components/alert-modals/AlertModal'
import BtnLoader from '../../components/btn-loader/BtnLoader'

const CreateUser = ({baseUrl}) => {

    // {
    //     "fullName": "John Doe",
    //     "profileImage": "6619ab04b1ea9641625e3e3e",
    //     "role":"guardian",
    //     "email":"nwaforglory680@gmail.com",
    //     "signature":"6619ab04b1ea9641625e3e3e",
    //     "children":["662e3418cb09e06e8de6e4f4"]
    //   }
    //   student, guardian,staff and admin


    const [userTypeDropDown, setUserTypeDropDown] = useState(false)
    const [fileUploadLoader, setfileUploadLoader] = useState(false)
    const [userType, setUserType] = useState('')
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const [alertTitle, setAlertTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const adminAccessArray = [
        {
            label:'Gotru Pass',
            value:'pass'
        },
        {
            label:'Gotru Monitor',
            value:'monitor'
        },
        {
            label:'Gotru Trade',
            value:'trade'
        }
    ]

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [usersImagePreview, setUserImagePreview] = useState('')
    const [guardians, setGuardians] = useState('')
    const [relationImage, setRelationImage] = useState('')
    const [relationImagePreview, setRelationImagePreview] = useState('')
    const [signature, setSignature] = useState('')
    const [signatureImagePreview, setSignatureImagePreview] = useState('')
    const [unitDropDown, setUnitDropDown] = useState(false)
    const [subUnitDropDown, setSubUnitDropDown] = useState(false)
    const [listOfGuardianDropDown, setListOfGuardianDropDown] = useState(false)
    const [linkToMemberDropDown, setLinkToMemberDropDown] = useState(false)
    const [regNum, setRegNum] = useState('')
    const [unitsArray, setUnitsArray] = useState([])
    const [subUnitsArray, setSubUnitsArray] = useState([])

    const [piviotUnit, setPiviotUnit] = useState('')
    const [piviotUnitText, setPiviotUnitText] = useState('')
    const [subUnit, setSubUnit] = useState('')
    const [subUnitText, setSubUnitText] = useState('')

    const [asignGuardian, setAsignGuardian] = useState(false)

    const userTypeArray = [
        {
            label:'student',
            info1:'This user is the direct recipient of the gotruhub tokens e.g a student',
            info2:'*To create this user category, you are required to create units in monitor first which this user can belong to.'
        },
        {
            label:'guardian',
            info1:'This user is a guardian/supervisor of a member e.g a parent',
            info2:'*To create this user category, you are required to have created a member to which this user can be linked'
        },
        {
            label:'staff',
            info1:'This user carries out specific assignment that can be monitored e.g a teacher',
            info2:''
        },
        // {
        //     label:'admin',
        //     info1:'This user has admin level access to one or more of the features on gotruhub e.g a staff',
        //     info2:''
        // }
    ]
    const listOfGuardians = [ 'Celestine Ojiakor', 'Baron White', 'Kasiemobe Egu', 'Jane Doe' ]
    const linkToMemberArray = ['Brother', 'Sister', 'Father', 'Mother', 'Uncle', 'Teacher']
    const [allStudent, setAllStudent] = useState([])
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if(!user){
            navigate('/login')
            return
        }
        getAllUnits()
        getAllStudents()
    },[])

    const [appPermissions, setAppPermissions] = useState([]);

    const handleAppPermissionsChange = (value) => {
        if (appPermissions.includes(value)) {
            setAppPermissions(appPermissions.filter((access) => access!== value));
        } else {
            setAppPermissions([...appPermissions, value]);
        }
    };

    async function getAllStudents(){
        const response = await fetch(`${baseUrl}/users/get-users/student`, {
            method: 'GET',
            headers: {
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await response.json()
        console.log("All students => ",data);
        setAllStudent(data.data.users)
    }

    async function getAllUnits(){
        const response = await fetch(`${baseUrl}/units`, {
            method: 'GET',
            headers: {
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await response.json()
        console.log(data);
        setUnitsArray(data.data.units)
    }

    async function getSubUnit(id){
        const response = await fetch(`${baseUrl}/unit/${id}/subunits`, {
            method: 'GET',
            headers: {
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await response.json()
        console.log(data);
        setSubUnitsArray(data.data.units)
    }

    async function handleFileUpload(file){
        console.log(file);
        setfileUploadLoader(true)
        console.log(`${baseUrl}/upload-media`);
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch(`${baseUrl}/upload-media`,{
          method:"POST",
          body: formData
        })
        const data = await res.json()
        if(res) setfileUploadLoader(false)
        if(res.ok) {
          setMsg("File uploaded successfully");
          setAlertType('success')
          setAlertTitle('Success')
          if(userType === 'guardian'){
                setGuardians(data.data._id)
            }else{
                setProfileImage(data.data._id)
          }
          setUserImagePreview(data.data.file)
        }
        if(!res.ok){
          setMsg("File upload wasn't successfull");
          setAlertType('error')
          setAlertTitle('Failed')
        }
    }

    async function handleRelationImageUpload(file){
        console.log(file);
        setfileUploadLoader(true)
        console.log(`${baseUrl}/upload-media`);
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch(`${baseUrl}/upload-media`,{
          method:"POST",
          body: formData
        })
        const data = await res.json()
        if(res) setfileUploadLoader(false)
        if(res.ok) {
          setMsg("File uploaded successfully");
          setAlertType('success')
          setAlertTitle('Success')
          setRelationImagePreview(data.data.file)
          setRelationImage(data.data._id)
        }
        if(!res.ok){
          setMsg("File upload wasn't successfull");
          setAlertType('error')
          setAlertTitle('Failed')
        }
    }

    async function handleGuardianImageUpload(file){
        console.log(file);
        setfileUploadLoader(true)
        console.log(`${baseUrl}/upload-media`);
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch(`${baseUrl}/upload-media`,{
          method:"POST",
          body: formData
        })
        const data = await res.json()
        if(res) setfileUploadLoader(false)
        if(res.ok) {
          setMsg("File uploaded successfully");
          setAlertType('success')
          setAlertTitle('Success')
          setGuardians(data.data._id)
        }
        if(!res.ok){
          setMsg("File upload wasn't successfull");
          setAlertType('error')
          setAlertTitle('Failed')
        }
    }

    async function handleRelationImageUpload(file){
        console.log(file);
        setfileUploadLoader(true)
        console.log(`${baseUrl}/upload-media`);
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch(`${baseUrl}/upload-media`,{
          method:"POST",
          body: formData
        })
        const data = await res.json()
        if(res) setfileUploadLoader(false)
        if(res.ok) {
          setMsg("File uploaded successfully");
          setAlertType('success')
          setAlertTitle('Success')
          setRelationImagePreview(data.data.file)
          setRelationImage(data.data._id)
        }
        if(!res.ok){
          setMsg("File upload wasn't successfull");
          setAlertType('error')
          setAlertTitle('Failed')
        }
    }

    async function handleSignatureUpload(file){
        console.log(file);
        setfileUploadLoader(true)
        console.log(`${baseUrl}/upload-media`);
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch(`${baseUrl}/upload-media`,{
          method:"POST",
          body: formData
        })
        const data = await res.json()
        if(res) setfileUploadLoader(false)
        if(res.ok) {
          setMsg("File uploaded successfully");
          setAlertType('success')
          setAlertTitle('Success')
          setSignatureImagePreview(data.data.file)
          setSignature(data.data._id)
        }
        if(!res.ok){
          setMsg("File upload wasn't successfull");
          setAlertType('error')
          setAlertTitle('Failed')
        }
    }

    async function handleStaffCreate(){
        console.log(appPermissions);
        if(!fullName || !email || !profileImage || !userType){
            setMsg("All fields are required");
            setAlertType('error')
            setAlertTitle('Failed')
            return;
        }else{
            setIsLoading(true)
            const res = await fetch(`${baseUrl}/users/add-user`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${user.data.access_token}`
                },
                body:JSON.stringify({ fullName, profileImage, role:userType, email, regNum, appPermissions })
            })
            const data = await res.json()
            if(res) setIsLoading(false)
            if(res.ok) {
                setMsg("User Created Successfully");
                setAlertType('success')
                setAlertTitle('Success')
              }
              if(!res.ok){
                setMsg(data.message);
                setAlertType('error')
                setAlertTitle('Failed')
              }
            console.log(res, data);
        }
    }

    async function handleStudentCreate(){
        console.log({ fullName, profileImage, role:userType, piviotUnit, subUnit, email, regNum });
        if(!fullName || !regNum || !profileImage || !userType){
            setMsg("All fields are required");
            setAlertType('error')
            setAlertTitle('Failed')
            return;
        }else{
            setIsLoading(true)
            const res = await fetch(`${baseUrl}/users/add-user`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${user.data.access_token}`
                },
                body:JSON.stringify({ fullName, profileImage, role:userType, piviotUnit, subUnit, regNum })
            })
            const data = await res.json()
            if(res) setIsLoading(false)
            if(res.ok) {
                setMsg("User Created Successfully");
                setAlertType('success')
                setAlertTitle('Success')
              }
              if(!res.ok){
                setMsg(data.message);
                setAlertType('error')
                setAlertTitle('Failed')
              }
            console.log(res, data);
        }
    }

    async function handleGuardianCreate(){
        console.log({fullName, profileImage:guardians, children, relationImage, role:userType, signature, email, regNum});
        if(!fullName || !email || !guardians || !userType){
            setMsg("All fields are required");
            setAlertType('error')
            setAlertTitle('Failed')
            return;
        }else{
            setIsLoading(true)
            const res = await fetch(`${baseUrl}/users/add-user`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${user.data.access_token}`
                },
                body:JSON.stringify({ fullName, children, profileImage:guardians, relationImage, role:userType, signature, email, regNum })
            })
            const data = await res.json()
            if(res) setIsLoading(false)
            if(res.ok) {
                setMsg("User Created Successfully");
                setAlertType('success')
                setAlertTitle('Success')
              }
              if(!res.ok){
                setMsg(data.message);
                setAlertType('error')
                setAlertTitle('Failed')
              }
            console.log(res, data);
        }
        
    }

    async function handleStudentGuardianCreate(){
        console.log({relationImage, profileImage, guardians, signature});
    }

    async function createUser(){
        console.log(JSON.stringify({ fullName, profileImage, role:userType, piviotUnit, subUnit, email, regNum }));
        if(userType === 'staff'){
            handleStaffCreate()
        }else if(userType === 'student'){
            if(asignGuardian === true){
                handleStudentGuardianCreate()
            }else{
                handleStudentCreate()
            }
        }else if(userType === 'guardian'){
            handleGuardianCreate()
        }
    }

    const [selectedStudents, setSelectedStudents] = useState([]);
    const [children, setChildren] = useState([])

    const handleStudentSelect = (student) => {
      if (!selectedStudents.includes(student)) {
        setSelectedStudents([...selectedStudents, student]);
        setChildren([...children, student._id])
      }
      console.log(student._id);
    };
  
    const handleStudentDeselect = (student) => {
        console.log(student);
      setSelectedStudents(selectedStudents.filter((id) => id!== student));
      setChildren(children.filter((id) => id!== student._id))
    };

  return (
    <div>
        <SideNav />
        <div className="w-[78%] bg-[#F2FCF7] ml-auto pb-5">
        <TopNav />
            <div className="px-[30px] py-[1rem]">
                <div className="flex items-center justify-between mb-[3rem]">
                    <p className="text-[28px] text-primary-color font-[600]">Create User</p>
                </div>
                <div>
                    <div className='mt-7 flex items-center gap-5 w-full'>
                        <div className='w-full'>
                            <label className='block text-left mb-2 text-text-color'>Full Name <span className='text-red-500'>*</span></label>
                            <div className='px-4 py-3 outline-none border w-full rounded-[4px]'>
                                <input onChange={(e => setFullName(e.target.value))} placeholder='First and last name' type="text" className='outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                            </div>
                            {/* {
                                userType === 'student' && 
                                <div className='flex items-center gap-1 mt-1'>
                                    <input type="checkbox" className='cursor-pointer' onChange={e => setAsignGuardian(e.target.checked)} />
                                    <p className='text-[#6F7975] text-[12px]'>Click to assign a guardian/supervisor to this member</p>
                                </div>
                            } */}
                        </div>
                        {
                            userType !== 'student' &&
                            <div className='w-full'>
                                <label className='block text-text-color text-left mb-2'>Email <span className='text-red-500'>*</span></label>
                                <div className='px-4 py-3 border w-full rounded-[4px]'>
                                    <input onChange={e => setEmail(e.target.value)} placeholder='Enter email address' type="text" className='outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                                </div>
                                {/* {
                                    userType === 'student' && 
                                    <div className='flex items-center gap-1 mt-1'>
                                        <input type="checkbox" onChange={e => setAsignGuardian(e.target.checked)} />
                                        <p className='text-[#6F7975] text-[12px] opacity-0'>Click to assign a guardian/supervisor to this member</p>
                                    </div>
                                } */}
                            </div>
                        }
                    </div>
                    
                    {userType === 'student' &&
                        <>
                            {
                                asignGuardian &&
                                <div className='mt-7 flex items-center gap-5 w-full'>
                                    <div className='w-full relative'>
                                        <label className='block text-left mb-2 text-text-color'>Guardian Full Name <span className='text-red-500'>*</span></label>
                                        <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                                            <input type="text" placeholder='Enter guardian full name' className='outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                                            <IoChevronDownOutline color="d7d7d7" cursor='pointer' onClick={() => setListOfGuardianDropDown(!listOfGuardianDropDown)}/>
                                        </div>
                                        {listOfGuardianDropDown &&
                                            <div className='py-5 bg-white absolute overflow-y-scroll h-[220px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                                {
                                                    listOfGuardians.map(guardian => (
                                                        <div className='px-3 border-b pb-3 cursor-pointer mb-3' onClick={() => {
                                                            setListOfGuardianDropDown(false)
                                                        }}>
                                                            <p className='text-[#828282] my-1 text-[12px]'>{guardian}</p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        }
                                    </div>
                                    <div className='w-full'>
                                        <label className='block text-text-color text-left mb-2'>Guardian Email Address <span className='text-red-500'>*</span></label>
                                        <div className='px-4 py-3 border w-full rounded-[4px]'>
                                            <input onChange={e => setEmail(e.target.value)} placeholder='Enter email address' type="text" className='outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                                        </div>
                                    </div>
                                </div>
                            }
                        </>
                    }

                    <div className='mt-7 flex items-center gap-5 w-full'>
                        <div className='relative w-full'>
                            <label className='block text-text-color text-left mb-2'>User Type <span className='text-red-500'>*</span></label>
                            <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                                <input type="text" value={userType} placeholder='Select user type' className='outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                                <IoChevronDownOutline color="d7d7d7" cursor='pointer' onClick={() => setUserTypeDropDown(!userTypeDropDown)}/>
                            </div>
                            {userTypeDropDown &&
                                <div className='py-5 bg-white absolute overflow-y-scroll h-[220px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                    {
                                        userTypeArray.map(type => (
                                            <div className='px-3 border-b pb-3 cursor-pointer mb-3' onClick={() => {
                                                setUserTypeDropDown(false)
                                                setAsignGuardian(false)
                                                setUserType(type.label)
                                            }}>
                                                <p className='text-[#1D1D1D] capitalize text-[12px]'>{type.label}</p>
                                                <p className='text-[#828282] mt-2 mb-3 text-[12px]'>{type.info1}</p>
                                                <p className='text-[#865C1D] text-[12px]'>{type.info2}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                        {
                            userType === 'student' &&
                            <div className='w-full'>
                                <label className='block text-text-color text-left mb-2'>Registeration Number <span className='text-red-500'>*</span></label>
                                <div className='px-4 py-3 border w-full rounded-[4px]'>
                                    <input onChange={e => setRegNum(e.target.value)} placeholder='Enter Registeration Number' type="text" className='outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                                </div>
                            </div>
                        }
                    </div>

                    {
                        userType === 'guardian'&&
                        <div className='relative w-full mt-7'>
                            <label className='block text-text-color text-left mb-2'>Member / Child / Children<span className='text-red-500' onClick={() => console.log({children, selectedStudents})}>*</span></label>
                            <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                                {
                                    selectedStudents.length ?
                                    <div className='flex items-center gap-2'>
                                        {
                                            selectedStudents.map(member => (
                                                <div key={member._id} className="flex items-center gap-2 text-[12px] bg-gray-200 rounded-full px-3">
                                                    {/* <input
                                                        type="checkbox"
                                                        checked={selectedStudents.includes(member._id)}
                                                        onChange={() => handleStudentSelect(member._id)}
                                                    /> */}
                                                    <p>{member.fullName}</p>
                                                    <button
                                                        className="text-red-500"
                                                        onClick={() => handleStudentDeselect(member)}
                                                    >
                                                        x
                                                    </button>
                                                    {/* {selectedStudents.includes(member._id) && (
                                                    )} */}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    :
                                    <input type="text" placeholder='Select member' className='outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                                }

                                <IoChevronDownOutline color="d7d7d7" cursor='pointer' onClick={() => setLinkToMemberDropDown(!linkToMemberDropDown)}/>
                            </div>
                            {linkToMemberDropDown &&
                                <div className='py-5 bg-white absolute overflow-y-scroll h-[220px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                    {
                                        allStudent.map(member => (
                                            // <div className='px-3 border-b pb-3 cursor-pointer mb-3' onClick={() => {
                                            //     setLinkToMemberDropDown(false)
                                            // }}>
                                            //     <p className='text-[#828282] mt-2 text-[12px]'>{member.fullName}</p>
                                            // </div>
                                            <div key={member._id} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStudents.includes(member)}
                                                    onChange={() => handleStudentSelect(member)}
                                                />
                                                <p className='text-[#828282] mt-2 text-[12px]'>{member.fullName}</p>
                                                <p className='text-[#828282] mt-2 text-[12px]'>({member.regNum})</p>
                                                {/* {selectedStudents.includes(member._id) && (
                                                <button
                                                    className="text-red-500"
                                                    onClick={() => handleStudentDeselect(member._id)}
                                                >
                                                    x
                                                </button>
                                                )} */}
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    }

                    {
                        userType === 'student' &&
                        <div className='mt-7 flex items-center gap-5 w-full'>
                            <div className='relative w-full'>
                                <label className='block text-text-color text-left mb-2'>Pivot Unit <span className='text-red-500'>*</span></label>
                                <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                                    <input type="text" value={piviotUnit} placeholder='Select user type' className='absolute opacity-0 outline-none rounded-[4px] bg-transparent text-[14px]'/>
                                    <p className='text-[14px]'>{piviotUnitText}</p>
                                    <IoChevronDownOutline color="d7d7d7" cursor='pointer' onClick={() => setUnitDropDown(!unitDropDown)}/>
                                </div>
                                {unitDropDown &&
                                    <div className='py-5 bg-white absolute overflow-y-scroll h-[220px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                        {
                                            unitsArray.map(unit => (
                                                <div className='px-3 border-b pb-3 cursor-pointer mb-3' onClick={() => {
                                                    setUnitDropDown(false) 
                                                    setPiviotUnitText(unit.name)
                                                    setPiviotUnit(unit._id)
                                                    getSubUnit(unit._id)
                                                }}>
                                                    <p className='text-[#1D1D1D] capitalize text-[12px]'>{unit.name}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                            <div className='relative w-full'>
                                <label className='block text-text-color text-left mb-2'>Sub-unit <span className='text-red-500'>*</span></label>
                                <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                                    <input type="text" value={subUnit} placeholder='Select user type' className='absolute opacity-0 outline-none rounded-[4px] bg-transparent'/>
                                    <p className='text-[14px]'>{subUnitText}</p>
                                    <IoChevronDownOutline color="d7d7d7" cursor='pointer' onClick={() => setSubUnitDropDown(!subUnitDropDown)}/>
                                </div>
                                {subUnitDropDown &&
                                    <div className='py-5 bg-white absolute overflow-y-scroll h-[220px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                        {
                                            subUnitsArray.map(unit => (
                                                <div className='px-3 border-b pb-3 cursor-pointer mb-3' onClick={() => {
                                                    setSubUnitDropDown(false) 
                                                    setSubUnit(unit._id)
                                                    setSubUnitText(unit.name)
                                                }}>
                                                    <p className='text-[#1D1D1D] capitalize text-[12px]'>{unit.name}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    {
                        userType === 'staff' &&
                            <div className="mt-7">
                                <label className='block text-text-color text-left mb-2'>Allow this admin access to <span className='text-red-500'>*</span></label>
                                <div className='flex items-center'>
                                    {
                                        adminAccessArray.map(access => (
                                            <div className='flex items-center gap-2 w-full rounded-[4px]'>
                                                <input 
                                                    type="checkbox" 
                                                    value={access.value} 
                                                    checked={appPermissions.includes(access.value)}
                                                    onChange={() => handleAppPermissionsChange(access.value)}
                                                    className='outline-none rounded-[4px] bg-transparent text-[14px]'
                                                />
                                                <p className='text-[#828282]'>{access.label}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                    }

                    <div className="mt-7">
                        <label className='block text-text-color text-left mb-2'>
                            {userType === "guardian" ? `Guardian's Image`:`User's image`} <span className='text-red-500'>*</span>
                        </label>
                        {
                            usersImagePreview ?
                            <img src={usersImagePreview} alt="" className='rounded-[4px] w-[100px] h-[100px]'/>
                            :
                            <div className='relative flex items-center justify-center flex-col rounded-[16px] h-[300px] w-full' style={{ border:'1.5px dashed #D0D5DD' }}>
                                <img src="./images/file-upload.svg" alt="" />
                                <p className='text-text-color font-[600] mt-5'>Click to upload <span className='font-[400] text-[#475367]'>or drag and drop</span> </p>
                                <p className='text-[#98A2B3]'>PNG, JPG (max. 5mb)</p>
                                <div className='flex items-center gap-[15px] w-full mt-5'>
                                    <div className='w-[35%] ml-auto h-[2px] bg-[#F0F2F5]'></div>
                                    <p>OR</p>
                                    <div className='w-[35%] mr-auto h-[2px] bg-[#F0F2F5]'></div>
                                </div>
                                <input onChange={(e) => handleFileUpload(e.target.files[0])} type="file" className='cursor-pointer absolute opacity-0 h-full outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                                <button className='text-white bg-primary-color rounded-[4px] mt-[2.5rem] px-[28px] py-[10px] text-center mx-auto'>Browse Files</button>
                            </div>
                        }
                        {userType === "guardian" && 
                            <p className='text-[#4F4F4F] text-[14px] mt-4'>For the purpose of gotrupass, a member can have multiple authorities allowed to sign them in/out, upload the images of those authorities below. <span className='cursor-pointer text-secondary-color underline'>Learn more about gotrupass</span> </p>
                        }
                    </div>

                    {
                        userType === "guardian" &&
                        <>
                            {
                                signatureImagePreview ?
                                <img src={signatureImagePreview} alt="" className='rounded-[4px] w-[100px] h-[100px]'/>
                                :
                                <div className="mt-7">
                                    <label className='block text-text-color text-left mb-2'>
                                        Image of guardian’s Signature <span className='text-red-500'>*</span>
                                    </label>
                                    <div className='relative flex items-center justify-center flex-col rounded-[16px] h-[300px] w-full' style={{ border:'1.5px dashed #D0D5DD' }}>
                                        <img src="./images/file-upload.svg" alt="" />
                                        <p className='text-text-color font-[600] mt-5'>Click to upload <span className='font-[400] text-[#475367]'>or drag and drop</span> </p>
                                        <p className='text-[#98A2B3]'>PNG, JPG (max. 5mb)</p>
                                        <div className='flex items-center gap-[15px] w-full mt-5'>
                                            <div className='w-[35%] ml-auto h-[2px] bg-[#F0F2F5]'></div>
                                            <p>OR</p>
                                            <div className='w-[35%] mr-auto h-[2px] bg-[#F0F2F5]'></div>
                                        </div>
                                        <input onChange={e => handleSignatureUpload(e.target.files[0])} type="file" className='cursor-pointer absolute opacity-0 h-full outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                                        <button className='text-white bg-primary-color rounded-[4px] mt-[2.5rem] px-[28px] py-[10px] text-center mx-auto'>Browse Files</button>
                                    </div>
                                </div>
                            }
                            
                            {
                                relationImagePreview ?
                                <img src={relationImagePreview} alt="" className='rounded-[4px] w-[100px] h-[100px]'/>
                                :
                                <div className="mt-7">
                                    <label className='block text-text-color text-left mb-2'>
                                        Image of relation. <span className='text-red-500'>*</span>
                                    </label>
                                    <div className='relative flex items-center justify-center flex-col rounded-[16px] h-[300px] w-full' style={{ border:'1.5px dashed #D0D5DD' }}>
                                        <img src="./images/file-upload.svg" alt="" />
                                        <p className='text-text-color font-[600] mt-5'>Click to upload <span className='font-[400] text-[#475367]'>or drag and drop</span> </p>
                                        <p className='text-[#98A2B3]'>PNG, JPG (max. 5mb)</p>
                                        <div className='flex items-center gap-[15px] w-full mt-5'>
                                            <div className='w-[35%] ml-auto h-[2px] bg-[#F0F2F5]'></div>
                                            <p>OR</p>
                                            <div className='w-[35%] mr-auto h-[2px] bg-[#F0F2F5]'></div>
                                        </div>
                                        <input type="file" onChange={e => handleRelationImageUpload(e.target.files[0])} className='cursor-pointer absolute opacity-0 h-full outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                                        <button className='text-white bg-primary-color rounded-[4px] mt-[2.5rem] px-[28px] py-[10px] text-center mx-auto'>Browse Files</button>
                                    </div>
                                </div>
                            }
                        </>
                    }

                    { asignGuardian &&
                        <>
                        <div className="mt-7">
                            <label className='block text-text-color text-left mb-2'>
                                Guardian’s Image <span className='text-red-500'>*</span>
                            </label>
                            <div className='relative flex items-center justify-center flex-col rounded-[16px] h-[300px] w-full' style={{ border:'1.5px dashed #D0D5DD' }}>
                                <img src="./images/file-upload.svg" alt="" />
                                <p className='text-text-color font-[600] mt-5'>Click to upload <span className='font-[400] text-[#475367]'>or drag and drop</span> </p>
                                <p className='text-[#98A2B3]'>PNG, JPG (max. 5mb)</p>
                                <div className='flex items-center gap-[15px] w-full mt-5'>
                                    <div className='w-[35%] ml-auto h-[2px] bg-[#F0F2F5]'></div>
                                    <p>OR</p>
                                    <div className='w-[35%] mr-auto h-[2px] bg-[#F0F2F5]'></div>
                                </div>
                                <input  onChange={e => handleGuardianImageUpload(e.target.files[0])} type="file" className='cursor-pointer absolute opacity-0 h-full outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                                <button className='text-white bg-primary-color rounded-[4px] mt-[2.5rem] px-[28px] py-[10px] text-center mx-auto'>Browse Files</button>
                            </div>
                        </div>
                        <div className="mt-7">
                            <label className='block text-text-color text-left mb-2'>
                                Image of guardian’s Signature <span className='text-red-500'>*</span>
                            </label>
                            <div className='relative flex items-center justify-center flex-col rounded-[16px] h-[300px] w-full' style={{ border:'1.5px dashed #D0D5DD' }}>
                                <img src="./images/file-upload.svg" alt="" />
                                <p className='text-text-color font-[600] mt-5'>Click to upload <span className='font-[400] text-[#475367]'>or drag and drop</span> </p>
                                <p className='text-[#98A2B3]'>PNG, JPG (max. 5mb)</p>
                                <div className='flex items-center gap-[15px] w-full mt-5'>
                                    <div className='w-[35%] ml-auto h-[2px] bg-[#F0F2F5]'></div>
                                    <p>OR</p>
                                    <div className='w-[35%] mr-auto h-[2px] bg-[#F0F2F5]'></div>
                                </div>
                                <input onChange={e => handleSignatureUpload(e.target.files[0])} type="file" className='cursor-pointer absolute opacity-0 h-full outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                                <button className='text-white bg-primary-color rounded-[4px] mt-[2.5rem] px-[28px] py-[10px] text-center mx-auto'>Browse Files</button>
                            </div>
                        </div>
                        <div className="mt-7">
                            <label className='block text-text-color text-left mb-2'>
                                Image of relation <span className='text-red-500'>*</span>
                            </label>
                            <div className='relative flex items-center justify-center flex-col rounded-[16px] h-[300px] w-full' style={{ border:'1.5px dashed #D0D5DD' }}>
                                <img src="./images/file-upload.svg" alt="" />
                                <p className='text-text-color font-[600] mt-5'>Click to upload <span className='font-[400] text-[#475367]'>or drag and drop</span> </p>
                                <p className='text-[#98A2B3]'>PNG, JPG (max. 5mb)</p>
                                <div className='flex items-center gap-[15px] w-full mt-5'>
                                    <div className='w-[35%] ml-auto h-[2px] bg-[#F0F2F5]'></div>
                                    <p>OR</p>
                                    <div className='w-[35%] mr-auto h-[2px] bg-[#F0F2F5]'></div>
                                </div>
                                <input type="file" onChange={e => handleRelationImageUpload(e.target.files[0])} className='cursor-pointer absolute opacity-0 h-full outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                                <button className='text-white bg-primary-color rounded-[4px] mt-[2.5rem] px-[28px] py-[10px] text-center mx-auto'>Browse Files</button>
                            </div>
                        </div>
                    </>
                    }

                    {
                        isLoading ?
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <div className="flex items-center justify-end mt-10 gap-3">
                            <button  className="py-3 px-4 border border-[#1D1D1D] rounded-[8px] text-[14px]" onClick={() => navigate('/dashboard')}>Cancel</button>
                            <button className="bg-primary-color text-white px-6 py-3 rounded-[8px] text-[14px]" onClick={createUser} >Create Account</button>
                        </div>
                    }
                </div>
            </div>
        </div>
        {
            fileUploadLoader &&
            <div style={{position:'fixed', width:'100%', left:'0', top:'0', zIndex:'99', display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:"rgba(18, 18, 18, 0.8)" }}>
                <div className="bg-white" style={{ borderRadius:'10px' }}>
                    {/* <i className=' ri-close-fill block text-[1.2rem] text-end mt-[1rem] mr-[1rem] cursor-pointer'></i> */}
                    <div className="flex items-center justify-between mt-[1rem] px-[2rem] mb-[2rem] flex-col" style={{ padding:'2rem', textAlign:'center' }} >
                        <img src='./images/loader.gif' style={{ height:'40px', width:'40px', margin:'12px auto 30px' }} />
                        <p className='text-gray-500 text-[15px] mb-2 text-center'>File Upload in progress, please do not refresh the page</p>
                    </div>
                </div>
            </div>
        }
        {   msg &&
            <AlertModal msg={msg} alertType={alertType} setMsg={setMsg} alertTitle={alertTitle}/>
        }
    </div>
  )
}

export default CreateUser