import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';

const ManageUsers = ({baseUrl}) => {

  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    getAllUsers()
  },[])

  async function getAllUsers(){
    const res = await fetch(`${baseUrl}/users/get-users/student`,{
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.data.access_token}`
        }
    })
    const data = await res.json()
    console.log(data.data.users);
    setAllUsers(data.data.users)
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  return (
    <div>
      <SideNav />
      <div className="w-full lg:w-[78%] bg-[#F2FCF7] ml-auto">
        <TopNav />
          <div className="lg:px-[30px] px-[10px] py-[1rem]">
            <div className="flex items-center justify-between mb-[3rem]">
              <p className="text-[28px] text-primary-color font-[600]">Manage Users</p>
              <div className="flex items-center gap-3">
                <button className="bg-[#2D3934] text-white px-4 py-3 rounded-[8px] text-[14px]" onClick={() => navigate('/create-user')} >Create User</button>
              </div>
            </div>
          </div>

          <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-left">
                  <thead class="text-[14px] border-b">
                      <tr>
                          <th scope="col" class="px-6 py-3 th1 font-[700]">S/N</th>
                          <th scope="col" class="px-6 py-3 font-[700]">Name</th>
                          <th scope="col" class="px-6 py-3 font-[700]">Email</th>
                          <th scope="col" class="px-6 py-3 font-[700]">Role</th>
                          <th scope="col" class="px-6 py-3 font-[700]">Date Added</th>
                          <th scope="col" class="px-2 py-3 font-[700]">Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                        allUsers && allUsers.map((user, index) => {
                            return(
                                <tr style={{borderBottom:"1px solid #dcdcdc"}} key={index}>
                                    <td class="px-6 py-4">{index +1}</td>
                                    <td class="px-6 py-4 flex items-center gap-1">
                                      <img src={user.profileImage.file} className='w-[16px] h-[16px] rounded-full' alt={`${user.fullName} img`} />
                                      <p>{user.fullName}</p>
                                    </td>
                                    <td class="px-6 py-4">{user.email ? user.email : "N/A"}</td>
                                    <td class="px-6 py-4 capitalize">{user.role}</td>
                                    <td class="px-6 py-4">{formatDate(user.createdAt)}</td>
                                    <td>
                                      <button className='text-white bg-[#2D3934] px-4 py-2 rounded-[4px]' onClick={() => {
                                        if(user.role === "student"){
                                          navigate(`/user/${user._id}`)
                                        }else{
                                          navigate(`/staff/${user._id}`)
                                        }
                                      }}>View</button>  
                                    </td>
                                </tr>
                            )
                        })
                      }
                  </tbody>
              </table>
              {/* <ReactPaginate
                  previousLabel={'Prev'}
                  nextLabel = {'Next'}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName='flex items-center gap-9 mt-5 justify-end pr-[30px] paginationBtns'
                  activeClassName='bg-secondary-color text-white'
                  disabledClassName='bg-gray-500 cursor-not-allowed'
              /> */}
          </div>
        </div>
    </div>
  )
}

export default ManageUsers