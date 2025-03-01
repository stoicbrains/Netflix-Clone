import React from 'react';
import { signOut } from 'next-auth/react';  // Make sure to import signOut
import Image from 'next/image';
import profile from '../images/profile.jpg';
import { useSession } from 'next-auth/react';

interface AccountMenuProps {
  visible: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  const { data: session, status } = useSession();

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex rounded-md">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/items flex flex-row gap-3 items-center w-full">
          <Image className="w-8 rounded-md" src={profile} alt="profile" />
          <p className="text-white text-sm group-hover:item:underline">{session?.user?.name}</p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={() => {
            signOut({ callbackUrl: '/login' });  // Redirect to login page after sign-out
          }}
          className="px-3 text-center text-white text-sm cursor-pointer"
        >
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
