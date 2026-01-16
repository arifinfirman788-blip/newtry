import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, MapPin, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { itineraries } from '../data/mockData';

const SchedulePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-[#FAFAFB] pb-10">
      {/* Header */}
      <div className="px-8 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-[#FAFAFB]/80 backdrop-blur-md z-20">
        <h1 className="text-2xl font-bold text-[#1A1D2E]">我的行程</h1>
        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-gray-700">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Itinerary List */}
      <div className="px-8 space-y-6">
        {itineraries.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100"
          >
            {/* Card Image */}
            <div className="h-32 relative">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-6">
                 <div className={`inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-2 ${
                   item.status === 'upcoming' ? 'bg-blue-500 text-white' : 
                   item.status === 'ongoing' ? 'bg-green-500 text-white' : 
                   'bg-gray-500 text-white'
                 }`}>
                   {item.status === 'upcoming' ? '即将开始' : item.status === 'ongoing' ? '进行中' : '已完成'}
                 </div>
                 <h3 className="text-white text-xl font-bold">{item.title}</h3>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-blue-500" />
                  <span>{item.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-500" />
                  <span>{item.date}</span>
                </div>
              </div>

              {/* Activities Timeline */}
              <div className="space-y-0">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">行程节点</p>
                {item.activities.map((activity, idx) => (
                  <div key={activity.id} className="flex gap-4 relative pb-6 last:pb-0">
                    {/* Timeline Line */}
                    {idx !== item.activities.length - 1 && (
                      <div className="absolute left-[5px] top-3 bottom-0 w-[2px] bg-gray-100" />
                    )}
                    
                    {/* Status Dot */}
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-2 relative z-10 ${
                      activity.status === 'completed' ? 'bg-gray-300' : 
                      activity.status === 'ongoing' ? 'bg-blue-500 ring-4 ring-blue-50' : 
                      'bg-blue-200'
                    }`} />
                    
                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-sm font-bold ${
                          activity.status === 'completed' ? 'text-gray-500' : 'text-gray-800'
                        }`}>
                          {activity.title}
                        </h4>
                        <span className={`text-xs font-mono font-medium ${
                          activity.status === 'ongoing' ? 'text-blue-500' : 'text-gray-400'
                        }`}>
                          {activity.time}
                        </span>
                      </div>
                      
                      {activity.location && (
                        <p className="text-xs text-gray-500 mb-2">{activity.location}</p>
                      )}

                      {/* Meta Tags */}
                      {activity.meta && (
                        <div className="flex flex-wrap gap-2">
                          {activity.meta.transportType && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-100">
                              {activity.meta.transportType} {activity.meta.number}
                            </span>
                          )}
                          {activity.meta.seat && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-50 text-gray-600 border border-gray-100">
                              {activity.meta.seat}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;
