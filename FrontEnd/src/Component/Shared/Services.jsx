import React from 'react';
const services = [
  {
    title: 'One-on-One Tutoring',
    description: 'At our tutorial company, we offer Personalized One-on-One tutoring sessions that cater to the individual learning styles and goals of each student. Whether you need help with a specific subject, test preparation, or homework assistance, our tutors are here to support you every step of the way.',
  },
  {
    title: 'Group Tutoring',
    description: 'Our group tutoring sessions provide a collaborative learning environment where students can engage with their peers, ask questions, and deepen their understanding of challenging concepts. We believe that learning is a shared experience, and our group tutoring sessions foster a sense of community and academic growth.',
   
  },
  {
    title: 'Online Tutoring',
    description: 'For those seeking online tutoring options, our virtual tutoring sessions offer the flexibility and convenience of learning from anywhere with an internet connection. Our online tutors are dedicated to providing engaging and effective instruction through interactive video conferencing platforms',
  },
];
const Service = () => {
  return (
    <section className="bg-opacity-30 backdrop-blur-7.4 border border-opacity-30 border-white bg-indigo-100 rounded-lg  py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
        
        <div className="w-full flex gap-7 items-center flex-col lg:justify-around lg:flex-row">
          {services.map((service) => (
                <div className="border shadow-md min-w-72 max-w-96  rounded-lg p-6">
                <h3 className="text-2xl text-center font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-700 text-justify text-wrap font-light">{service.description}</p>
              </div>
              ))}
          
          
        </div>
      </div>
    </section>
  );
};

export default Service;
