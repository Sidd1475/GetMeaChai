"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'

const Dashboard = () => {
    const { data: session, update } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})

    useEffect(() => {
        console.log(session)
        if (!session) {
            router.push('/login')
        }

        else {
            getData()
        }

    }, [])


      useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }
    (async () => {
      const u = await fetchuser(session.user.name);
      setForm(u || {});
    })();
  }, [session, router]);

 
   const handleSave = async (e) => {
    e.preventDefault(); // prevent form submission reload

    try {
        const res = await updateProfile(e, session.user.name);  // this should do the saving
        if (res.success) {
            alert("Profile saved!");
            router.push('{`/${session.user.name}`}');
        } else {
            alert("Failed to save profile");
        }
    } catch (err) {
        console.error("Error saving profile:", err);
    }
}






    const getData = async () => {
        let u = await fetchuser(session.user.name)
        if (u) {
            setform(u)
        } else {
            setform({})  // fallback to empty object
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

  const handleSubmit = async (e) => {
      e.preventDefault();                 // stop default full‑page refresh
    try {
      const res = await updateProfile(form, session.user.name);
      if (!res?.success) {
        alert(`Failed to save profile: ${res?.message || "Unknown error"}`);
        return;
      }

      alert("Profile saved!");

      // decide which username to use in the URL
      const username = form.username?.trim() || session.user.name;
      router.push(`/${username}`);      // 👉 go to /siddharth140705 etc.
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };





    return (
        <>

            <div className='container mx-auto py-5 px-6 '>
                <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your Dashboard</h1>

                <form className="max-w-2xl mx-auto" action={handleSubmit}>

                    <div className='my-2'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input for email */}
                    <div className="my-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name='email' id="email" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input forusername */}
                    <div className='my-2'>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id="username" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input for profile picture of input type text */}
                    <div className="my-2">
                        <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
                        <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" name='profilepic' id="profilepic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* input for cover pic  */}
                    <div className="my-2">
                        <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
                        <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" name='coverpic' id="coverpic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div className="my-2">
                        <label htmlFor="paypalid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">paypal Id</label>
                        <input value={form.paypalid ? form.paypalid : ""} onChange={handleChange} type="text" name='paypalid' id="paypalid" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input paypal secret */}
                    <div className="my-2">
                        <label htmlFor="paypalsecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">paypal Secret</label>
                        <input value={form.paypalsecret ? form.paypalsecret : ""} onChange={handleChange} type="text" name='paypalsecret' id="paypalsecret" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* Submit Button  */}
                    <div className="my-6">
                        <button type="submit" className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none   dark:focus:ring-blue-800 font-medium text-sm" onClick={handleSubmit}>Save</button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default Dashboard