import { API } from 'aws-amplify';

export const saveLog = async (logData) => {
  return API.post('StudentTrackerAPI', '/logs', {
    body: logData
  });
};

export const getLogs = async (userId) => {
  return API.get('StudentTrackerAPI', `/logs?userId=${userId}`);
};

export const deleteLog = async (logId) => {
  return API.del('StudentTrackerAPI', `/logs/${logId}`);
};

export const getInsights = async (userId, timeRange = 'week') => {
  return API.get('StudentTrackerAPI', `/insights?userId=${userId}&range=${timeRange}`);
};