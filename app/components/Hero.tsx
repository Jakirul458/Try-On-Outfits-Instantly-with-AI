'use client'

import React from 'react'
import { Camera, Upload, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="gradient-bg text-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Try On Outfits
            <span className="block text-yellow-300">Instantly with AI</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-up">
            Upload your photo and see how any outfit looks on you before you buy. 
            Powered by advanced AI technology for realistic virtual try-ons.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2">
              <Camera className="h-5 w-5" />
              <span>Take Photo</span>
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Upload Photo</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-300 opacity-10 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
