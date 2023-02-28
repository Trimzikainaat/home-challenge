import React, { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { logout } from '@/actions/authActions';
import handleError from '@/utils/handleError';
import { useNavigate } from 'react-router-dom';



export default function Header({isAuthenticated}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    try {
       dispatch(logout());
      navigate('/');
      // Redirect to home page or private page
    } catch (error) {
      const errorMessage = handleError(error);
      // Display error message to the user
      console.error(error);
    }
  };


  return (
    <>
      <Popover className="relative bg-white">
        <div className="mx-auto">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10 px-8">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/">
                <span className="h2 text-black font-black text-2xl">News Portal</span>
              </Link>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div as="nav" className="hidden space-x-10 md:flex">

              <Link to="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Home
              </Link>
              <Link to="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
                About
              </Link>
              <Link to="/contact" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Contact
              </Link>
            </div>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              {
                isAuthenticated ? (
                  <>
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button onClick={()=>setIsMenuOpen(!isMenuOpen)} className="inline-flex justify-center items-center rounded-full w-10 h-10 bg-gray-100 focus:outline-none">
                          <img className="w-8 h-8 rounded-full mr-4" src="https://via.placeholder.com/50" alt="avatar" />
                          <ChevronDownIcon className="w-8 h-8" />
                        </Menu.Button>
                      </div>

                      <Transition
                        show={isMenuOpen}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div className="py-1">
                            <Menu.Item>
                                <Menu.Button 
                                  onClick={handleLogout}
                                  className={'cursor-pointer text-gray-700 block px-4 py-2 text-sm'}
                                >
                                 Logout2
                                </Menu.Button >
                              
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      className="ml-8 inline-flex items-center justify-center whitespace-nowrap border border-transparent bg-gray-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700"
                    >
                      Sign up
                    </Link>
                  </>
                )

              }
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden z-50">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5">
                <div className="grid grid-cols-1 gap-y-4">
                  <Link to="/"  className="text-base font-medium text-gray-900 hover:text-gray-700 block">
                    Home
                  </Link>
                  <Link to="/about" className="text-base font-medium text-gray-900 hover:text-gray-700 block">
                    About
                  </Link>
                  <Link to="/contact" className="text-base font-medium text-gray-900 hover:text-gray-700 block">
                    Contact
                  </Link>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Link to="/register"
                    className="w-full items-center justify-center  border border-transparent bg-gray-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 mb-4"
                  >
                    Sign up
                  </Link>
                  <p className="text-center text-base font-medium text-gray-500">
                    Existing user?{' '}
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  )
}