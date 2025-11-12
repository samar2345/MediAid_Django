import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listEmergencies } from '../../actions/emergencyActions';
import { FaExclamationTriangle, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const EmergencyHistory = () => {
  const dispatch = useDispatch();
  const { emergencies, loading, error } = useSelector(state => state.emergencyList);

  useEffect(() => {
    dispatch(listEmergencies());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="w-5 h-5" />;
      case 'processing':
        return <FaExclamationTriangle className="w-5 h-5" />;
      case 'resolved':
        return <FaCheckCircle className="w-5 h-5" />;
      case 'cancelled':
        return <FaTimesCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Emergency History</h2>
      {emergencies && emergencies.length > 0 ? (
        <div className="grid gap-4">
          {emergencies.map((emergency) => (
            <div
              key={emergency.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Emergency Request</h3>
                  <p className="text-gray-600 mb-2">Location: {emergency.location}</p>
                  <p className="text-gray-600 mb-2">Description: {emergency.description}</p>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(emergency.created_at).toLocaleString()}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full flex items-center ${getStatusColor(emergency.status)}`}>
                  {getStatusIcon(emergency.status)}
                  <span className="ml-2 capitalize">{emergency.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          No emergency history found
        </div>
      )}
    </div>
  );
};

export default EmergencyHistory; 