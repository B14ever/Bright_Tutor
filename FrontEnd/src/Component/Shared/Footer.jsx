import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = () => {
  const socialLinks = [
    { name: 'Telegram', icon: <TelegramIcon/>, url: 'https://t.me/Brighttutorialcenter' },
    { name: 'LinkedIn', icon: <FacebookIcon/>, url: 'https://www.linkedin.com/' },
    { name: 'YouTube', icon: <InstagramIcon/>, url: 'https://www.youtube.com/' },
    { name: 'Facebook', icon: <YouTubeIcon/>, url: 'https://www.facebook.com/' },
    { name: 'Instagram', icon: <LinkedInIcon/>, url: 'https://www.instagram.com/' },
  ];

  return (
      <footer className='relative isolate overflow-hidden bg-gray-800 my-10 py-4 px-6 '>
          <div  className="text-white  flex flex-col items-center gap-4">
         <h2>© Bright Tutore</h2> 
           <ul className="flex space-x-4">
         {socialLinks.map((link) => (
          <li key={link.name}>
            <a href={link.url} className="text-xl hover:text-gray-400">
              {link.icon}
            </a>
          </li>
        ))}
          </ul>
         <div>
           <p className='text-center'>Join us at our tutorial company and embark on a journey towards academic success and personal growth</p>
          <p className='text-center'>Let us help you unlock your full potential and achieve your educational goals.</p>
         </div>
         </div>
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </footer>
     
  );
};

export default Footer;
