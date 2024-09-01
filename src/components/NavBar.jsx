import UserModal from './UserModal';
export default function NavBar({ toggleSidebar }) {
  return (
    <>
      <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
        <div className='px-3 py-3 lg:px-5'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <div className='flex items-center ms-3'>
                <UserModal />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
