import axios from 'axios';
import {
  EMERGENCY_LIST_REQUEST,
  EMERGENCY_LIST_SUCCESS,
  EMERGENCY_LIST_FAIL,
  EMERGENCY_CREATE_REQUEST,
  EMERGENCY_CREATE_SUCCESS,
  EMERGENCY_CREATE_FAIL,
  EMERGENCY_UPDATE_REQUEST,
  EMERGENCY_UPDATE_SUCCESS,
  EMERGENCY_UPDATE_FAIL
} from '../constants/emergencyConstants';

// Get token from localStorage
const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return userInfo?.access;
};

export const listEmergencies = () => async (dispatch) => {
  try {
    dispatch({ type: EMERGENCY_LIST_REQUEST });
    const token = getToken();
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const { data } = await axios.get('http://127.0.0.1:8000/api/emergencies/', config);
    dispatch({
      type: EMERGENCY_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: EMERGENCY_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

export const createEmergency = (location, description) => async (dispatch) => {
  try {
    dispatch({ type: EMERGENCY_CREATE_REQUEST });
    const token = getToken();
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const { data } = await axios.post('http://127.0.0.1:8000/api/emergencies/', {
      location,
      description
    }, config);
    dispatch({
      type: EMERGENCY_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: EMERGENCY_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

export const updateEmergencyStatus = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: EMERGENCY_UPDATE_REQUEST });
    const token = getToken();
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const { data } = await axios.patch(`http://127.0.0.1:8000/api/emergencies/${id}/`, {
      status
    }, config);
    dispatch({
      type: EMERGENCY_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: EMERGENCY_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
}; 