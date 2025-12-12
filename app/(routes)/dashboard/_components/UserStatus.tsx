

import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
const UserStatus = () => {
    const {user}=useUser();
  return (
    <div className='border-4 p-4 rounded-3xl'>

    <div className='flex gap-3 items-center'>
        <Image src={'/goblin.gif'} alt='gob' width={100} height={100}></Image>
        <h2 className='font-game text-2xl'>{user?.firstName}
            </h2>
    </div>
    <div className='grid grid-cols-2 gap-5'>
    <div className='flex items-center '>
        <Image src={'/star.gif'} alt='star' width={35} height={35}></Image>
        <div>
            <h2 className='text-xl font-game'>20</h2>
            <h2 className='font-game text-xl text-gray-600'>Total Rewards</h2>
        </div>
    </div>
    <div className='flex items-center gap-3'>
        <Image src={'/badge_2.png'} alt='badge' width={35} height={35}></Image>
        <div>
            <h2 className='text-xl font-game'>3</h2>
            <h2 className='font-game text-xl text-gray-600'>Badge</h2>
        </div>
    </div>
    <div className='flex items-center gap-3'>
        <Image src={'/fire.gif'} alt='fire' width={35} height={35}></Image>
        <div>
            <h2 className='text-xl font-game'>7</h2>
            <h2 className='font-game text-xl text-gray-600'>Streak</h2>
        </div>
    </div>
    </div>
    </div>
  )
}

export default UserStatus