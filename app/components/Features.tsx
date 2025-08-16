'use client'

import React from 'react'
import { Sparkles, Zap, Users, ShoppingBag, Smartphone, Shield } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Try-On',
      description: 'Advanced deep learning models create realistic virtual try-on experiences with accurate body mapping and garment fitting.',
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get your virtual try-on results in seconds. No waiting, no delays - just instant fashion visualization.',
    },
    {
      icon: Users,
      title: 'Personalized Recommendations',
      description: 'AI analyzes your body shape, style preferences, and past purchases to suggest outfits that suit you perfectly.',
    },
    {
      icon: ShoppingBag,
      title: 'Direct Purchase',
      description: 'Love what you see? Purchase directly through our integrated e-commerce platform with partner retailers.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Perfect experience on any device. Take photos, try on outfits, and shop seamlessly on mobile or desktop.',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your photos are processed securely and never stored permanently. Complete privacy and data protection.',
    },
  ]

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Instant Outfit?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of online shopping with our cutting-edge AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card hover:shadow-xl transition-shadow duration-300">
              <div className="gradient-bg p-3 rounded-lg w-fit mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">99%</div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">2M+</div>
            <div className="text-gray-600">Happy Users</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">50K+</div>
            <div className="text-gray-600">Outfits Available</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">3s</div>
            <div className="text-gray-600">Average Processing</div>
          </div>
        </div>
      </div>
    </section>
  )
}
