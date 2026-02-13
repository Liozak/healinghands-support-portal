
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const cards = [
    {
      title: "Patient Support",
      description: "Are you or a loved one in need of medical assistance? Submit a request and our team will get in touch.",
      link: "/patient-support",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      ),
      btnText: "Request Support",
      bgColor: "bg-blue-50"
    },
    {
      title: "Join as Volunteer",
      description: "Use your skills to help others. We need medical professionals, tech experts, and logistical support.",
      link: "/volunteer-register",
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      btnText: "Register Now",
      bgColor: "bg-green-50"
    },
    {
      title: "General Inquiry",
      description: "Have questions about our NGO or want to partner with us? Send us a message.",
      link: "/contact",
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      btnText: "Contact Us",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight sm:text-6xl mb-4">
          Compassion meets <span className="text-blue-600">Action</span>.
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-slate-500">
          HealingHands is a digital bridge connecting healthcare needs with resource providers and volunteers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className={`p-8 ${card.bgColor} flex justify-center`}>
              {card.icon}
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{card.title}</h3>
              <p className="text-slate-600 mb-8 h-20 overflow-hidden">
                {card.description}
              </p>
              <Link to={card.link} className="block w-full text-center bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition">
                {card.btnText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 rounded-3xl bg-blue-600 p-8 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold sm:text-4xl mb-6">Our Impact in Real-Time</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-black">500+</div>
              <div className="text-blue-100 text-sm">Requests Fulfilled</div>
            </div>
            <div>
              <div className="text-4xl font-black">120+</div>
              <div className="text-blue-100 text-sm">Active Volunteers</div>
            </div>
            <div>
              <div className="text-4xl font-black">15+</div>
              <div className="text-blue-100 text-sm">Partner Hospitals</div>
            </div>
            <div>
              <div className="text-4xl font-black">24/7</div>
              <div className="text-blue-100 text-sm">Active Monitoring</div>
            </div>
          </div>
        </div>
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -mr-32 -mt-32 opacity-20"></div>
      </div>
    </div>
  );
};

export default Home;
