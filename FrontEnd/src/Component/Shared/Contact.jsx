import React from 'react'
import {useLanguage} from "../../Features/Shared/Language/LanguageContext"
const Contact = () => {
  const {t} = useLanguage()
  return (
    <div className="relative isolate  mt-6 px-6 sm:py-4 lg:py-2 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t("ContactUs")}</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
        {t("ContactusText")}
        </p>
      </div>
    <form action="#" method="POST" className="mx-auto mt-10 max-w-xl ">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div className="sm:col-span-2">
          <label for="first-name" className="block text-sm font-medium leading-6 text-gray-900">{t("FullName")}</label>
          <div className="mt-2.5">
            <input type="text" name="first-name" id="first-name" autocomplete="given-name" className="block w-full w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label for="email" className="block text-sm font-medium leading-6 text-gray-900">{t("Email")}</label>
          <div className="mt-2.5">
            <input type="email" name="email" id="email" autocomplete="email" className="block w-full w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label for="message" className="block text-sm font-medium leading-6 text-gray-900">{t("Message")}</label>
          <div className="mt-2.5">
            <textarea name="message" id="message" rows="4" className="block w-full w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"></textarea>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <button type="submit" className="block w-full rounded-md  px-3.5 py-2.5 text-center text-sm font-medium text-white shadow-sm bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">Let's talk</button>
      </div>
    </form>
  </div>
  )
}

export default Contact
