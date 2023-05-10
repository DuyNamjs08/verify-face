import axiosClient from './axiosClient';
export const voiceApi = {
  compareFace() {
    const url = '/group-permissions/';
    return axiosClient.get(url);
  },
}