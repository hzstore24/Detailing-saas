/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [serviceName, setServiceName] = useState('');

  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const removeImage = (
    e: React.MouseEvent,
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
    inputRef: React.RefObject<HTMLInputElement | null>
  ) => {
    e.stopPropagation();
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30">
      <main className="max-w-md mx-auto w-full min-h-screen flex flex-col p-6 space-y-8">
        
        <header className="pt-8 pb-2">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-1">
            New JobProof
          </h1>
          <p className="text-sm text-zinc-400">
            Upload your work photos to generate a professional proof.
          </p>
        </header>

        <section className="grid grid-cols-2 gap-4">
          {/* Before Upload Box */}
          <div 
            onClick={() => beforeInputRef.current?.click()}
            className="group relative flex flex-col items-center justify-center aspect-square rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900 transition-all cursor-pointer overflow-hidden"
          >
            <input 
              type="file" 
              accept="image/*"
              className="hidden" 
              ref={beforeInputRef}
              onChange={(e) => handleImageUpload(e, setBeforeImage)}
            />
            <AnimatePresence>
              {beforeImage ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
                  <button 
                    onClick={(e) => removeImage(e, setBeforeImage, beforeInputRef)}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                    <span className="text-xs font-medium text-white shadow-sm">Before</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-2 px-4 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 group-hover:bg-zinc-700 transition-colors">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-zinc-300">Upload Before</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* After Upload Box */}
          <div 
            onClick={() => afterInputRef.current?.click()}
            className="group relative flex flex-col items-center justify-center aspect-square rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900 transition-all cursor-pointer overflow-hidden"
          >
            <input 
              type="file" 
              accept="image/*"
              className="hidden" 
              ref={afterInputRef}
              onChange={(e) => handleImageUpload(e, setAfterImage)}
            />
            <AnimatePresence>
              {afterImage ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img src={afterImage} alt="After" className="w-full h-full object-cover" />
                  <button 
                    onClick={(e) => removeImage(e, setAfterImage, afterInputRef)}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                    <span className="text-xs font-medium text-white shadow-sm">After</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-2 px-4 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 group-hover:bg-zinc-700 transition-colors">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-zinc-300">Upload After</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <section className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="service-name" className="text-sm font-medium text-zinc-300 ml-1">
              Service Name
            </label>
            <input
              id="service-name"
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="e.g. Premium Driveway Power Washing"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
          </div>
        </section>

        <div className="mt-auto pt-8">
          <button 
            disabled={!beforeImage || !afterImage || !serviceName.trim()}
            className="w-full bg-white hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-zinc-950 font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            Generate JobProof
          </button>
        </div>

      </main>
    </div>
  );
}
