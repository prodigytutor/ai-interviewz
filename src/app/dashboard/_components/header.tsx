"use client"
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import nextAppLoader from 'next/dist/build/webpack/loaders/next-app-loader'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
type Props = {}

const Header = (props: Props) => {
  const pathName = usePathname();
  return (
    <div className='flex p-2 items-center justify-between bg-secondary shadow-sm'>
        <Link href='/'>
          <Image src={'/ai-interviewz-logo.png'} width={160} height={100} alt='Logo'/></Link>
        <ul className='hidden md:flex gap-6'>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${pathName=='/dashboard'&&'text-primary font-bold'}`}><Link href='/dashboard'> Dashboard</Link></li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${pathName=='/questions'&&'text-primary font-bold'}`}><Link href='/questions'>Questions</Link></li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${pathName=='/upgrade'&&'text-primary font-bold'}`}><Link href='/upgrade'>Upgrade</Link></li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${pathName=='/how'&&'text-primary font-bold'}`}><Link href='/how'>How it works?</Link></li>
      </ul>
      <UserButton />
    </div>
  )
}

export default Header