import { useEffect, useState } from 'react';
import { Youtube } from 'lucide-react';
import { settingsAPI } from '../../api';
import AdminLayout from '../../layouts/AdminLayout';
import { Alert } from '../../components/Alert';
import { Loading } from '../../components/Loading';

export default function AdminYouTubeSettings() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchYouTubeUrl();
  }, []);

  const fetchYouTubeUrl = async () => {
    setLoading(true);
    try {
      const res = await settingsAPI.getByKey('youtube_channel_url');
      setYoutubeUrl(res.data.data || '');
    } catch (error) {
      console.error('Failed to fetch YouTube URL:', error);
      setYoutubeUrl('https://www.youtube.com/channel/GNNews');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!youtubeUrl.trim()) {
      setAlert({ type: 'error', message: 'YouTube URL is required' });
      return;
    }

    if (!youtubeUrl.includes('youtube.com') && !youtubeUrl.includes('youtu.be')) {
      setAlert({ type: 'error', message: 'Please enter a valid YouTube URL' });
      return;
    }

    setLoading(true);
    try {
      await settingsAPI.update('youtube_channel_url', youtubeUrl);
      setAlert({ type: 'success', message: 'YouTube channel URL updated successfully' });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Failed to save YouTube URL' });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !youtubeUrl) return <Loading />;

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Youtube size={32} className="text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">YouTube Channel Settings</h1>
        </div>

        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-2xl">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                YouTube Channel URL
              </label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-500"
                placeholder="https://www.youtube.com/channel/..."
              />
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                Enter your YouTube channel URL. This link will be displayed in the YouTube card on the homepage.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Preview</h3>
              <div className="bg-gradient-to-br from-red-600 to-red-700 dark:from-red-700 dark:to-red-800 p-4 rounded text-white">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">Subscribe</h4>
                  <Youtube size={24} />
                </div>
                <p className="text-red-100 text-sm mb-4">
                  Follow us on YouTube for exclusive news content!
                </p>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white text-red-600 font-bold py-2 px-4 rounded transition hover:bg-red-50 text-center text-sm"
                >
                  Subscribe Now
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Settings'}
              </button>
              {saved && (
                <div className="text-green-600 dark:text-green-400 font-semibold flex items-center">
                  ✓ Saved
                </div>
              )}
            </div>
          </form>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Tips:</h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>• Use your channel URL: youtube.com/channel/YOUR_CHANNEL_ID</li>
              <li>• Or use your custom URL: youtube.com/@YourChannelName</li>
              <li>• Leave empty to hide the YouTube card from the homepage</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
