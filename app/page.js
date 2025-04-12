"use client"
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";


export default function Home() {




  return (  
    <>
      <div className="flex flex-col justify-center  px-5 md:px-0 text-white h-[43vh] items-center text-xs md:text-base gap-4">
        <div className="font-bold text-2xl md:text-4xl flex justify-center items-center gap-3 text-center">
          Get Me a Chai
          <span>
            <img src="/icons/chai.gif" className="md:w-16 w-12"  alt="" />
          </span>
        </div>
        <p className="text-center md:text-left">
          A crowdfunding platform for creators. Get funded by your fans and
          followers. Start now!
        </p>
        <p className="text-center md:text-left">
          A place where your fans can buy you a Chai. Unleash the power of your fans and get your project funded
        </p>
        <div>
          <Link href={'/login'}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3  md:px-5 py-2 md:py-2.5 text-center me-2 mb-2"
          >
            Start Here
          </button>
          </Link>
          <Link href={'/about'}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3  md:px-5 py-2 md:py-2.5 text-center me-2 mb-2"
          >
            Read More
          </button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto py-16">
        <h2 className="text-2xl font-bold text-center mb-10">
          Your Fans can buy you a Chai
        </h2>
        <div className="flex justify-around gap-5 sm:flex-row flex-col">
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img
              className=" bg-slate-400 rounded-full p-2"
              width={75}
              src="/icons/man.gif"
              alt=""
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img
              className=" bg-slate-400 rounded-full  p-1"
              width={75}
              src="/icons/coin.gif"
              alt=""
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img
              className=" bg-slate-400 rounded-full p-2"
              width={75}
              src="/icons/group.gif"
              alt=""
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto py-16 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-center mb-10">
          Learn more about us
        </h2>
        <iframe className="md:w-[460px] md:h-[260px] w-[230px] h-[130px]" src="https://www.youtube.com/embed/ojuUnfqnUI0?si=bEGkYfEXoNAg4rZf" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </>
  );
}
