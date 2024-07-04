import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { IoChevronDownOutline, IoCloseOutline } from 'react-icons/io5'
import Alert from '../../components/alert/Alert'
import { useNavigate } from 'react-router-dom'
import SubCard from '../../components/sub-card/SubCard'
import ConfirmSubModal from '../../components/confirm-sub-modal/ConfirmSubModal'

const Subscribe = ({baseUrl}) => {

    const [featuresDropDown, setFeaturesDropDown] = useState(false)
    const [subscriptionType, setSubscriptionType] = useState('')
    const [quantity, setQuantity] = useState('')
    const durationArray = ['Yearly','Monthly','Weeekly','Daily']
    const [arrayOfFeatures, setArrayOfFeatures] = useState([])
    const [selectedFeature, setSelectedFeature] = useState('')
    const [selectedFeatureDuration, setSelectedFeatureDuration] = useState('')
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [aboutFeatureModal, setAboutFeatureModal] = useState(false)
    const [confirmSubModal, setConfirmSubModal] = useState(false)

    const user = JSON.parse(localStorage.getItem('user'))

    const [checkedIds, setCheckedIds] = useState([]);

    // const handleGoClick = () => {
    //     const checkedIds = [];
    //     arrayOfFeatures.forEach(feature => {
    //         feature.benefit.forEach(ben => {
    //             const checkbox = document.getElementById(`checkbox-${ben.id}`);
    //             if (checkbox.checked) {
    //                 checkedIds.push(ben.id);
    //             }
    //         });
    //     });
    //     console.log("Checked IDs:", checkedIds);
    //     setCheckedIds(checkedIds);
    // };

    async function getSubs(){
        const res = await fetch(`${baseUrl}/subscriptions`,{
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        setArrayOfFeatures(data.data)
        console.log(data);
    }

    useEffect(() => {
        getSubs()
    },[])

    console.log(arrayOfFeatures);

    // async function handleSubscription(){
    //     const res = await fetch(`${baseUrl}/plan/add-to-cart`,{
    //         method:"POST",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization:`Bearer ${user.data.access_token}`
    //         },
    //         body: JSON.stringify({ subscriptionType, quantity })
    //     })
    //     const data = await res.json()
    //     if(res.ok){
    //         setMsg("Subscription Added Successfully");
    //         setAlertType('success')
    //         setQuantity('')
    //         setSelectedFeature('')
    //         setSelectedFeatureDuration('')
    //     }
    //     if(!res.ok){
    //         setMsg("Subscription Was Not Successfully Added");
    //         setAlertType('error')
    //     }
    //     console.log(res, data);
    //     console.log(quantity, subscriptionType);
    // }

    // const subArray = [
    //     {
    //         price:'250',
    //         duration:'Weekly'
    //     },
    //     {
    //         price:'700',
    //         duration:'Yearly'
    //     },
    //     {
    //         price:'500',
    //         duration:'Mothly'
    //     },
    //     {
    //         price:'900',
    //         duration:'Weekly'
    //     },
    //     {
    //         price:'400',
    //         duration:'14 Weeks'
    //     },
    //     {
    //         price:'900',
    //         duration:'24 Weeks'
    //     }
    // ]

  return (
    <div>
        <SideNav />
        <div className="w-[78%] ml-auto pb-5">
        <TopNav />
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div className="">
                        <p className="text-[28px] text-primary-color font-[600]">Subscription</p>
                        <p className='text-[#4F4F4F]'>Select the subscription plan that is perfect for your organization to get the best of Gotruhub.</p>
                        <p className='text-[#25751E] underline font-[500] cursor-pointer' onClick={() => setAboutFeatureModal(!aboutFeatureModal)} >Learn more about our features</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        <button className="bg-[#19201D] text-white px-5 py-3 rounded-[8px] text-[14px] w-[140px]" onClick={() => navigate('/token')}>Token</button>
                        <button className="border-[#646464] text-[#969696] font-[600] border px-5 py-3 rounded-[8px] text-[14px] w-[140px]" onClick={()=> navigate('/sub-summary')}>Cart</button>
                    </div>
                </div>
                <div className='px-[30px]'>
                    <p className='font-[500] text-[20px] mb-2'>Basic Plans</p>
                    <div className="grid grid-cols-5 gap-4">
                        {
                            arrayOfFeatures && arrayOfFeatures.map(plan => (
                                <SubCard plan={plan} setConfirmSubModal={setConfirmSubModal}/>
                            ))
                        }
                    </div>
                </div>

                {/* <div className='px-[30px] mt-[4rem]'>
                    <p className='font-[500] text-[20px] mb-2'>Combo Plans</p>
                    <div className="grid grid-cols-5 gap-4">
                        {
                            [1,1,1,1,1,1,1].map(plan => (
                                <SubCard />
                            ))
                        }
                    </div>
                </div>

                <div className='px-[30px] mt-[4rem]'>
                    <p className='font-[500] text-[20px] mb-2'>Bulk Plans</p>
                    <div className="grid grid-cols-5 gap-4">
                        {
                            [1,1,1].map(plan => (
                                <SubCard />
                            ))
                        }
                    </div>
                </div>

                <div className='px-[30px] mt-[4rem]'>
                    <p className='font-[500] text-[20px] mb-2'>Result Plan</p>
                    <div className="grid grid-cols-5 gap-4">
                        {
                            [1].map(plan => (
                                <SubCard />
                            ))
                        }
                    </div>
                </div> */}
                {/* <div className='mt-7 flex items-center gap-5 w-full px-[30px]'>
                    <div className='w-full relative'>
                        <label className='block text-left mb-2 text-text-color'>What features would you like to subscribe for?</label>
                        <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                            <input type="text" value={selectedFeature} placeholder='Gotrupass, Gotrumonitor' className='outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                            <IoChevronDownOutline color="d7d7d7" cursor='pointer' onClick={() => setFeaturesDropDown(!featuresDropDown)}/>
                        </div>
                        {featuresDropDown &&
                            <div className='py-5 bg-white absolute  border overflow-y-scroll h-[320px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                {
                                    arrayOfFeatures && arrayOfFeatures.map(ftr => (
                                        <div className='px-3 border-b pb-3 cursor-pointer mb-3'>
                                            <p className='text-[#1D1D1D] capitalize text-[12px]'>{ftr.name} <span className='text-[10px]'>({ftr.duration})</span></p>
                                            {
                                                ftr.feature.map(benefit => (
                                                    <div className='flex items-center gap-1 mt-1'>
                                                        <input className='cursor-pointer' type="checkbox" onChange={e => {
                                                            setSelectedFeature(benefit.name)
                                                            setSelectedFeatureDuration(ftr.duration)
                                                            setSubscriptionType(ftr._id)
                                                            }} name="benefit" />
                                                        <p className='text-[#6F7975] text-[12px]'>{benefit.name}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>

                    <div className='w-full relative'>
                        <label className='block text-text-color text-left mb-2'>Select the duration you are subscribing for</label>
                        <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                            <input type="text" value={selectedFeatureDuration} placeholder='Monthly' className='outline-none w-full rounded-[4px] bg-transparent text-[14px] capitalize'/>
                        </div>
                    </div>
                </div>
                <div className='w-full mt-7 flex flex-col px-[30px]'>
                    <label className='block text-text-color text-left mb-2'>How many members will be using this feature?</label>
                    <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                        <input onChange={e => setQuantity(e.target.value)} type="text" placeholder='250' className='outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                    </div>
                </div>
                <div className='w-full mt-7 px-[30px] flex items-center gap-5 '>
                    <button className='bg-[#2D3934] rounded-[4px] px-5 py-3 text-[#FAFAFA] font-[600]' onClick={()=> navigate('/sub-summary')}>View Summary</button>
                    <button className='border border-[#2D3934] rounded-[4px] py-3 px-6 text-[#2D3934] font-[600]' onClick={handleSubscription}>Add to cart</button>
                </div> */}
            </div>
        </div>
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }

        {
            aboutFeatureModal &&
            <>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setAboutFeatureModal(false)}></div>
                <div className="gap-3 bg-white w-[65%] h-[500px] overflow-y-scroll fixed top-[50%] left-[50%] py-[20px] px-[2rem] z-[100]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px] mb-5">
                        <p className="text-[22px]">Features</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setAboutFeatureModal(false)}/>
                    </div>
                    <div>
                        <div className='flex items-center gap-9 bg-[#F2F2F2] rounded-[12px] px-9 py-5'>
                            <div className='rounded-[4px] bg-[#119353] py-[2rem] px-[1rem] text-center text-white'>
                                <div className='bg-white inline-flex p-3 rounded-full items-center justify-center'>
                                    <img src="./images/scan.svg" alt="" className='w-[20px]' />
                                </div>
                                <p className='font-[600] my-2'>Pass</p>
                                <p className='font-[600]'>#400/Month</p>
                            </div>
                            <div>
                                <p className='text-[#19201D] font-[600]'>Pass</p>
                                <p className='text-[#4F4F4F] text-[14px] mt-2'>This feature enables organizations to effectively manage their members' sign-in and sign-out activities. With GotruPass, organizations can maintain a comprehensive record of the exact locations where their members sign in, ensuring accurate tracking. Moreover, it provides a vital layer of security by enabling organizations to identify the authorized personnel responsible for signing members in or out. By leveraging GotruPass, organizations can effortlessly track the presence of individuals within their premises, enabling them to maintain precise and up-to-date records of who has successfully signed in and who hasn't at any given moment.</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-9 bg-[#F2F2F2] rounded-[12px] px-9 py-5 my-10'>
                            <div className='rounded-[4px] bg-[#119353] py-[2rem] px-[1rem] text-center text-white'>
                                <div className='bg-white inline-flex p-3 rounded-full items-center justify-center'>
                                    <img src="./images/Tick-Square.svg" alt="" className='w-[20px]' />
                                </div>
                                <p className='font-[600] my-2'>Monitor</p>
                                <p className='font-[600]'>#400/Month</p>
                            </div>
                            <div>
                                <p className='text-[#19201D] font-[600]'>Monitor</p>
                                <p className='text-[#4F4F4F] text-[14px] mt-2'>This feature enables organizations to effectively manage their members' sign-in and sign-out activities. With GotruPass, organizations can maintain a comprehensive record of the exact locations where their members sign in, ensuring accurate tracking. Moreover, it provides a vital layer of security by enabling organizations to identify the authorized personnel responsible for signing members in or out. By leveraging GotruPass, organizations can effortlessly track the presence of individuals within their premises, enabling them to maintain precise and up-to-date records of who has successfully signed in and who hasn't at any given moment.</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-9 bg-[#F2F2F2] rounded-[12px] px-9 py-5'>
                            <div className='rounded-[4px] bg-[#119353] py-[2rem] px-[1rem] text-center text-white'>
                                <div className='bg-white inline-flex p-3 rounded-full items-center justify-center'>
                                    <img src="./images/Wallet-dark.svg" alt="" className='w-[20px]' />
                                </div>
                                <p className='font-[600] my-2'>Trade</p>
                                <p className='font-[600]'>#400/Month</p>
                            </div>
                            <div>
                                <p className='text-[#19201D] font-[600]'>Trade</p>
                                <p className='text-[#4F4F4F] text-[14px] mt-2'>This feature enables organizations to effectively manage their members' sign-in and sign-out activities. With GotruPass, organizations can maintain a comprehensive record of the exact locations where their members sign in, ensuring accurate tracking. Moreover, it provides a vital layer of security by enabling organizations to identify the authorized personnel responsible for signing members in or out. By leveraging GotruPass, organizations can effortlessly track the presence of individuals within their premises, enabling them to maintain precise and up-to-date records of who has successfully signed in and who hasn't at any given moment.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        }

        {
            confirmSubModal && <ConfirmSubModal setMsg={setMsg} setAlertType={setAlertType} setConfirmSubModal={setConfirmSubModal} baseUrl={baseUrl}/>
        }
    </div>
  )
}

export default Subscribe