import React, { useEffect } from 'react'
import {useLanguage} from '../../Features/Shared/Language/LanguageContext'
const HeroSection = () => {
  const {t} = useLanguage()
  return (
    <section class="bg-white  mt-6">
 <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap- lg:py-16 lg:grid-cols-12">
    <div class=" order-2 lg:order-1 place-self-center lg:col-span-7">
        <h1 class="max-w-2xl text-gray-900 mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-6xl ">{t("HeroHeader")}</h1>
        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl text-justify dark:text-gray-400">{t("HeroText")}</p>
        <a href="#" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
            {t("GetStarted")}
            <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
    </div>
    <div class=" order-1  lg:order-2 xs:mt-0 lg:col-span-5 lg:flex">
        <img src={'../Hero.png'} alt="mockup"/>
    </div>
</div>


</section>
  )
}

export default HeroSection
