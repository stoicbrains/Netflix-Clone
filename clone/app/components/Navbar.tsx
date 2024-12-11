import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../images/logo.png';
import NavbarItem from './NavbarItem';
import { BsSearch, BsBell, BsChevronBarDown } from 'react-icons/bs';
import profile from '../images/profile.jpg';
import AccountMenu from './AccountMenu';

const TOP_OFFSET = 3;

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    // Debugging: Checking if the effect is running
    console.log('useEffect running');

    const handleScroll = () => {
      // Debugging: Log scroll position
      console.log('Scroll Position:', window.scrollY);

      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    // Add the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener
    return () => {
      console.log('Cleanup');
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const toggleNavView = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40 top-[-10px] left-0 h-[15vh]">
      <div
        className={`px-4 md:px-16 py-2 flex items-center transition duration-500 h-full w-full ${
          showBackground ? 'bg-zinc-900 bg-opacity-90' : ''
        }`}
      >
        <Image className="h-[120px] w-[150px]" src={logo} alt="logo" />
        <div className="flex justify-start ml-10 items-center flex-grow">
          <div className="ml-4 gap-7 text-white text-md hidden lg:flex">
            <NavbarItem label="Home" />
            <NavbarItem label="Series" />
            <NavbarItem label="Films" />
            <NavbarItem label="New & Popular" />
            <NavbarItem label="Browse by languages" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <BsSearch color="white" />
          </div>
          <div>
            <BsBell color="white" />
          </div>
          <div
            onClick={toggleNavView}
            className="flex items-center gap-1 mx-3 cursor-pointer"
          >
            <Image
              src={profile}
              alt="profile"
              className="h-[40px] w-[40px] rounded-md drop-shadow-sm shadow-white"
            />
            <div>
              <BsChevronBarDown
                color="white"
                className={`transition ${showAccountMenu ? 'rotate-0' : 'rotate-180'}`}
              />
            </div>
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
