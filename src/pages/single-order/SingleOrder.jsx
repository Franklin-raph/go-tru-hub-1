import React, { useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { CiFilter } from 'react-icons/ci'
import { GoChevronDown } from 'react-icons/go'
import { useNavigate, useParams } from 'react-router-dom'

const SingleOrder = () => {

    const navigate = useNavigate()
    const { id } = useParams()

  return (
    <div>
        <SideNav />
        <div className="w-[78%] ml-auto pb-5">
            <TopNav />
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/orders')} className='cursor-pointer' />
                            <p className="text-[28px] text-primary-color font-[600]">T{id}</p>
                        </div>
                    </div>
                </div>
                <div class="relative overflow-x-auto mx-5 p-8 flex flex-col justify-center items-center gap-3">
                    <div className='flex items-center justify-center flex-col'>
                        <p className='text-[#4F4F4F] font-[600] text-[24px]'>Timi Gowon</p>
                        <p className='text-[#757575] mb-2'>Member - JSS1 B</p>
                        <p className='text-[#25751E] bg-[#25751E1A] px-3 rounded-full py-[2px] font-[500]'>Delivered</p>
                    </div>
                    <div className='w-[400px] mt-5 border-b pb-5'>
                        <div>
                            <div>
                                <p className='text-[#828282]'>Received by</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-[#19201D]'>Nwaigwe Zainab Ayomide</p>
                                <p className='text-[#25751E]'>Assignee</p>
                            </div>
                        </div>
                        <div className='mt-7'>
                            <div>
                                <p className='text-[#828282]'>Delivered by</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-[#19201D]'>Olajumoke Ali</p>
                                <p className='text-[#25751E]'>Admin</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-[400px] mt-5 pb-5'>
                        <div className='flex items-center justify-between text-[#828282] mb-2'>
                            <div className='flex items-center gap-6'>
                                <p>S/N</p>
                                <p>Product</p>
                            </div>
                            <p>Price</p>
                        </div>
                        <div className='border-b pb-3 mb-3'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-11'>
                                    <p>1.</p>
                                    <p>Sandals</p>
                                </div>
                                <p>#1,000</p>
                            </div>
                            <p className='text-[#828282] ml-[3.2rem]'>Size: 40, Colour: black, Unit: 3</p>
                        </div>
                        <div className='border-b pb-3'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-11'>
                                    <p>2.</p>
                                    <p>Cheeseballs</p>
                                </div>
                                <p>#500</p>
                            </div>
                            <p className='text-[#828282] ml-[3.2rem]'>Unit: 3</p>
                        </div>
                        <div className='mt-5 flex gap-3 flex-col'>
                            <div className='flex items-center justify-between'>
                                <p className='text-[#828282]'>Subtotal</p>
                                <p>#120,000</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-[#828282]'>Tax</p>
                                <p>#500</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-[#828282]'>Total</p>
                                <p className='font-[600]'>#120,5000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleOrder