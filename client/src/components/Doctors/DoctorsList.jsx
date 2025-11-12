// src/pages/Doctors.js

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmergencyModal from './EmergencyModal'
import { listDoctors } from '../../actions/doctorActions';
import {
  FaSearch,
  FaStethoscope,
  FaUserMd,
  FaStar,
  FaNotesMedical,
  FaCalendarCheck,
  FaHeartbeat,
  FaArrowRight,
  FaTimes,
  FaComments,
  FaVideo
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import LoadingSpinner from '../components/LoadingSpinner';
// import ErrorAlert from '../components/ErrorAlert';
// import { fetchDoctors, filterDoctors } from '../../actions/projectAction';

const DoctorsList = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  // Redux state
  const {
    doctors,
    loading,
    error
  } = useSelector((state) => state.doctorList);

  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [rating, setRating] = useState(0);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const specialties = [
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Oncology',
    'Emergency Medicine'
  ];

  // Fetch doctors on component mount
  useEffect(() => {
    dispatch(listDoctors());
  }, [dispatch]);

  // Filter doctors
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (specialty === '' || doctor.specialty === specialty) &&
    doctor.rating >= rating
  );

  const infiniteDoctors = [...filteredDoctors, ...filteredDoctors];

  // Scroll animation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationFrameId;

    const autoScroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="container mx-auto">
        {/* Search Section */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto mb-6 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto flex space-x-4">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                <FaStethoscope className="inline mr-2" /> Specialty
              </label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300"
              >
                <option value="">All Specialties</option>
                {specialties.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                <FaStar className="inline mr-2" /> Minimum Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full p-3 rounded-lg border border-gray-300"
              >
                <option value={0}>Any Rating</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Doctors List */}
        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex overflow-x-scroll scrollbar-hide space-x-6 pb-6 px-4 animate-scroll"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%)'
            }}
          >
            {infiniteDoctors.map((doctor, index) => (
              <div
                key={`${doctor.id}-${index}`}
                className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/80 rounded-full px-3 py-1 flex items-center">
                    <FaStar className="text-yellow-500 mr-1" />
                    {doctor.rating}
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold mb-1">{doctor.name}</h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaUserMd className="mr-2" />
                    {doctor.specialty}
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaNotesMedical className="mr-2" />
                    {doctor.hospital}
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {doctor.description}
                  </p>


                  <div className="flex space-x-3">
                    <Link to={`/appointmentBooking/${doctor.id}`} className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-sm">
                      <FaCalendarCheck className="mr-2" /> Appointment
                    </Link>
                    {/* <Link
                      // onClick={() => setIsOpen(true)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors animate-pulse flex items-center justify-center text-sm"
                      to={`/emergencyContact/${doctor._id}`}
                    >
                      <FaHeartbeat className="mr-2" /> Emergency
                    </Link> */}

                    <Link
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors animate-pulse flex items-center justify-center text-sm"
                      to={`/emergencyContact/${doctor.id}`}
                      state={{ doctor }}
                    >
                      <FaHeartbeat className="mr-2" /> Emergency
                    </Link>


                    {/* Render Modal when open */}
                    {isOpen && <EmergencyModal />}
                  </div>



                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Modal */}
      {isEmergencyModalOpen && (
        <EmergencyModal onClose={() => setIsEmergencyModalOpen(false)} />
      )}
    </div>
  );
};

export default DoctorsList;