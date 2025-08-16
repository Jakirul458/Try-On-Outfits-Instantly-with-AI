'use client'

import React, { useRef } from 'react'
import { Camera, Upload } from 'lucide-react'

export default function Hero() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTakePhoto = () => {
    // Check if device supports camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          // Create a video element to show camera feed
          const video = document.createElement('video')
          video.srcObject = stream
          video.autoplay = true
          video.style.position = 'fixed'
          video.style.top = '50%'
          video.style.left = '50%'
          video.style.transform = 'translate(-50%, -50%)'
          video.style.zIndex = '9999'
          video.style.maxWidth = '90vw'
          video.style.maxHeight = '90vh'
          video.style.border = '3px solid #0284c7'
          video.style.borderRadius = '12px'
          
          // Add overlay with capture button
          const overlay = document.createElement('div')
          overlay.style.position = 'fixed'
          overlay.style.top = '0'
          overlay.style.left = '0'
          overlay.style.width = '100%'
          overlay.style.height = '100%'
          overlay.style.backgroundColor = 'rgba(0,0,0,0.8)'
          overlay.style.zIndex = '9998'
          overlay.style.display = 'flex'
          overlay.style.alignItems = 'center'
          overlay.style.justifyContent = 'center'
          
          const captureBtn = document.createElement('button')
          captureBtn.innerHTML = '📸 Capture Photo'
          captureBtn.style.position = 'absolute'
          captureBtn.style.bottom = '20px'
          captureBtn.style.left = '50%'
          captureBtn.style.transform = 'translateX(-50%)'
          captureBtn.style.padding = '12px 24px'
          captureBtn.style.backgroundColor = '#0284c7'
          captureBtn.style.color = 'white'
          captureBtn.style.border = 'none'
          captureBtn.style.borderRadius = '8px'
          captureBtn.style.fontSize = '16px'
          captureBtn.style.cursor = 'pointer'
          
          const closeBtn = document.createElement('button')
          closeBtn.innerHTML = '✕'
          closeBtn.style.position = 'absolute'
          closeBtn.style.top = '20px'
          closeBtn.style.right = '20px'
          closeBtn.style.padding = '8px 12px'
          closeBtn.style.backgroundColor = 'rgba(255,255,255,0.2)'
          closeBtn.style.color = 'white'
          closeBtn.style.border = 'none'
          closeBtn.style.borderRadius = '4px'
          closeBtn.style.fontSize = '18px'
          closeBtn.style.cursor = 'pointer'
          
          const cleanup = () => {
            stream.getTracks().forEach(track => track.stop())
            document.body.removeChild(overlay)
          }
          
          captureBtn.onclick = () => {
            const canvas = document.createElement('canvas')
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const ctx = canvas.getContext('2d')
            ctx?.drawImage(video, 0, 0)
            
            // Convert to blob and show success message
            canvas.toBlob((blob) => {
              if (blob) {
                alert('Photo captured successfully! In a real app, this would be processed for virtual try-on.')
              }
            })
            cleanup()
          }
          
          closeBtn.onclick = cleanup
          overlay.onclick = (e) => {
            if (e.target === overlay) cleanup()
          }
          
          overlay.appendChild(video)
          overlay.appendChild(captureBtn)
          overlay.appendChild(closeBtn)
          document.body.appendChild(overlay)
        })
        .catch((error) => {
          alert('Camera access denied or not available. Please use the Upload Photo option instead.')
        })
    } else {
      alert('Camera not supported on this device. Please use the Upload Photo option.')
    }
  }

  const handleUploadPhoto = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.')
        return
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size too large. Please select an image under 10MB.')
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        // In a real app, you would send this to your AI processing endpoint
        alert(`Photo uploaded successfully: ${file.name}\nSize: ${(file.size / 1024 / 1024).toFixed(2)}MB\n\nIn a real app, this would be processed for virtual try-on.`)
      }
      reader.readAsDataURL(file)
    }
  }

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
            <button 
              onClick={handleTakePhoto}
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Camera className="h-5 w-5" />
              <span>Take Photo</span>
            </button>
            <button 
              onClick={handleUploadPhoto}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <Upload className="h-5 w-5" />
              <span>Upload Photo</span>
            </button>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileSelect}
            />
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
