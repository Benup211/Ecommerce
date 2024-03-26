import React from 'react'
import { Link } from 'react-router-dom'


export const Page404 = () => {
  return (
    <div className="py-16 w-full min-h-screen flex justify-center md:items-center bg-white">
      <div className="mx-auto max-w-xl lg:max-w-4xl flex flex-col">

        <div className="relative px-5 lg:border-r-2 border-gray-100">
          <p className="-top-3 md:top-0 left-10 md:left-20 text-base md:text-4xl text-primary font-bold uppercase">Error404</p>
        </div>

        <div className="px-5">
          <p className="text-3xl md:text-5xl text-gray-700 font-bold tracking-wide">Page not found</p>
          <p className="mt-4 text-sm md:text-base text-gray-500 font-medium">The content you’re looking for doesn’t exist. Either it was removed, or you mistyped the link. <br /><br />Sorry about that! Please visit our hompage to get where you need to go.</p>
          <Link to='/' type="button" className="mt-10 relative inline-flex items-center px-7 py-3.5 rounded border border-transparent bg-primary md:text-lg text-white font-medium hover:bg-secondary">
            Go back to Homepage
          </Link>
        </div>

      </div>
    </div>
  )
}