import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useDropdownStore } from '../../helpers/store';

export default function UserModal() {
  const { isDropdownVisible, setIsDropdownVisible } = useDropdownStore();

  const { logout, user } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <div className='relative'>
      <button
        type='button'
        className='flex text-sm bg-dark-navy rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
        aria-expanded={isDropdownVisible}
        onClick={toggleDropdown}
      >
        <span className='sr-only'>Open user menu</span>
        <img
          className='w-8 h-8 rounded-full'
          src='/img_avatar.png'
          alt='user photo'
        />
      </button>
      {isDropdownVisible && (
        <div
          className='absolute mt-7 right-0 z-50 my-4 text-base list-none bg-dark-navy divide-y divide-gray-100 rounded shadow  dark:divide-gray-600'
          id='dropdown-user'
        >
          <div className='px-4 py-3' role='none'>
            <p className='text-sm text-gray-900 dark:text-white' role='none'>
              {user?.firstName} {user?.lastName}
            </p>
            <p
              className='text-sm font-medium text-gray-900 truncate dark:text-gray-300'
              role='none'
            >
              {user?.email}
            </p>
          </div>
          <ul className='py-1' role='none'>
            <li>
              <a
                href='/dashboard'
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                role='menuitem'
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href='/login'
                onClick={handleSignOut}
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                role='menuitem'
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
