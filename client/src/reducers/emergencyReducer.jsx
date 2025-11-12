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

export const emergencyListReducer = (state = { emergencies: [] }, action) => {
  switch (action.type) {
    case EMERGENCY_LIST_REQUEST:
      return { loading: true, emergencies: [] };
    case EMERGENCY_LIST_SUCCESS:
      return { loading: false, emergencies: action.payload };
    case EMERGENCY_LIST_FAIL:
      return { loading: false, error: action.payload };
    case EMERGENCY_CREATE_SUCCESS:
      return {
        ...state,
        emergencies: [action.payload, ...state.emergencies]
      };
    case EMERGENCY_UPDATE_SUCCESS:
      return {
        ...state,
        emergencies: state.emergencies.map(emergency =>
          emergency.id === action.payload.id ? action.payload : emergency
        )
      };
    default:
      return state;
  }
}; 