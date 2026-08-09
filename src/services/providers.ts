import type { Resource, PlatformProvider } from '../types';

export interface ResourceProvider {
  providerName: PlatformProvider;
  searchResources(query: string): Promise<Resource[]>;
  getResourceById(id: string): Promise<Resource | null>;
}

export class YouTubeProvider implements ResourceProvider {
  providerName: PlatformProvider = 'YouTube';

  async searchResources(query: string): Promise<Resource[]> {
    // Normalizes YouTube content (always Free)
    return [];
  }

  async getResourceById(id: string): Promise<Resource | null> {
    return null;
  }
}

export class CourseraProvider implements ResourceProvider {
  providerName: PlatformProvider = 'Coursera';

  async searchResources(query: string): Promise<Resource[]> {
    // Normalizes Coursera content (Paid/Subscription)
    return [];
  }

  async getResourceById(id: string): Promise<Resource | null> {
    return null;
  }
}

export class UdemyProvider implements ResourceProvider {
  providerName: PlatformProvider = 'Udemy';

  async searchResources(query: string): Promise<Resource[]> {
    // Normalizes Udemy content (Paid)
    return [];
  }

  async getResourceById(id: string): Promise<Resource | null> {
    return null;
  }
}
