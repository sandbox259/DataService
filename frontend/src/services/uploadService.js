import axios from 'axios';

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('http://localhost:5173/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};