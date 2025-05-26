'use client';

import PaypalButton from '@/components/paypalButton';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { fetchpayment, fetchuser } from '@/actions/useractions';

const Paymentpage = ({ username }) => {
    const [currentUser, setcurrentUser] = useState(null);
    const [paymentform, setpaymentform] = useState({ name: "", message: "", amount: "" });
    const [Payments, setPayments] = useState([]);
    const searchparams = useSearchParams();
    const [form, setform] = useState({})

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (searchparams.get("paymentdone") === "true") {
            toast('Payment has been made', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }, []);

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
    };

    const getData = async () => {
        const u = await fetchuser(username);
        setcurrentUser(u);

        const dbpayment = await fetchpayment(username);
        setPayments(dbpayment || []);
    };



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />

            <div className='cover w-full bg-red-50 relative'>
                {form?.coverpic && (
                    <img className='object-cover w-full h-[350px]' src={form.coverpic} alt="Cover" />
                )}

                <div className='absolute -bottom-12 right-[45%] border-4 border-white rounded-full'>
                    {form?.profilepic && (
                        <img className='rounded-full' width={150} height={150} src={form.profilepic} alt="Profile" />
                    )}

                </div>
            </div>

            <div className="info flex justify-center items-center my-16 font-bold flex-col gap-2">
                @{username}
                <div className='text-slate-400'>
                    Creating animated arts
                </div>
                <div className='text-slate-400'>
                    9,120 members . 82 posts . $400/release
                </div>

                <div className="payment flex gap-3 w-[80%] mt-11">
                    {/* Supporters */}
                    <div className="supporters w-1/2 bg-slate-900 p-5 text-white">
                        <h2 className='text-2xl font-bold my-5'>Supporters</h2>
                        <ul className='mx-5'>
                            {Payments.map((p, i) => (
                                <li key={i} className='py-4 flex gap-2 items-center'>
                                    <img width={45} src="/avatar.gif" alt="Avatar" />
                                    <span>
                                        {p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message: {p.message}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Make Payment */}
                    <div className="makePayment w-1/2 bg-slate-900 p-5 text-white">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className="flex flex-col gap-2">
                            <input
                                name="name"
                                onChange={handleChange}
                                value={paymentform.name}
                                type="text"
                                className='w-full p-3 rounded-lg bg-slate-800'
                                placeholder='Enter Your Name'
                            />

                            <input
                                name="message"
                                value={paymentform.message}
                                onChange={handleChange}
                                type="text"
                                className='w-full p-3 rounded-lg bg-slate-800'
                                placeholder='Enter Your Message'
                            />

                            <input
                                name="amount"
                                onChange={handleChange}
                                value={paymentform.amount}
                                type="number"
                                className='w-full p-3 rounded-lg bg-slate-800'
                                placeholder='Enter Amount (INR)'
                            />

                            {/* Paypal Button */}
                            <PaypalButton
                                amount={paymentform.amount}
                                name={paymentform.name}
                                message={paymentform.message}
                                username={username}
                            />





                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Paymentpage;