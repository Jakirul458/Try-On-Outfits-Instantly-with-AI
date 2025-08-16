'use client'

import React from 'react'
import { Mail, Phone, MapPin, Linkedin, Github, Code } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
          <div className="max-w-5xl mx-auto text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get In <span className="text-yellow-300">Touch</span>
            </h1>
            <div className="w-24 h-1 bg-yellow-300 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Have questions about our AI-powered virtual try-on technology? 
              We'd love to hear from you and help you get started.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">jakirulsk312@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91 6294527072</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">Kolkata, India</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Me</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://linkedin.com/in/jakirul458" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Linkedin className="h-6 w-6 text-blue-600" />
                  </a>
                  <a 
                    href="https://github.com/Jakirul458" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Github className="h-6 w-6 text-gray-600" />
                  </a>
                  <a 
                    href="https://leetcode.com/u/Jakirul_Sk/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-yellow-100 p-3 rounded-lg hover:bg-yellow-200 transition-colors"
                  >
                    <Code className="h-6 w-6 text-yellow-600" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send Me a Message</h3>
                <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
                  <input type="hidden" name="access_key" value="e960a4c6-cee5-42d6-95f7-1d7ad29cb908" />
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <input 
                        type="text" 
                        name="name" 
                        placeholder="Your Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        name="email" 
                        placeholder="Your Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <input 
                      type="text" 
                      name="subject" 
                      placeholder="Subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <textarea 
                      name="message" 
                      placeholder="Your Message" 
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-vertical"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <input 
                      type="url" 
                      name="drive_link" 
                      placeholder="If you want to attach a file, please provide a drive link."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
