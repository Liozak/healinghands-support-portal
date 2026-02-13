
import React, { useState, useEffect } from 'react';
import { getPatientRequests, getAllVolunteers, getAllMessages } from '../firebase';
import { PatientRequest, Volunteer, Message } from '../types';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'requests' | 'volunteers' | 'messages'>('requests');
  const [requests, setRequests] = useState<PatientRequest[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [reqs, vols, msgs] = await Promise.all([
          getPatientRequests(),
          getAllVolunteers(),
          getAllMessages()
        ]);
        
        // Sort requests by Urgency (High -> Medium -> Low)
        const sortedRequests = (reqs as any[]).sort((a, b) => {
          const order = { 'High': 0, 'Medium': 1, 'Low': 2 };
          return order[a.urgencyLevel as keyof typeof order] - order[b.urgencyLevel as keyof typeof order];
        });

        setRequests(sortedRequests);
        setVolunteers(vols as any[]);
        setMessages(msgs as any[]);
      } catch (error) {
        console.error("Fetch data error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const UrgencyBadge = ({ level }: { level: string }) => {
    const styles = {
      'High': 'bg-red-100 text-red-700 border-red-200',
      'Medium': 'bg-amber-100 text-amber-700 border-amber-200',
      'Low': 'bg-green-100 text-green-700 border-green-200'
    };
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-bold border ${styles[level as keyof typeof styles]}`}>
        {level}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">NGO Dashboard</h1>
          <p className="text-slate-500">Monitor and manage all support activities.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
          <button 
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'requests' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Requests ({requests.length})
          </button>
          <button 
            onClick={() => setActiveTab('volunteers')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'volunteers' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Volunteers ({volunteers.length})
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'messages' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Messages ({messages.length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            {activeTab === 'requests' && (
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient & City</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Urgency</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Summary</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {requests.map(req => (
                    <tr key={req.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-slate-900">{req.fullName}</div>
                        <div className="text-xs text-slate-500">{req.city} • Age {req.age}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{req.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <UrgencyBadge level={req.urgencyLevel} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600 max-w-xs line-clamp-2">{req.aiSummary}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400">
                        {new Date((req.createdAt as any).seconds * 1000).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {requests.length === 0 && (
                    <tr><td colSpan={5} className="px-6 py-20 text-center text-slate-400">No requests found.</td></tr>
                  )}
                </tbody>
              </table>
            )}

            {activeTab === 'volunteers' && (
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Volunteer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Skillset</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Availability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {volunteers.map(vol => (
                    <tr key={vol.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-slate-900">{vol.fullName}</div>
                        <div className="text-xs text-slate-500">{vol.city}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">{vol.email}</div>
                        <div className="text-xs text-slate-500">{vol.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">{vol.skills}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{vol.availability}</td>
                    </tr>
                  ))}
                  {volunteers.length === 0 && (
                    <tr><td colSpan={4} className="px-6 py-20 text-center text-slate-400">No volunteers registered yet.</td></tr>
                  )}
                </tbody>
              </table>
            )}

            {activeTab === 'messages' && (
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Sender</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {messages.map(msg => (
                    <tr key={msg.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-slate-900">{msg.name}</div>
                        <div className="text-xs text-slate-500">{msg.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{msg.message}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400">
                        {new Date((msg.createdAt as any).seconds * 1000).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {messages.length === 0 && (
                    <tr><td colSpan={3} className="px-6 py-20 text-center text-slate-400">No messages found.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
