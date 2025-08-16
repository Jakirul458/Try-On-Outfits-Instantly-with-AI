'use client'

import React, { useState } from 'react'
import { Camera, Upload, Wand2, Download, Share2 } from 'lucide-react'

export default function TryOnSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedOutfit, setSelectedOutfit] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [tryOnResult, setTryOnResult] = useState<string | null>(null)

  const outfits = [
    { id: 1, name: 'Summer Dress', image: '/outfits/summer-dress.svg', category: 'Dresses' },
    { id: 2, name: 'Business Suit', image: '/outfits/business-suit.svg', category: 'Formal' },
    { id: 3, name: 'Casual Jeans', image: '/outfits/casual-jeans.svg', category: 'Casual' },
    { id: 4, name: 'Evening Gown', image: '/outfits/evening-gown.svg', category: 'Evening' },
    { id: 5, name: 'Sports Wear', image: '/outfits/sports-wear.svg', category: 'Athletic' },
    { id: 6, name: 'Winter Coat', image: '/outfits/winter-coat.svg', category: 'Outerwear' },
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
      setTryOnResult(null)
      
      // Simulate AI processing with realistic steps
      const processingSteps = [
        'Analyzing your photo...',
        'Detecting body landmarks...',
        'Processing outfit fit...',
        'Applying AI transformation...',
        'Generating final result...'
      ]
      
      let stepIndex = 0
      const stepInterval = setInterval(() => {
        if (stepIndex < processingSteps.length - 1) {
          stepIndex++
        }
      }, 600)
      
      // Generate AI result after processing
      setTimeout(() => {
        clearInterval(stepInterval)
        generateTryOnResult()
        setIsProcessing(false)
      }, 3000)
    } else {
      alert('Please upload a photo and select an outfit first!')
    }
  }
  
  const generateTryOnResult = () => {
    if (selectedImage && selectedOutfit) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 400
      canvas.height = 500
      
      if (ctx) {
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, '#667eea')
        gradient.addColorStop(0.5, '#764ba2')
        gradient.addColorStop(1, '#f093fb')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Load user image
        const userImg = new Image()
        userImg.onload = () => {
          // Draw user image with some processing effects
          ctx.save()
          ctx.globalAlpha = 0.8
          ctx.drawImage(userImg, 50, 50, 300, 350)
          
          // Add outfit overlay effect
          const selectedOutfitData = outfits.find(o => o.id.toString() === selectedOutfit)
          if (selectedOutfitData) {
            // Load outfit image
            const outfitImg = new Image()
            outfitImg.onload = () => {
              ctx.globalAlpha = 0.3
              ctx.drawImage(outfitImg, 100, 150, 200, 200)
              
              // Add AI processing effects
              ctx.globalAlpha = 0.1
              ctx.fillStyle = '#ffffff'
              for (let i = 0; i < 50; i++) {
                ctx.beginPath()
                ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3, 0, Math.PI * 2)
                ctx.fill()
              }
              
              // Add text overlay
              ctx.globalAlpha = 1
              ctx.fillStyle = 'rgba(255,255,255,0.9)'
              ctx.fillRect(0, canvas.height - 60, canvas.width, 60)
              
              ctx.fillStyle = '#333'
              ctx.font = 'bold 16px Arial'
              ctx.textAlign = 'center'
              ctx.fillText('AI Virtual Try-On Result', canvas.width / 2, canvas.height - 35)
              ctx.font = '12px Arial'
              ctx.fillText(`${selectedOutfitData.name} - ${selectedOutfitData.category}`, canvas.width / 2, canvas.height - 15)
              
              // Convert to data URL
              setTryOnResult(canvas.toDataURL())
            }
            outfitImg.src = selectedOutfitData.image
          }
          ctx.restore()
        }
        userImg.src = selectedImage
      }
    }
  }

  const handleDownload = () => {
    if (selectedImage && selectedOutfit) {
      // Create a canvas to combine the image and outfit info
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 400
      canvas.height = 600
      
      if (ctx) {
        // Fill background
        ctx.fillStyle = '#f8f9fa'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Add title
        ctx.fillStyle = '#333'
        ctx.font = 'bold 24px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('Virtual Try-On Result', canvas.width / 2, 40)
        
        // Add outfit info
        const selectedOutfitData = outfits.find(o => o.id.toString() === selectedOutfit)
        ctx.font = '18px Arial'
        ctx.fillText(`Outfit: ${selectedOutfitData?.name}`, canvas.width / 2, 80)
        ctx.fillText(`Category: ${selectedOutfitData?.category}`, canvas.width / 2, 110)
        
        // Load and draw the user's image
        const img = new Image()
        img.onload = () => {
          // Draw user image
          ctx.drawImage(img, 50, 140, 300, 300)
          
          // Add watermark
          ctx.fillStyle = 'rgba(0,0,0,0.7)'
          ctx.font = '14px Arial'
          ctx.fillText('Generated by Instant Outfit AI', canvas.width / 2, canvas.height - 20)
          
          // Convert to blob and download
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `virtual-tryon-${selectedOutfitData?.name.toLowerCase().replace(' ', '-')}.png`
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
              URL.revokeObjectURL(url)
            }
          })
        }
        img.src = selectedImage
      }
    } else {
      alert('Please complete the try-on process first!')
    }
  }

  const handleShare = () => {
    if (selectedImage && selectedOutfit) {
      const selectedOutfitData = outfits.find(o => o.id.toString() === selectedOutfit)
      const shareText = `Check out my virtual try-on with ${selectedOutfitData?.name} using Instant Outfit AI! 🎉✨`
      
      if (navigator.share) {
        navigator.share({
          title: 'Virtual Try-On Result',
          text: shareText,
          url: window.location.href
        }).catch(console.error)
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText + ' ' + window.location.href)
          .then(() => alert('Share text copied to clipboard!'))
          .catch(() => alert('Unable to share. Please copy the URL manually.'))
      }
    } else {
      alert('Please complete the try-on process first!')
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
                  <div className="h-24 rounded mb-2 flex items-center justify-center overflow-hidden">
                    <img 
                      src={outfit.image} 
                      alt={outfit.name}
                      className="w-full h-full object-cover rounded"
                    />
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
                  {tryOnResult ? (
                    <div className="h-48 rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={tryOnResult} 
                        alt="AI Try-On Result" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-primary-100 to-secondary-100 h-48 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-20 animate-pulse"></div>
                      <div className="text-center z-10">
                        <div className="text-4xl mb-2">✨</div>
                        <span className="text-gray-700 font-semibold">Ready for AI Try-On</span>
                        <div className="text-sm text-gray-500 mt-1">Photo + {outfits.find(o => o.id.toString() === selectedOutfit)?.name}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex space-x-2 justify-center">
                    <button 
                      onClick={handleDownload}
                      className="btn-secondary text-sm py-2 px-4 flex items-center space-x-1 hover:bg-primary-50 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                    <button 
                      onClick={handleShare}
                      className="btn-secondary text-sm py-2 px-4 flex items-center space-x-1 hover:bg-primary-50 transition-colors"
                    >
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
                className="btn-primary w-full mt-4 flex items-center justify-center space-x-2 hover:shadow-lg transition-all"
              >
                <Wand2 className="h-5 w-5" />
                <span>{tryOnResult ? 'Try Again' : 'Generate AI Try-On'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
