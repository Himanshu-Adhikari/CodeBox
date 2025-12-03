import React from 'react'
import explore_options from '../../../_data/exploredata'
import Image from 'next/image'
const ExploreMore = () => {
  return (
    <div className='mt-8'>
        <h1 className='text-3xl font-game p-3 mb-3'>Explore More</h1>
        <div className='grid grid-cols-2 grid-rows-2 gap-5'>

        {explore_options.map((option,index)=>{
          return(<div key={index} className="flex gap-2 p-2 border rounded-xl">
              <Image src={option.icon} height={80} width={80} alt={option.title}></Image>
              <div>

              <h2 className="font-medium font-game text-2xl">
                {option.title}
                </h2>
                <p className="font-game text-md text-gray-400">{option.desc}</p>
              </div>
            </div>)
          })}
          </div>
    </div>
  )
}

export default ExploreMore