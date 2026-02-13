
import React, { useState } from 'react';
import { SkillType } from '../types';
import { registerVolunteer } from '../firebase';

const VolunteerForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    skills: SkillType.Medical,
    availability: 'Flexible'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerVolunteer(formData);
      setSubmitted(true);
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-blue-100 text-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">You're on the list!</h2>
        <p className="text-slate-600 mb-8">Thank you for stepping up. Our coordinator will reach out to you once we verify your skills and find a suitable task.</p>
        <button onClick={() => setSubmitted(false)} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition">Register Another Profile</button>
      </div>
    );
  }

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition";

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Volunteer Registration</h2>
        <p className="text-slate-500 mb-8">Join our community of helpers. Your time can save lives.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
            <input
              required
              type="text"
              className={inputClasses}
              value={formData.fullName}
              onChange={e => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input
                required
                type="email"
                className={inputClasses}
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
              <input
                required
                type="tel"
                className={inputClasses}
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Skillset</label>
            <select
              className={`${inputClasses} appearance-none bg-white`}
              value={formData.skills}
              onChange={e => setFormData({ ...formData, skills: e.target.value as SkillType })}
            >
              {Object.values(SkillType).map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Availability</label>
            <div className="grid grid-cols-3 gap-4">
              {['Weekdays', 'Weekends', 'Flexible'].map(opt => (
                <label key={opt} className="flex-1">
                  <input
                    type="radio"
                    name="avail"
                    className="sr-only peer"
                    value={opt}
                    checked={formData.availability === opt}
                    onChange={() => setFormData({ ...formData, availability: opt as any })}
                  />
                  <div className="w-full py-3 text-center rounded-xl border border-slate-200 cursor-pointer peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 transition text-sm">
                    {opt}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition flex items-center justify-center space-x-2"
          >
            {loading ? <span>Processing...</span> : <span>Register as Volunteer</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;
