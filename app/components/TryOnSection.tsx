'use client'

import React, { useState } from 'react'
import { Camera, Upload, Wand2, Download, Share2 } from 'lucide-react'

export default function TryOnSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedOutfit, setSelectedOutfit] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const outfits = [
    { id: 1, name: 'Summer Dress', image: '/api/placeholder/200/300', category: 'Dresses' },
    { id: 2, name: 'Business Suit', image: '/api/placeholder/200/300', category: 'Formal' },
    { id: 3, name: 'Casual Jeans', image: '/api/placeholder/200/300', category: 'Casual' },
    { id: 4, name: 'Evening Gown', image: '/api/placeholder/200/300', category: 'Evening' },
    { id: 5, name: 'Sports Wear', image: '/api/placeholder/200/300', category: 'Athletic' },
    { id: 6, name: 'Winter Coat', image: '/api/placeholder/200/300', category: 'Outerwear' },
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTryOn = () => {
    if (selectedImage && selectedOutfit) {
      setIsProcessing(true)
      // Simulate AI processing
      setTimeout(() => {
        setIsProcessing(false)
      }, 3000)
    }
  }

  return (
    <section id="try-on" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Virtual Try-On Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your photo, select an outfit, and see how it looks on you instantly
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Step 1: Upload Photo */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-primary-100 text-primary-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
              Upload Your Photo
            </h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
              {selectedImage ? (
                <div className="relative">
                  <img src={selectedImage} alt="Uploaded" className="w-full h-64 object-cover rounded-lg" />
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Drop your photo here or click to browse</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="btn-primary cursor-pointer inline-flex items-center space-x-2">
                    <Camera className="h-4 w-4" />
                    <span>Choose Photo</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Step 2: Select Outfit */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-primary-100 text-primary-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
              Choose Outfit
            </h3>
            
            <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              {outfits.map((outfit) => (
                <div
                  key={outfit.id}
                  onClick={() => setSelectedOutfit(outfit.id.toString())}
                  className={`cursor-pointer rounded-lg border-2 p-2 transition-all ${
                    selectedOutfit === outfit.id.toString()
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="bg-gray-200 h-24 rounded mb-2 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">{outfit.name}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-700">{outfit.name}</p>
                  <p className="text-xs text-gray-500">{outfit.category}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Try On Result */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-primary-100 text-primary-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
              Try-On Result
            </h3>
            
            <div className="border-2 border-gray-200 rounded-lg p-8 text-center h-80 flex flex-col justify-center">
              {isProcessing ? (
                <div className="animate-pulse">
                  <Wand2 className="h-12 w-12 text-primary-500 mx-auto mb-4 animate-spin" />
                  <p className="text-gray-600">AI is processing your try-on...</p>
                </div>
              ) : selectedImage && selectedOutfit ? (
                <div>
                  <div className="bg-gradient-to-br from-primary-100 to-secondary-100 h-48 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-600">AI Try-On Result</span>
                  </div>
                  <div className="flex space-x-2 justify-center">
                    <button className="btn-secondary text-sm py-2 px-4 flex items-center space-x-1">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                    <button className="btn-secondary text-sm py-2 px-4 flex items-center space-x-1">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <Wand2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Upload a photo and select an outfit to see the magic!</p>
                </div>
              )}
            </div>

            {selectedImage && selectedOutfit && !isProcessing && (
              <button 
                onClick={handleTryOn}
                className="btn-primary w-full mt-4 flex items-center justify-center space-x-2"
              >
                <Wand2 className="h-5 w-5" />
                <span>Try On Outfit</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
