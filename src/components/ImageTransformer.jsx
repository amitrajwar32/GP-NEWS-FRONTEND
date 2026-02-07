import React, { useState, useRef, useEffect } from 'react';
import { X, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

const ImageTransformer = ({ imageSrc, onSave, onCancel }) => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const handleSave = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale, scale);
      ctx.drawImage(img, -img.width / 2 + offsetX, -img.height / 2 + offsetY);
      ctx.restore();

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        onSave(url);
      }, 'image/jpeg', 0.95);
    };
    
    img.src = imageSrc;
  };

  // draw preview whenever image or transform params change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageSrc) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';

    const handleLoad = () => {
      // clear and draw with transforms
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale, scale);
      ctx.drawImage(img, -img.width / 2 + offsetX, -img.height / 2 + offsetY);
      ctx.restore();
    };

    img.onload = handleLoad;
    img.onerror = () => {
      // if image fails to load, clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    img.src = imageSrc;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc, scale, rotation, offsetX, offsetY]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-bold">Adjust Image</h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={400}
              height={300}
              className="max-w-full max-h-full"
            />
          </div>

          <div className="w-48 p-4 flex flex-col gap-4 overflow-y-auto border-l dark:border-gray-700">
            <div>
              <label className="block text-sm font-medium mb-2">Scale: {scale.toFixed(2)}x</label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setScale(Math.max(0.5, scale - 0.2))}
                  className="flex-1 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
                >
                  <ZoomOut size={16} className="mx-auto" />
                </button>
                <button
                  onClick={() => setScale(Math.min(3, scale + 0.2))}
                  className="flex-1 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
                >
                  <ZoomIn size={16} className="mx-auto" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rotate: {rotation}°</label>
              <input
                type="range"
                min="-180"
                max="180"
                step="15"
                value={rotation}
                onChange={(e) => setRotation(parseInt(e.target.value))}
                className="w-full"
              />
              <button
                onClick={() => setRotation((rotation + 90) % 360)}
                className="w-full mt-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm flex items-center justify-center gap-1"
              >
                <RotateCw size={14} /> Rotate 90°
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Offset X: {offsetX}px</label>
              <input
                type="range"
                min="-100"
                max="100"
                step="10"
                value={offsetX}
                onChange={(e) => setOffsetX(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Offset Y: {offsetY}px</label>
              <input
                type="range"
                min="-100"
                max="100"
                step="10"
                value={offsetY}
                onChange={(e) => setOffsetY(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              onClick={() => {
                setScale(1);
                setRotation(0);
                setOffsetX(0);
                setOffsetY(0);
              }}
              className="w-full px-3 py-2 bg-gray-300 dark:bg-gray-600 rounded text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="flex gap-2 p-4 border-t dark:border-gray-700">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageTransformer;
