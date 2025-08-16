'use client'

import React from 'react'
import { Sparkles, Users, ShoppingBag, Shield, Zap } from "lucide-react"
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-white text-gray-800">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
          <div className="max-w-5xl mx-auto text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-yellow-300">Instant Outfit</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Revolutionizing fashion with AI-powered virtual try-on technology. 
              Experience the future of online shopping with instant, realistic outfit visualization.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe everyone deserves to feel confident in their clothing choices. 
              Our cutting-edge AI technology eliminates the guesswork from online shopping, 
              allowing you to see exactly how any outfit will look on you before you buy.
            </p>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <Sparkles className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">AI-Powered Try-On</h3>
                <p className="text-gray-600">
                  Advanced machine learning algorithms create realistic visualizations of how clothes fit and look on your body.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Personalized Experience</h3>
                <p className="text-gray-600">
                  Tailored recommendations based on your body type, style preferences, and previous interactions.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <ShoppingBag className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Vast Catalog</h3>
                <p className="text-gray-600">
                  Access to thousands of outfits from top brands and emerging designers, all available for virtual try-on.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
                <p className="text-gray-600">
                  Your photos are processed securely and never stored permanently. Your privacy is our top priority.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                <p className="text-gray-600">
                  Get instant results in just 3 seconds. No waiting, no delays - see your virtual try-on immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-4xl font-bold text-blue-600">99%</h3>
              <p className="text-gray-600">Accuracy Rate</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-600">2M+</h3>
              <p className="text-gray-600">Happy Users</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-indigo-600">50K+</h3>
              <p className="text-gray-600">Outfits Available</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-yellow-500">3s</h3>
              <p className="text-gray-600">Avg Processing</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
