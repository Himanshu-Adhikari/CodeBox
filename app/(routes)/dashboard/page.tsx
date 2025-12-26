"use client"

import React from 'react'
import WelcomeBoard from './_components/WelcomeBoard'
import EnrolledCourses from './_components/EnrolledCourses'
import ExploreMore from './_components/ExploreMore'
import InviteFriend from './_components/InviteFriend'
import UserStatus from './_components/UserStatus'
import UpgradeSub from './_components/UpgradeSub'
import ExploreMoreCourses from './_components/ExploreMoreCourses'
const Dashboard = () => {
  return (
    <div className='p-10 md:px-20 lg:px-36 xl:px-48'>
        <div className='grid grid-cols-3 gap-7'>
    <div className='col-span-2'>
        <WelcomeBoard/>
        <EnrolledCourses/>
        <ExploreMoreCourses/>
        <ExploreMore/>
        <InviteFriend/>
    </div>
    <div className=' '>
      <UserStatus/>
      <UpgradeSub/>
    </div>
        </div>
    </div>
  )
}

export default Dashboard