"use client";
import React, {useState} from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setshowdropdown] = useState(false)
  // if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }

  const handleSignout = () => {
    signOut()
    setTimeout(() => {
      setshowdropdown(false)
    }, 500);
    
    
  }
  

  return (
    <nav className="flex justify-between px-5 bg-gray-900 text-white items-center flex-col md:flex-row md:h-16 pt-1">
      <div >
        <Link className="logo font-bold text-lg flex justify-center items-center gap-2"  href={"/"}>
        
        <img width={30} src="/icons/chai.gif" alt="" />
        <span>GetMeaChai!</span>
        </Link>
      </div>
      {/* <ul className='flex gap-5'>
            <li>Home</li>
            <li>About</li>
            <li>Projects</li>
            <li>Signup Up</li>
            <li>Login</li>
        </ul> */}
      <div className="relative">
        {session && (
          <>
            <button onClick={()=>setshowdropdown(!showdropdown)}
              onBlur={()=>{
                setTimeout(() => {
                  setshowdropdown(false)
                }, 100);
              }}
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className="mx-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-[10px] px-5 py-2 md:py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
             Welcome {session.user.name}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdownHover"
              className={`z-10 ${showdropdown?"":"hidden"} bg-white divide-y absolute left-[50px] divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownHoverButton"
              >
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${session.user.name}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Your Page
                  </Link>
                </li>
            
                <li>
                  <Link onClick={handleSignout}
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
        
        {session && (
          <button
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 md:px-5 py-2 md:py-2.5 mt-2 text-center mb-3"
            onClick={() => {
              signOut("github");
            }}
          >
            Logout
          </button>
        )}

        {!session && (
          <Link href={"/login"}>
            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 md:px-5 py-2 md:py-2.5 text-center mt-2 mb-2">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
