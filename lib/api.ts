const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000');

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.timeout = API_TIMEOUT;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/api/health');
  }

  // Get available outfits
  async getOutfits(params?: { category?: string; page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const query = searchParams.toString();
    const endpoint = `/api/outfits${query ? `?${query}` : ''}`;
    
    return this.request(endpoint);
  }

  // Virtual try-on
  async tryOnOutfit(data: { outfitId: string; photoId?: string; photo?: File }) {
    const formData = new FormData();
    formData.append('outfitId', data.outfitId);
    
    if (data.photoId) {
      formData.append('photoId', data.photoId);
    }
    
    if (data.photo) {
      formData.append('photo', data.photo);
    }

    return this.request('/api/try-on', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }

  // Upload photo
  async uploadPhoto(photo: File) {
    const formData = new FormData();
    formData.append('photo', photo);

    return this.request('/api/upload-photo', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }

  // Get recommendations
  async getRecommendations(data: {
    bodyType?: string;
    stylePreferences?: string[];
    previousPurchases?: string[];
  }) {
    return this.request('/api/recommendations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
