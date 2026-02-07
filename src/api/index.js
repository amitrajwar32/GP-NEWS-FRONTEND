import axiosInstance from './axios';

export const authAPI = {
  login: (email, password) => {
    console.log('Attempting login with:', email);
    return axiosInstance.post('/auth/login', { email, password });
  },
  changePassword: (oldPassword, newPassword) => axiosInstance.put('/auth/change-password', { oldPassword, newPassword }),
};

export const newsAPI = {
  getLatest: async (page = 1, limit = 10) => {
    try {
      return await axiosInstance.get(`/news/latest?page=${page}&limit=${limit}`);
    } catch (err) {
      return axiosInstance.get(`/news?page=${page}&limit=${limit}`);
    }
  },
  getBreaking: async () => {
    try {
      return await axiosInstance.get('/news/breaking');
    } catch (err) {
      const res = await axiosInstance.get(`/news?page=1&limit=5`);
      return res;
    }
  },
  getBySlug: (slug) => {
    if (!slug) return Promise.reject({ status: 400, message: 'Missing slug' });
    const safe = encodeURIComponent(String(slug));
    return axiosInstance.get(`/news/${safe}`);
  },
  getByCategory: (slug, page = 1, limit = 10) => axiosInstance.get(`/news/category/${slug}?page=${page}&limit=${limit}`),
  
  // Admin
  create: (data) => axiosInstance.post('/news', data),
  getAll: (page = 1, limit = 10) => axiosInstance.get(`/news?page=${page}&limit=${limit}`),
  update: (id, data) => axiosInstance.put(`/news/${id}`, data),
  updateStatus: (id, status) => axiosInstance.patch(`/news/${id}/status`, { status }),
  delete: (id) => axiosInstance.delete(`/news/${id}`),
  getStats: () => axiosInstance.get('/news/admin/stats'),
};

export const categoryAPI = {
  getAll: () => axiosInstance.get('/categories'),
  create: (data) => axiosInstance.post('/categories', data),
  update: (id, data) => axiosInstance.put(`/categories/${id}`, data),
  delete: (id) => axiosInstance.delete(`/categories/${id}`),
};

export const uploadAPI = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axiosInstance.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const contactAPI = {
  send: (data) => axiosInstance.post('/contact', data),
};

export const socialMediaAPI = {
  getAll: () => axiosInstance.get('/social-media'),
  getAllAdmin: () => axiosInstance.get('/social-media/admin/all'),
  getById: (id) => axiosInstance.get(`/social-media/${id}`),
  create: (data) => axiosInstance.post('/social-media', data),
  update: (id, data) => axiosInstance.put(`/social-media/${id}`, data),
  delete: (id) => axiosInstance.delete(`/social-media/${id}`),
  restore: (id) => axiosInstance.patch(`/social-media/${id}/restore`),
};

export const settingsAPI = {
  getAll: () => axiosInstance.get('/settings'),
  getByKey: (key) => axiosInstance.get(`/settings/${key}`),
  update: (key, value) => axiosInstance.put(`/settings/${key}`, { value }),
};

export const healthAPI = {
  check: () => axiosInstance.get('/health'),
};
