import React, { useState } from 'react'
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';
import { useNavigate } from 'react-router-dom';
import { CiFilter } from 'react-icons/ci';
import { GoChevronDown } from 'react-icons/go';

const Summary = () => {

    const [filterDropDown, setFilterDropdown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [allOrders, setAllOrders] = useState([])
    const [msg, setMsg] = useState('')
    const filterArray = ['All', "Admin sales", "Admin Purchases"]
    const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div>
        <SideNav />
        <div className="w-[78%] ml-auto pb-5">
            <TopNav />
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/')} className='cursor-pointer' />
                        <p className="text-[28px] text-primary-color font-[600]">Attendance Summary</p>
                    </div>
                    <div className='relative flex items-center gap-[10px]'>
                        <div className='flex items-center bg-white p-2 rounded-[4px] cursor-pointer' onClick={() => setFilterDropdown(!filterDropDown)}>
                            <CiFilter className='mr-1'/>
                            <p className='px-5 border-l'>Filter</p>
                            <GoChevronDown />
                        </div>
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
                <div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Summary