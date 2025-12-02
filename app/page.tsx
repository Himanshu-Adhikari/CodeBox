import { Button } from '@/components/ui/button'
import React from 'react'
import Header from './_components/Header'
import Hero from './_components/Hero'
// Default page 
const home = () => {
  return (
    <div className='flex flex-col items-center'>
      <Header/>
      <Hero/>
    </div>
  )
}

export default home