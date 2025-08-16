'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Upload, Plus, Edit, Trash2, Eye } from 'lucide-react'

interface Dress {
  id: string
  name: string
  category: string
  color: string
  size: string
  price: number
  description: string
  imageUrl: string
  tags: string[]
  storeId: string
  inStock: boolean
}

export default function AdminPage() {
  const [dresses, setDresses] = useState<Dress[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: 'casual',
    color: '',
    size: 'M',
    price: '',
    description: '',
    tags: '',
    storeId: 'store_001'
  })

  const categories = ['casual', 'formal', 'ethnic', 'party', 'sports']
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size']

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    
    try {
      const formDataObj = new FormData()
      formDataObj.append('image', file)
      formDataObj.append('name', formData.name)
      formDataObj.append('category', formData.category)
      formDataObj.append('color', formData.color)
      formDataObj.append('size', formData.size)
      formDataObj.append('price', formData.price)
      formDataObj.append('description', formData.description)
      formDataObj.append('tags', formData.tags)
      formDataObj.append('storeId', formData.storeId)

      const response = await fetch('http://localhost:5000/api/admin/dresses', {
        method: 'POST',
        body: formDataObj
      })

      if (response.ok) {
        const result = await response.json()
        setDresses(prev => [...prev, result.data])
        setFormData({
          name: '',
          category: 'casual',
          color: '',
          size: 'M',
          price: '',
          description: '',
          tags: '',
          storeId: 'store_001'
        })
        setShowAddForm(false)
        alert('Dress added successfully!')
      } else {
        alert('Failed to upload dress')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const loadDresses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/outfits')
      if (response.ok) {
        const result = await response.json()
        setDresses(result.data)
      }
    } catch (error) {
      console.error('Error loading dresses:', error)
    }
  }

  const initializeSampleData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/init-sample-data')
      if (response.ok) {
        alert('Sample data initialized!')
        loadDresses()
      }
    } catch (error) {
      console.error('Error initializing sample data:', error)
    }
  }

  const deleteDress = async (id: string) => {
    if (!confirm('Are you sure you want to delete this dress?')) return

    try {
      const response = await fetch(`http://localhost:5000/api/admin/dresses/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setDresses(prev => prev.filter(dress => dress.id !== id))
        alert('Dress deleted successfully!')
      }
    } catch (error) {
      console.error('Error deleting dress:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Store Admin Panel</h1>
          <p className="text-gray-600">Manage your dress catalog and inventory</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Dress</span>
          </button>
          
          <button
            onClick={loadDresses}
            className="btn-secondary flex items-center space-x-2"
          >
            <Eye className="h-5 w-5" />
            <span>View All Dresses</span>
          </button>

          <button
            onClick={initializeSampleData}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Upload className="h-5 w-5" />
            <span>Initialize Sample Data</span>
          </button>
        </div>

        {/* Add Dress Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Dress</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dress Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter dress name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter color"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size
                </label>
                <select
                  value={formData.size}
                  onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="elegant, party, summer"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter dress description"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dress Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {isUploading && (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Uploading dress...</p>
              </div>
            )}
          </div>
        )}

        {/* Dress Grid */}
        {dresses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dresses.map((dress) => (
              <div key={dress.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {dress.imageUrl ? (
                    <img 
                      src={`http://localhost:5000${dress.imageUrl}`} 
                      alt={dress.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{dress.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{dress.category} • {dress.color} • {dress.size}</p>
                  <p className="text-lg font-bold text-green-600 mb-2">₹{dress.price}</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{dress.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${dress.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {dress.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    
                    <button
                      onClick={() => deleteDress(dress.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {dresses.length === 0 && (
          <div className="text-center py-12">
            <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No dresses in catalog</h3>
            <p className="text-gray-600 mb-4">Start by adding your first dress or initialize sample data</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
