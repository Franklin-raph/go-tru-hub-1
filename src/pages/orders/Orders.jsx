import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { CiFilter } from 'react-icons/ci'
import { GoChevronDown } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'

const Orders = ({baseUrl}) => {

    const navigate = useNavigate()
    const [filterDropDown, setFilterDropdown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [allOrders, setAllOrders] = useState([])
    const [msg, setMsg] = useState('')
    const filterArray = ['All', "Admin sales", "Admin Purchases"]
    const user = JSON.parse(localStorage.getItem('user'))

    async function getAllOrders(){
        const res = await fetch(`${baseUrl}/trade/admin/orders`,{
            headers:{
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data);
    }

    useEffect(() => {
        getAllOrders()
    },[])


  return (
    <div>
        <SideNav />
        <div className="w-[78%] ml-auto pb-5">
            <TopNav />
            <div className="">
                <div className="flex justify-between items-start mb-[1rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/wallet')} className='cursor-pointer' />
                            <p className="text-[28px] text-primary-color font-[600]">Orders</p>
                        </div>
                    </div>
                    <div className='relative flex items-center gap-[10px]'>
                        <div className='flex items-center bg-white p-2 rounded-[4px] cursor-pointer' onClick={() => setFilterDropdown(!filterDropDown)}>
                            <CiFilter className='mr-1'/>
                            <p className='px-5 border-l'>Filter</p>
                            <GoChevronDown />
                        </div>
                        <button className='text-white text-[14px] bg-[#2D3934] w-full rounded-[4px] px-[15px] py-[6px] text-center mx-auto'>Assign Pick Up</button>
                        <div className='absolute top-[40px] z-10'>
                            {
                                    filterDropDown &&
                                    <div className='border mt-1 rounded-[6px] bg-[#fff] text-[#6F7975]'>
                                    {
                                        filterArray.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <p onClick={() => {
                                                        setFilterDropdown(false)
                                                    }} className='cursor-pointer p-3 hover:bg-gray-200'>{item}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div class="relative overflow-x-auto mx-5 p-8 flex flex-col gap-3">
                    <div>
                        <p>Nwaigwe Zainab Ayomide <span className='text-[#333]'>- Assignee</span> </p>
                    </div>
                    <div className='bg-[#F7F7F7] flex  items-center justify-between px-5 py-3 rounded-[8px] text-[12px] text-[#4F4F4F]'>
                        <p className='font-[600] text-black'>#0008926TY</p>
                        <p className='text-[#333]'>#2000</p>
                        <p>Timi Gowon - Member</p>
                        <p className='text-[#25751E] bg-[#25751E1A] px-3 rounded-full py-[2px]'>Delivered</p>
                        <p>21 October 2024, 10:00AM</p>
                        <button className='bg-[#19201D] text-white px-[20px] py-2 rounded-[6px]' onClick={() => navigate('/order/0008926TY')} >View</button>
                    </div>
                    <div className='bg-[#F7F7F7] flex  items-center justify-between px-5 py-3 rounded-[8px] text-[12px] text-[#4F4F4F]'>
                        <p className='font-[600] text-black'>#0008926TY</p>
                        <p className='text-[#333]'>#2000</p>
                        <p>Timi Gowon - Admin</p>
                        <p className='text-[#9A7225] bg-[#9A72251A] px-3 rounded-full py-[2px]'>Not delivered</p>
                        <p>21 October 2024, 10:00AM</p>
                        <button className='bg-[#19201D] text-white px-[20px] py-2 rounded-[6px]' onClick={() => navigate('/order/0008926AB')} >View</button>
                    </div>
                    <div className='bg-[#F7F7F7] flex  items-center justify-between px-5 py-3 rounded-[8px] text-[12px] text-[#4F4F4F]'>
                        <p className='font-[600] text-black'>#0008926TY</p>
                        <p className='text-[#333]'>#2000</p>
                        <p>Timi Gowon - Member</p>
                        <p className='text-[#25751E] bg-[#25751E1A] px-3 rounded-full py-[2px]'>Delivered</p>
                        <p>21 October 2024, 10:00AM</p>
                        <button className='bg-[#19201D] text-white px-[20px] py-2 rounded-[6px]' onClick={() => navigate('/order/0008926FG')} >View</button>
                    </div>
                    <div className='bg-[#F7F7F7] flex  items-center justify-between px-5 py-3 rounded-[8px] text-[12px] text-[#4F4F4F]'>
                        <p className='font-[600] text-black'>#0008926TY</p>
                        <p className='text-[#333]'>#2000</p>
                        <p>Timi Gowon - Member</p>
                        <p className='text-[#25751E] bg-[#25751E1A] px-3 rounded-full py-[2px]'>Delivered</p>
                        <p>21 October 2024, 10:00AM</p>
                        <button className='bg-[#19201D] text-white px-[20px] py-2 rounded-[6px]'>View</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Orders