import React from 'react';

import UserIcon from "../assets/icons/1.svg";
import LockIcon from "../assets/icons/2.svg";
import HomeIcon from "../assets/icons/3.svg";
import CarIcon from "../assets/icons/4.svg";
import HelpCircleIcon from "../assets/icons/5.svg";
import BookOpenIcon from "../assets/icons/6.svg";
import HeartIcon from "../assets/icons/7.svg";
import MessageCircleIcon from "../assets/icons/8.svg";
import CreditCardIcon from "../assets/icons/9.svg";
import FileTextIcon from "../assets/icons/10.svg";
import PenPaper from "../assets/icons/11.svg";
import ShieldCheckIcon from "../assets/icons/12.svg";
import ChevronRightIcon from "../assets/icons/13.svg";
import CookieIcon from "../assets/icons/14.svg";

import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import signout from "../assets/signout.svg";
import Navbar from './Navbar';

export default function Dashboard() {
  const sections = [
    {
      title: "Manage Account",
      color: "orange",
      items: [
        { icon: UserIcon, text: "Personal Details", link: "/details" },
        { icon: LockIcon, text: "Password & Security", link: "/password-security"  },
        { icon: HomeIcon, text: "Manage Stays", link: "/manage-stays"  },
        { icon: CarIcon, text: "Manage Rides", link: "/manage-rides"  }
      ]
    },
    {
      title: "Booking Activity",
      color: "orange",
      items: [
        { icon: HomeIcon, text: "Stays", link: "/stays"  },
        { icon: CarIcon, text: "Car Rentals", link: "/carsrental"  },
        { icon: HeartIcon, text: "Favorites", link: "/favourites"  },
        { icon: MessageCircleIcon, text: "My Reviews", link: "/reviews"  }
      ]
    },
    {
      title: "Legal & Privacy",
      color: "orange",
      items: [
        { icon: PenPaper, text: "Terms of Use", link: "/terms-of-use"  },
        { icon: ShieldCheckIcon, text: "Privacy Policy", link: "/privacy"  },
        { icon: CookieIcon, text: "Cookies Policy", link: "/cookies"  }
      ]
    },
    {
      title: "Help & Support",
      color: "orange",
      items: [
        { icon: HelpCircleIcon, text: "Contact Customer Support", link: "/customer-support"  },
        { icon: BookOpenIcon, text: "Helpful Articles", link: "/helpful"  }
      ]
    },
    {
      title: "Payments",
      color: "orange",
      items: [
        { icon: CreditCardIcon, text: "Payment Methods", link: "/payment"  },
        { icon: FileTextIcon, text: "Payment History", link: "/payment-history"  }
      ]
    }
  ];

  return (
    <>
      {/* Nav */}
      <Navbar showNavLinks={false} />

      <div className="min-h-screen bg-white pt-20">
        
        <main className="max-w-7xl mx-auto px-10 sm:px-6 py-12 pt-20">
          {/* Welcome Section */}
          <div className="mb-12 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-semibold text-[#333333] mb-2">Hi, Hamsah</h1>
              <p className="text-2xl font-light text-gray-600">Welcome To Your Account</p>
            </div>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <img src={signout} alt="Logo" className="h-5 w-5" />
              <span className="underline hidden md:flex">Sign Out</span>
            </button>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.map((section, idx) => (
              <DashboardCard key={idx} section={section} />
            ))}
          </div>
        </main>

              {/* make component */}
        <footer className="mt-12 sm:mt-16 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
              <p><b className=''>©</b> 2025 Smash Apartments. All Rights Reserved</p>
              <span className="hidden sm:inline">•</span>
              <p className="hover:text-gray-900 transition-colors cursor-pointer">Privacy Policy</p>
              <span className="hidden sm:inline">•</span>
              <p className="hover:text-gray-900 transition-colors cursor-pointer">Terms of Use</p>
            </div>
          </div>
      </footer>
      </div>
    </>
  );
}

function DashboardCard({ section }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Category Tag */}
      <div className="inline-flex items-center gap-2 bg-[#22205F1A] rounded-full px-4 py-2 mb-6">
        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
        <span className="text-xs font-semibold text-gray-700">{section.title}</span>
      </div>

      {/* Menu Items */}
      <div className="space-y-1">
        {section.items.map((item, idx) => (
          <MenuItem link={item.link} key={idx} icon={item.icon} text={item.text} />
        ))}
      </div>
    </div>
  );
}

function MenuItem({ icon, text, link }) {
  return (
    <Link to={link} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
      <div className="flex items-center gap-3">
        <img src={icon} alt={text} className="w-5 h-5" />
        <span className="text-[#333333] text-xs md:text-base font-light group-hover:text-gray-900 transition-colors">{text}</span>
      </div>
      <img src={ChevronRightIcon} alt="arrow" className="w-4 h-3 object-contain" />
    </Link>
  );
}