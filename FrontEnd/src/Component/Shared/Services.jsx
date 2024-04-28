import React from 'react';
import {useLanguage} from "../../Features/Shared/Language/LanguageContext"
const services = [
  {
    title: 'PersonalTutoring',
    description: 'ServieceOneDescription',
  },
  {
    title: 'GroupTutoring',
    description: 'ServieceTwoDescription',
   
  },
  {
    title: 'OnlineTutoring',
    description: 'ServiecThreeDescription',
  },
];
const Service = () => {
  const {t} = useLanguage()
  return (
    <section className="bg-opacity-30 backdrop-blur-7.4 border border-opacity-30 border-white bg-indigo-100 rounded-lg  py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">{t("OurService")}</h2>
        
        <div className="w-full flex gap-7 items-center flex-col lg:justify-around lg:flex-row">
          {services.map((service) => (
                <div className="border shadow-md min-w-72 max-w-96  rounded-lg p-6">
                <h3 className="text-2xl text-center font-semibold mb-4">{t(`${service.title}`)}</h3>
                <p className="text-gray-700 text-justify text-wrap font-light">{t(`${service.description}`)}</p>
              </div>
              ))}
          
          
        </div>
      </div>
    </section>
  );
};

export default Service;
