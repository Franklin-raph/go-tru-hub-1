import React from 'react'
import GuardianCard from '../guardian-card/GuardianCard'
import MemberCard from '../member-card/MemberCard'
import WalletCard from '../wallet-card/WalletCard'

import { Doughnut, Bar } from 'react-chartjs-2'

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import Slider from "react-slick";

const MemberProfile = ({currentUser, id}) => {

    Chart.register(CategoryScale);

    const settings = {
        speed: 500,
        slidesToShow: 2.03,
        slidesToScroll: 1,
      };

      const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };



    // console.log();
  return (
    <div className='flex items-start gap-10 px-[30px] py-[1rem]'>
        <div className='w-full'>
            <div className='shadow-md rounded-[6px] flex items-center gap-7 p-[20px] mb-10 w-full justify-between'>
                <img src={currentUser?.user?.profileImage?.file ? currentUser?.user?.profileImage?.file : './images/user.svg'} className='w-[200px] rounded-[6px]' alt="Member Image" />
                <img src={currentUser?.user?.passQrcode} className='w-[200px] rounded-[6px]' alt="Passcode Image" />
            </div>
            <MemberCard currentUser={currentUser} id={id}/>
            <GuardianCard currentUser={currentUser} id={id}/>
            <div className='shadow-md rounded-[6px] p-[20px] mt-10'>
                <div className='flex items-center justify-between mb-3'>
                    <p className='text-[#19201D] font-[600] txt-[18px]'>Authorized persons</p>
                    <img src="./images/edit.svg" alt="" className='cursor-pointer' />
                </div>
                <div className='flex items-center gap-7'>
                    <img src={currentUser?.user?.relationImage?.file} className='w-[45%] rounded-[6px]' alt="Relation image" />
                    <img src={currentUser?.user?.signature?.file} className='w-[45%] rounded-[6px]' alt="Image of signature" />
                </div>
            </div>
        </div>
        {/* <div className='w-[50%]'>
            <div className='shadow-md rounded-[6px] p-[20px] w-full'>
                <p className='text-[#1D1D1D] text-[18px] font-[600] mb-5'>Wallet</p>
                <div className='w-full'>
                    <Slider {...settings}>
                        <WalletCard title="Wallet balalance" amount="250,000,500" />
                        <WalletCard title="Total deposit" amount="150,000,500" />
                        <WalletCard title="Total purchases" amount="200,000,500" />
                        <WalletCard title="In-app" amount="180,000,500" />
                        <WalletCard title="In-store" amount="90,000,500" />
                    </Slider>
                </div>
            </div>
            <div className='w-[100%] shadow-md rounded-[6px] p-[20px] mt-10'>
                <p className='text-[#1D1D1D] text-[18px] font-[600] mb-5'>Assignment Strength</p>
                <div className='w-full'>
                    <Doughnut data={data} />
                </div>
            </div>

            <div className='w-[100%] shadow-md rounded-[6px] p-[20px] mt-10'>
                <p className='text-[#1D1D1D] text-[18px] font-[600] mb-5'>Gotrupass summary</p>
                <div className='w-full'>
                    <div className='w-full'>
                        <div className='flex items-center justify-between mb-3 w-full'>
                            <p className='text-[#1D1D1D] font-[500]'>Sign-in</p>
                            <p className='text-[#1D1D1D] font-[500]'>26 days</p>
                        </div>
                        <Bar
                        data={data}
                        options={{
                            plugins: {
                                title: {
                                display: false,
                                text: "Users Gained between 2016-2020"
                                },
                                legend: {
                                display: false
                                }
                            }
                            }}
                        />
                    </div>
                    <div className='w-full mt-10'>
                        <div className='flex items-center justify-between mb-3 w-full'>
                            <p className='text-[#1D1D1D] font-[500]'>Sign-out</p>
                            <p className='text-[#1D1D1D] font-[500]'>26 days</p>
                        </div>
                        <Bar
                        data={data}
                        options={{
                            plugins: {
                                title: {
                                display: false,
                                text: "Users Gained between 2016-2020"
                                },
                                legend: {
                                display: false
                                }
                            }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div> */}
    </div>
  )
}

export default MemberProfile