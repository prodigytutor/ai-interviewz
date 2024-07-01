import React from 'react'
import NewInterview from './_components/newInterview'
import InterviewList from './_components/interviewList'
type Props = {}

export default function Dashboard({}: Props) {
  return (
    <div className='p-10'>

    <h2 className='font-bold text-3xl text-primary'>Dashboard</h2>
    <h2 className='text-gray-500'>Create and Start your AI Mockup Interview</h2>

    <div className='grid grid-cols-1 md:grid-cols-3 my-5 gap-5'>
      <NewInterview/>
    </div>

    {/* Previous Interview List  */}
    <InterviewList />
  </div>
  )
}