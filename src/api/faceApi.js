import axiosClient from './axiosClient';
export const faceApi = {
    compareFace(body) {
      const url = 'http://210.245.94.214:10107/ai/face_matching/face_matching';
      return axiosClient.post(url, body);
    },
}