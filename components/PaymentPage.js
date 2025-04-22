"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchuser, fetchpayments, initiate } from "@/actions/useraction";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast"
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const PaymentPage = ({ username }) => {
  // const { data: session } = useSession()
  const {toast} = useToast()
  const {data: session } = useSession()

  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setcurrentUser] = useState({});
  const [payments, setpayments] = useState([]);
  const searchParams = useSearchParams();
  const Router = useRouter()

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast({
        title : "Thanks for your donation",
        
      })
    }
    Router.replace(`/${username}`)
  }, []);

  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchuser(username);
    setcurrentUser(u);
    let dbpayments = await fetchpayments(username);
    setpayments(dbpayments);
  
  };

  // Get the order Id

  const pay = async (amount) => {

    if(!session && (!currentUser.razorpayid || !currentUser.razorpaysecret)){
      toast({
        title : "This User hasn't provided credentials for payments",
        variant : 'destructive'
      })
      return;
    }
    if(!currentUser.razorpayid || !currentUser.razorpaysecret){
      toast({
        title : "Please provide razorpay credentials first!",
        variant : 'destructive'
      })
      
      return
    }
    
   
    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key: currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Get Me a Chai", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
  };
  return (
    <>
     
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover w-full m-0 p-0 relative">
        
        <img
          className="md:w-full w-fit md:object-cover object-contain h-[300px]"
          src={currentUser.coverpic || 'data:image/jpeg;base64,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'}
          alt=""
        />
        <div className="absolute right-[38%] md:right-[46.7%] -bottom-10 border border-white rounded-full">
          <div className="w-[80px] h-[80px]">
            <img
              className="object-cover w-[80px] h-[80px] rounded-full"
              src={currentUser.profilepic || 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="info my-12 text-white flex justify-center items-center flex-col gap-2 ">
        <div className="font-bold text-lg">@{username}</div>

        <div className="text-slate-400">Let&apos;s help {username} to get a Chai</div>
        <div className="text-slate-400">
          {payments.length} {payments.length == 1 ? 'Payment' : 'Payments'} . ₹{payments.reduce((a,b)=> a + b.amount, 0)} raised
        </div>

        <div className="payment gap-3 flex flex-col md:flex-row w-[80%] mt-10">
          <div className="supporters bg-slate-900 w-full md:w-1/2 rounded-lg pl-5 pr-3 py-6">
            {/* Show list of all the supporters as a leaderboard */}
            <h2 className="font-bold text-xl my-5 px-2">Supporters</h2>
            <ul className="scrollbar mx-4 text-lg max-h-[315px] overflow-y-scroll">
              {payments.length == 0 && (
                <li className="text-base text-center">No Payments yet.</li>
              )}
              {payments.length > 0 &&
                payments.map((p, i) => {
                  return (
                    <li key={i} className="my-4 flex gap-2 items-center">
                      <img
                        width={30}
                        className="rounded-full"
                        src="/avatar.gif"
                        alt=""
                      />
                      <span>
                        {p.name} donated{" "}
                        <span className="font-bold">₹{p.amount}</span> with a
                        message &quot;{p.message}&quot;
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg px-10 py-6">
            <h2 className="font-bold my-5 text-2xl">Make a Payment</h2>
            <div className="flex gap-2 flex-col">
              <input
                onChange={handleChange}
                type="text"
                name="name"
                value={paymentform.name}
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Name"
              />
              <input
                onChange={handleChange}
                type="text"
                name="message"
                value={paymentform.message}
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Message"
              />
              <input
                onChange={handleChange}
                type="number"
                name="amount"
                value={paymentform.amount}
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Amount"
              />
              <div className="text-center">
                <button
                  onClick={() => pay(Number.parseInt(paymentform.amount * 100))}
                  type="button"
                  disabled={
                    paymentform.name.length < 3 ||
                    paymentform.message.length < 4 || paymentform.amount.length < 1
                  }
                  className="w-full disabled:from-slate-400 transition-all text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                >
                  Pay
                </button>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button
                disabled={
                  paymentform.name.length < 3 || paymentform.message.length < 4 
                }
                className="bg-slate-800 rounded-lg p-3"
                onClick={() => pay(1000)}
              >
                Pay ₹10
              </button>
              <button
                disabled={
                  paymentform.name.length < 3 || paymentform.message.length < 4
                }
                className="bg-slate-800 rounded-lg p-3"
                onClick={() => pay(2000)}
              >
                Pay ₹20
              </button>
              <button
                disabled={
                  paymentform.name.length < 3 || paymentform.message.length < 4
                }
                className="bg-slate-800 rounded-lg p-3"
                onClick={() => pay(3000)}
              >
                Pay ₹30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
