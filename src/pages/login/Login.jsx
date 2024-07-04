import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../../components/alert/Alert'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Navbar from '../../components/navbar/Navbar'

const Login = ({baseUrl}) => {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [encrypted, setEncrypted] = useState(true);
  const [msg, setMsg] = useState('')
  const [alertType, setAlertType] = useState()

  const body = {
    email,
    password
  };
  const [loading, setLoading] = useState(false)

  async function login() {
    if (!email || !password) {
      setMsg("Email and Password are required!!");
      setAlertType('error');
      return;
    }
    console.log(body);
    setLoading(true)
    const resp = await fetch(`${baseUrl}/login/organization`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 
          "Content-type": "application/json" 
        }
      }
    );
    const data = await resp.json();
    console.log(resp, data);
    if(resp) setLoading(false)
    if (!resp.ok) {
      setMsg(data.message);
      setAlertType('error')
      return;
    }
    if(resp.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      // window.location.href = '/#/dashboard'
      navigate("/dashboard");
    }
    // if(data.organization) {
    //   setAgent(data.organization);
    //   localStorage.setItem("agent", JSON.stringify(data.organization));
    // }
    // localStorage.setItem("token", data.token);
  }


  return (
    <>
      <Navbar />
      <div className='w-[100%] mx-auto text-center my-[4rem]'>
        <div className='md:w-[40%] sm:w-[60%] w-[90%] mx-auto'>
          <p className='text-[28px] mb-[40px]'>Login to manage your company</p>
          <div>
            <label className='block text-left mb-2'>Email Address</label>
            <input placeholder='hello@company.com' type="text" onChange={e => setEmail(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
          </div>
          <div className='mt-7'>
            <label className='block text-left mb-2'>Password</label>
            <div className='px-4 py-3 outline-none border w-full rounded-[4px]'>
              <input placeholder='Your Password' type="password" onChange={e => setPassword(e.target.value)} className='outline-none w-full rounded-[4px]'/>
            </div>
          </div>
          <p className='text-left mt-5'>Forgot Your Password? <span className='text-secondary-color cursor-pointer' onClick={() => navigate('/reset-password')}>Reset</span> </p>
          {
              loading ? 
              <BtnLoader bgColor="#191f1c"/>
              :
              <button onClick={login} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Login</button>
          }
          <p className='mt-10'>New to Gotru? <span className='text-secondary-color  cursor-pointer' onClick={() => navigate('/register')}>Sign up</span> </p>
        </div>
        <div className='text-[#6F7975] mt-[10rem]'>
          <p>&copy; 2022 Gotruhub and Gotruhub logo are trademarks of the company.</p>
          <p>Please visit our <span className='text-secondary-color cursor-pointer'>Terms of service</span> for more details.</p>
        </div>

        {
          msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }

      </div>
    </>
  )
}

export default Login