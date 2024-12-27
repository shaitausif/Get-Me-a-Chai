"use client"
import React,{useEffect,useState} from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser , updateProfile } from "@/actions/useraction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Page = () => {
  const { data: session, update } = useSession();
  const router = useRouter()   
  const [form, setform] = useState({})


  // it will re-render the component after every time screen refreshes
  useEffect(() => {
    if(!session) { 
      router.push('/login')
  }
  else{
    getData()
  }
  },[router,session])

  const handleChange = (e)=>{
      setform({...form,[e.target.name]:e.target.value})
  }

  const getData = async()=>{
    let a = await fetchuser(session.user.name)
    setform(a)
  }

  const handleSubmit = async(data)=>{
      update()
      let a = await updateProfile(data,session.user.name)
      toast("Profile Updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
  }

  return (
    <> 
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
    <div className="container mx-auto text-white py-4 px-6">
    <h1 className="text-center my-3 text-3xl font-bold">Welcome to your Dashboard</h1>
    <form className="mx-auto max-w-xl" action={handleSubmit}>

      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="name">Name</label>
        <input value={form.name?form.name:""} onChange={handleChange} className="block w-full p-1.5 px-4 text-gray-900 border border-gray-300 bg-gray-50 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="name" id="name" type="text" />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Email</label>
        <input value={form.email?form.email:""} onChange={handleChange} className="block w-full p-1.5 px-4 text-gray-900 border border-gray-300 bg-gray-50 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="email" id="email" type="email" />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="username">Username</label>
        <input value={form.username?form.username:""} onChange={handleChange} className="block w-full p-1.5 px-4 text-gray-900 border border-gray-300 bg-gray-50 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="username" id="username" type="text" />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="profilepic">Profile Picture</label>
        <input value={form.profilepic?form.profilepic:""} onChange={handleChange} className="block w-full p-1.5 px-4 text-gray-900 border border-gray-300 bg-gray-50 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="profilepic" id="profilepic" type="text" />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="coverpic">Cover Picture</label>
        <input value={form.coverpic?form.coverpic:""} onChange={handleChange} className="block w-full p-1.5 px-4 text-gray-900 border border-gray-300 bg-gray-50 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="coverpic" id="coverpic" type="text" />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="razorpaycredentials">Razorpay ID</label>
        <input value={form.razorpayid?form.razorpayid:""} onChange={handleChange} className="block w-full p-1.5 px-4 text-gray-900 border border-gray-300 bg-gray-50 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="razorpayid" id="razorpayid" type="text" />
      </div>
      <div className="my-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="razorpaycredentials">Razorpay Secret</label>
        <input value={form.razorpaysecret?form.razorpaysecret:""} onChange={handleChange} className="block w-full p-1.5 px-4 text-gray-900 border border-gray-300 bg-gray-50 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="razorpaysecret" id="razorpaysecret" type="text" />
      </div>
    
      <div className="my-6">
        <button className="block w-full py-1.5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none dark:focus:ring-blue-800 font-medium text-sm" type="submit">Save</button>
      </div>
    </form>
    </div>
    </>
  )
}

export default Page
