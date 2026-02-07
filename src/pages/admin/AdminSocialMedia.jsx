import { useEffect, useState } from 'react';
import { Trash2, Edit2, Plus, RotateCcw } from 'lucide-react';
import { socialMediaAPI } from '../../api';
import AdminLayout from '../../layouts/AdminLayout';
import { Loading } from '../../components/Loading';
import { Alert } from '../../components/Alert';

export default function AdminSocialMedia() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    platformName: '',
    url: '',
    iconName: '',
    displayOrder: 0,
  });

  useEffect(() => {
    fetchSocialMedia();
  }, []);

  const fetchSocialMedia = async () => {
    setLoading(true);
    try {
      const res = await socialMediaAPI.getAllAdmin();
      setSocialLinks(res.data.data || []);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to fetch social media links' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'displayOrder' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.platformName.trim() || !formData.url.trim()) {
      setAlert({ type: 'error', message: 'Platform name and URL are required' });
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await socialMediaAPI.update(editingId, formData);
        setAlert({ type: 'success', message: 'Social media link updated successfully' });
      } else {
        await socialMediaAPI.create(formData);
        setAlert({ type: 'success', message: 'Social media link created successfully' });
      }
      
      resetForm();
      await fetchSocialMedia();
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Failed to save social media link' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (link) => {
    setEditingId(link.id);
    setFormData({
      platformName: link.platform_name,
      url: link.url,
      iconName: link.icon_name || '',
      displayOrder: link.display_order || 0,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this social media link?')) return;

    setLoading(true);
    try {
      await socialMediaAPI.delete(id);
      setAlert({ type: 'success', message: 'Social media link deleted successfully' });
      await fetchSocialMedia();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to delete social media link' });
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    setLoading(true);
    try {
      await socialMediaAPI.restore(id);
      setAlert({ type: 'success', message: 'Social media link restored successfully' });
      await fetchSocialMedia();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to restore social media link' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      platformName: '',
      url: '',
      iconName: '',
      displayOrder: 0,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const activeLinks = socialLinks.filter(link => link.is_active);
  const inactiveLinks = socialLinks.filter(link => !link.is_active);

  if (loading && socialLinks.length === 0) return <Loading />;

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Social Media Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={20} />
            {showForm ? 'Cancel' : 'Add New Link'}
          </button>
        </div>

        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingId ? 'Edit Social Media Link' : 'Add New Social Media Link'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Platform Name *</label>
                <input
                  type="text"
                  name="platformName"
                  value={formData.platformName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Twitter, Facebook"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">URL *</label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-500"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Icon Name</label>
                <input
                  type="text"
                  name="iconName"
                  value={formData.iconName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Twitter, Facebook (lucide-react icon names)"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Display Order</label>
                <input
                  type="number"
                  name="displayOrder"
                  value={formData.displayOrder}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Links ({activeLinks.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">Platform</th>
                  <th className="px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">URL</th>
                  <th className="px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">Icon Name</th>
                  <th className="px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">Order</th>
                  <th className="px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {activeLinks.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-600 dark:text-gray-400">
                      No active social media links
                    </td>
                  </tr>
                ) : (
                  activeLinks.map(link => (
                    <tr key={link.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-gray-900 dark:text-white">{link.platform_name}</td>
                      <td className="px-6 py-4">
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-xs">
                          {link.url}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{link.icon_name || '-'}</td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{link.display_order}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEdit(link)}
                            className="text-blue-600 hover:text-blue-800 transition"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(link.id)}
                            className="text-red-600 hover:text-red-800 transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {inactiveLinks.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mt-6">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Deleted Links ({inactiveLinks.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">Platform</th>
                    <th className="px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">URL</th>
                    <th className="px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {inactiveLinks.map(link => (
                    <tr key={link.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 opacity-60">
                      <td className="px-6 py-4 text-gray-900 dark:text-white">{link.platform_name}</td>
                      <td className="px-6 py-4">
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-xs">
                          {link.url}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleRestore(link.id)}
                          className="flex items-center gap-2 text-green-600 hover:text-green-800 transition"
                          title="Restore"
                        >
                          <RotateCcw size={18} />
                          Restore
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
