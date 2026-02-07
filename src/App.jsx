import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Public Pages
import HomePage from './pages/HomePage';
import NewsDetailPage from './pages/NewsDetailPage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndServicesPage from './pages/TermsAndServicesPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNews from './pages/admin/AdminNews';
import AdminNewsEditor from './pages/admin/AdminNewsEditor';
import AdminCategories from './pages/admin/AdminCategories';
import AdminSettings from './pages/admin/AdminSettings';
import AdminSocialMedia from './pages/admin/AdminSocialMedia';
import AdminYouTubeSettings from './pages/admin/AdminYouTubeSettings';

// Layouts
import AdminLayout from './layouts/AdminLayout';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/news/:slug" element={<NewsDetailPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsAndServicesPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            
            <Route
              path="/admin/dashboard"
              element={
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              }
            />
            
            <Route
              path="/admin/news"
              element={
                <AdminLayout>
                  <AdminNews />
                </AdminLayout>
              }
            />
            
            <Route
              path="/admin/news/add"
              element={
                <AdminLayout>
                  <AdminNewsEditor />
                </AdminLayout>
              }
            />
            
            <Route
              path="/admin/news/edit/:id"
              element={
                <AdminLayout>
                  <AdminNewsEditor />
                </AdminLayout>
              }
            />
            
            <Route
              path="/admin/categories"
              element={
                <AdminLayout>
                  <AdminCategories />
                </AdminLayout>
              }
            />
            
            <Route
              path="/admin/settings"
              element={
                <AdminLayout>
                  <AdminSettings />
                </AdminLayout>
              }
            />
            
            <Route
              path="/admin/social-media"
              element={
                <AdminLayout>
                  <AdminSocialMedia />
                </AdminLayout>
              }
            />
            
            <Route
              path="/admin/youtube"
              element={
                <AdminLayout>
                  <AdminYouTubeSettings />
                </AdminLayout>
              }
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
