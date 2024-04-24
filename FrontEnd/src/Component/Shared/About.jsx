import React from 'react'

const About = () => {
  return (
<section class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
  <div class="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
  <div class="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
  <div class="mx-auto max-w-2xl lg:max-w-4xl">
  <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl">About as</h2>
    <figure class="mt-10">
      <blockquote class="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
        <p>Welcome to our tutorial company, where learning meets excellence! We are dedicated to providing top-notch educational services tailored to meet the unique needs of each student. Our team of experienced tutors is committed to helping students succeed academically and reach their full potential.</p>
      </blockquote>
   
    </figure>
  </div>
</section>

  )
}

export default About
