'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'


const SuccessPage = () => {
    const router = useRouter()
    const searchParams =  useSearchParams()
    const message = searchParams.get('message')
    
  return (
    <div className='flex justify-center items-center min-h-[70vh]'>
        <div>
            <h1>{message}</h1>
            <button className='btn' onClick={() => router.push('/')}>Go Back</button>
        </div>
    </div>
  )
}

export default SuccessPage