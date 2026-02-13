
import React, { useState } from 'react';
import { ProblemCategory } from '../types';
import { analyzeHealthRequest } from '../geminiService';
import { addPatientRequest } from '../firebase';

const PatientForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    phone: '',
    city: '',
    category: ProblemCategory.Other,
    description: '',
    preferredContact: 'Call'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Get AI Analysis
      const analysis = await analyzeHealthRequest(formData.category, formData.description);

      // 2. Save to Firestore
      await addPatientRequest({
        ...formData,
        age: parseInt(formData.age),
        aiSummary: analysis.summary,
        urgencyLevel: analysis.urgency
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Request Submitted!</h2>
        <p className="text-slate-600 mb-8">Our team and volunteers will review your request. Our AI system has prioritized your case based on the description provided.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition";

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Patient Support Form</h2>
        <p className="text-slate-500 mb-8">Tell us about your healthcare needs. We use AI to ensure urgent cases are handled immediately.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Age</label>
              <input
                required
                type="number"
                className={inputClasses}
                value={formData.age}
                onChange={e => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
              <input
                required
                type="text"
                className={inputClasses}
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
            <select
              className={`${inputClasses} appearance-none bg-white`}
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value as ProblemCategory })}
            >
              {Object.values(ProblemCategory).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Problem Description</label>
            <textarea
              required
              rows={4}
              className={inputClasses}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Contact</label>
            <div className="flex space-x-4">
              {['Call', 'WhatsApp'].map(method => (
                <label key={method} className="flex-1">
                  <input
                    type="radio"
                    name="contact"
                    className="sr-only peer"
                    value={method}
                    checked={formData.preferredContact === method}
                    onChange={() => setFormData({ ...formData, preferredContact: method as any })}
                  />
                  <div className="w-full py-3 px-4 text-center rounded-xl border border-slate-200 cursor-pointer peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 transition">
                    {method}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyzing Request...</span>
              </>
            ) : (
              <span>Submit Request</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
