import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { newsAPI, categoryAPI, uploadAPI } from '../../api';
import { Loading, LoadingCard } from '../../components/Loading';
import { Alert } from '../../components/Alert';
import AdminNavbar from '../../components/AdminNavbar';
import ImageTransformer from '../../components/ImageTransformer';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Upload, Bold, Italic, List, Heading1, Heading2, ImageIcon } from 'lucide-react';

const AdminNewsEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('draft');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newsId, setNewsId] = useState(null);
  const [loading, setLoading] = useState(id ? true : false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imageToTransform, setImageToTransform] = useState(null);
  const [transformType, setTransformType] = useState(null); // 'thumbnail' or 'editor'
  const thumbnailInputRef = useRef(null);
  const [imageNodePos, setImageNodePos] = useState(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: true,
      }),
    ],
    content: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await categoryAPI.getAll();
        setCategories(Array.isArray(catRes.data.data) ? catRes.data.data : []);

        if (id) {
          const newsRes = await newsAPI.getBySlug(id);
          const news = newsRes.data.data;
          setTitle(news.title);
          setSummary(news.summary);
          // Backend returns category_id (int), convert to string for <select>
          setCategory(String(news.category_id || ''));
          setNewsId(news.id);
          setStatus(news.status);
          setThumbnail(news.thumbnail);
          if (editor) {
            editor.commands.setContent(news.content || '');
          }
        }
      } catch (error) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, editor]);

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setImageToTransform(localUrl);
    setTransformType('thumbnail');
  };

  // cleanup any created object URLs
  useEffect(() => {
    return () => {
      if (thumbnailFile) URL.revokeObjectURL(thumbnailFile);
    };
  }, [thumbnailFile]);

  const handleImageTransformed = async (transformedImageUrl) => {
    setImageToTransform(null);
    setSaving(true);
    
    try {
      // Convert data URL to blob
      const response = await fetch(transformedImageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
      
      // Upload to Cloudinary
      const res = await uploadAPI.upload(file);
      const uploadedUrl = res.data.data?.secure_url || res.data.data?.url || res.data.data;
      
      if (transformType === 'thumbnail') {
        setThumbnail(uploadedUrl);
        setSuccess('Thumbnail uploaded successfully');
      } else if (transformType === 'editor' && editor) {
        editor.chain().focus().setImage({ src: uploadedUrl }).run();
        setSuccess('Image inserted successfully');
      } else if (transformType === 'editor-edit' && editor) {
        // If we stored a node position, set node selection there first
        try {
          if (imageNodePos != null) {
            // ensure the image node is selected, then update attributes
            if (editor.commands.setNodeSelection) {
              editor.chain().focus().setNodeSelection(imageNodePos).updateAttributes('image', { src: uploadedUrl }).run();
            } else {
              editor.chain().focus().updateAttributes('image', { src: uploadedUrl }).run();
            }
          } else {
            editor.chain().focus().updateAttributes('image', { src: uploadedUrl }).run();
          }
          setSuccess('Image updated successfully');
        } catch (err) {
          setError('Failed to update editor image');
        }
      }
      
      setTransformType(null);
    } catch (error) {
        setError('Failed to process image');
    } finally {
      setSaving(false);
    }
  };

  const handleImageInsert = async (e) => {
    const file = e.target.files[0];
    if (!file || !editor) return;

    const localUrl = URL.createObjectURL(file);
    setImageToTransform(localUrl);
    setTransformType('editor');
  };

  const handleEditSelectedImage = () => {
    if (!editor) return;
    const state = editor.state;
    const { selection } = state;
    let node = null;
    let pos = null;

    // If a node selection exists and it's an image
    if (selection.node && selection.node.type && selection.node.type.name === 'image') {
      node = selection.node;
      pos = selection.from;
    } else {
      // try nodeAfter from the $from position
      const { $from } = selection;
      const nodeAfter = $from.nodeAfter;
      if (nodeAfter && nodeAfter.type && nodeAfter.type.name === 'image') {
        node = nodeAfter;
        pos = $from.pos;
      } else {
        // fallback: search doc for an image node near the current selection
        state.doc.descendants((n, p) => {
          if (!node && n.type && n.type.name === 'image') {
            node = n;
            pos = p;
            return false; // stop
          }
          return true;
        });
      }
    }

    if (!node || !node.attrs || !node.attrs.src) {
      setError('Place the cursor on or select an image to edit it');
      return;
    }

    setImageNodePos(pos);
    setImageToTransform(node.attrs.src);
    setTransformType('editor-edit');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !summary || !category || !editor?.getHTML()) {
      setError('Please fill all required fields');
      return;
    }

    const categoryIdNum = Number(category);
    if (Number.isNaN(categoryIdNum) || categoryIdNum <= 0) {
      setError('Category ID is required and must be a number');
      setSaving(false);
      return;
    }

    setSaving(true);
    try {
      const data = {
        title,
        summary,
        content: editor.getHTML(),
        categoryId: categoryIdNum,
        status,
        thumbnail: thumbnail || null,
      };

      if (id) {
        await newsAPI.update(newsId, data);
        setSuccess('News updated successfully');
      } else {
        await newsAPI.create(data);
        setSuccess('News created successfully');
      }

      setTimeout(() => navigate('/admin/news'), 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save news');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <AdminNavbar />
      {imageToTransform && (
        <ImageTransformer
          imageSrc={imageToTransform}
          onSave={handleImageTransformed}
          onCancel={() => {
            setImageToTransform(null);
            setTransformType(null);
          }}
        />
      )}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{id ? 'Edit News' : 'Create News'}</h1>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}
        {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="News title"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 outline-none"
                />
                </div>

              <div>
                <label className="block font-medium mb-1">Summary *</label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Brief summary of the news"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="breaking">Breaking</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Thumbnail</h2>
            <div className="space-y-4">
              {(thumbnailFile || thumbnail) && (
                <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img src={thumbnailFile || thumbnail} alt="thumbnail" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => thumbnailInputRef.current && thumbnailInputRef.current.click()}
                      className="bg-white dark:bg-gray-800 px-2 py-1 rounded shadow text-sm"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => { setThumbnail(null); setThumbnailFile(null); }}
                      className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
              <label className="block">
                <input
                  type="file"
                  ref={thumbnailInputRef}
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  disabled={saving}
                  className="hidden"
                />
                <span className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-primary-500 rounded-lg cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900 transition">
                  <Upload size={20} />
                  {saving ? 'Uploading...' : 'Click to upload thumbnail'}
                </span>
              </label>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Content *</h2>
            {editor && (
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-700 p-2 flex flex-wrap gap-2 border-b border-gray-300 dark:border-gray-600">
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    <Bold size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    <Italic size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    <Heading1 size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    <Heading2 size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    <List size={18} />
                  </button>
                  <label className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageInsert}
                      disabled={saving}
                      className="hidden"
                    />
                    <ImageIcon size={18} />
                  </label>
                  <button
                    type="button"
                    onClick={handleEditSelectedImage}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    title="Edit selected image"
                  >
                    ✎
                  </button>
                </div>
                <EditorContent editor={editor} className="prose dark:prose-invert max-w-none p-4 bg-white dark:bg-gray-800 min-h-96 focus:outline-none" />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : id ? 'Update News' : 'Create News'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/news')}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminNewsEditor;
