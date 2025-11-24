import { useState } from 'react';
import { 
  Search, 
  Filter, 
  FolderPlus, 
  FileText, 
  FileImage, 
  FileVideo, 
  Download, 
  Share2, 
  Star, 
  Clock,
  Grid,
  List,
  Plus,
  X,
  Upload
} from 'lucide-react';
import Button from '../atoms/Button';
import Card from '../atoms/Card';

// Types
interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'medical' | 'educational' | 'administrative' | 'marketing';
  type: 'document' | 'image' | 'video';
  fileSize: string;
  createdAt: string;
  updatedAt: string;
  starred: boolean;
  thumbnail?: string;
}

// Mock data
const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Canine Vaccination Protocol',
    description: 'Standard vaccination schedule and protocol for dogs of different ages.',
    category: 'medical',
    type: 'document',
    fileSize: '245 KB',
    createdAt: '2023-03-15',
    updatedAt: '2023-03-15',
    starred: true,
    thumbnail: 'https://images.pexels.com/photos/5731866/pexels-photo-5731866.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    id: '2',
    title: 'Feline Dental Care Guide',
    description: 'Comprehensive guide for cat dental health maintenance and common issues.',
    category: 'educational',
    type: 'document',
    fileSize: '1.2 MB',
    createdAt: '2023-02-28',
    updatedAt: '2023-04-01',
    starred: false,
    thumbnail: 'https://images.pexels.com/photos/7988113/pexels-photo-7988113.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    id: '3',
    title: 'Surgical Room Protocols',
    description: 'Procedures and protocols for maintaining surgical room sterility.',
    category: 'medical',
    type: 'document',
    fileSize: '780 KB',
    createdAt: '2023-01-10',
    updatedAt: '2023-01-10',
    starred: true
  },
  {
    id: '4',
    title: 'Pet Nutrition Infographic',
    description: 'Visual guide to proper nutrition for dogs and cats of different ages.',
    category: 'educational',
    type: 'image',
    fileSize: '3.5 MB',
    createdAt: '2023-03-05',
    updatedAt: '2023-03-05',
    starred: false,
    thumbnail: 'https://images.pexels.com/photos/8434791/pexels-photo-8434791.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    id: '5',
    title: 'Wound Treatment Demonstration',
    description: 'Video demonstration of proper wound cleaning and bandaging techniques.',
    category: 'educational',
    type: 'video',
    fileSize: '45 MB',
    createdAt: '2023-02-15',
    updatedAt: '2023-02-15',
    starred: false,
    thumbnail: 'https://images.pexels.com/photos/6235231/pexels-photo-6235231.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    id: '6',
    title: 'Client Consent Forms',
    description: 'Standard templates for various treatment consent forms.',
    category: 'administrative',
    type: 'document',
    fileSize: '320 KB',
    createdAt: '2023-01-22',
    updatedAt: '2023-03-10',
    starred: false
  },
  {
    id: '7',
    title: 'Marketing Materials for Spring Campaign',
    description: 'Flyers, social media graphics, and email templates for the spring wellness campaign.',
    category: 'marketing',
    type: 'image',
    fileSize: '12 MB',
    createdAt: '2023-03-01',
    updatedAt: '2023-03-01',
    starred: true,
    thumbnail: 'https://images.pexels.com/photos/5731880/pexels-photo-5731880.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    id: '8',
    title: 'Common Parasite Identification Guide',
    description: 'Visual guide to identifying common parasites in dogs and cats.',
    category: 'medical',
    type: 'document',
    fileSize: '4.7 MB',
    createdAt: '2023-02-10',
    updatedAt: '2023-02-10',
    starred: false,
    thumbnail: 'https://images.pexels.com/photos/8473466/pexels-photo-8473466.jpeg?auto=compress&cs=tinysrgb&w=1600'
  }
];

const DigitalLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [resources, setResources] = useState<Resource[]>(mockResources);
  
  // Filter resources based on search query and selected category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Toggle star status of a resource
  const toggleStar = (id: string) => {
    setResources(prevResources => 
      prevResources.map(resource => 
        resource.id === id 
          ? { ...resource, starred: !resource.starred } 
          : resource
      )
    );
  };
  
  // Get icon based on resource type
  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'document':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'image':
        return <FileImage className="h-6 w-6 text-green-500" />;
      case 'video':
        return <FileVideo className="h-6 w-6 text-purple-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };
  
  // Get category badge color
  const getCategoryColor = (category: Resource['category']) => {
    switch (category) {
      case 'medical':
        return 'bg-primary/10 text-primary';
      case 'educational':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'administrative':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'marketing':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Digital Library</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Access and manage all your digital resources</p>
        </div>
        <div className="flex space-x-3">
          <Button leftIcon={<Upload className="h-4 w-4" />} onClick={() => setUploadModalOpen(true)}>
            Upload Resources
          </Button>
          <Button variant="outline" leftIcon={<FolderPlus className="h-4 w-4" />}>
            New Folder
          </Button>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-primary focus:border-primary"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select
            className="p-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-primary focus:border-primary"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
          >
            <option value="">All Categories</option>
            <option value="medical">Medical</option>
            <option value="educational">Educational</option>
            <option value="administrative">Administrative</option>
            <option value="marketing">Marketing</option>
          </select>
          
          <div className="flex border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              className={`p-2 ${
                viewMode === 'grid'
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              className={`p-2 ${
                viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Resources */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <Card key={resource.id} className="overflow-hidden">
              {resource.thumbnail ? (
                <div className="h-48 w-full overflow-hidden">
                  <img 
                    src={resource.thumbnail} 
                    alt={resource.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 w-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  {resource.type === 'document' && <FileText className="h-16 w-16 text-gray-400" />}
                  {resource.type === 'image' && <FileImage className="h-16 w-16 text-gray-400" />}
                  {resource.type === 'video' && <FileVideo className="h-16 w-16 text-gray-400" />}
                </div>
              )}
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{resource.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getCategoryColor(resource.category)}`}>
                      {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                    </span>
                  </div>
                  <button
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => toggleStar(resource.id)}
                    aria-label={resource.starred ? 'Unstar resource' : 'Star resource'}
                  >
                    <Star className={`h-5 w-5 ${resource.starred ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
                  </button>
                </div>
                
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {resource.description}
                </p>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    {getResourceIcon(resource.type)}
                    <span className="ml-1">{resource.fileSize}</span>
                  </div>
                  
                  <div className="flex space-x-1">
                    <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3 w-8"></th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Size</th>
                  <th className="px-4 py-3">Modified</th>
                  <th className="px-4 py-3 w-20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResources.map(resource => (
                  <tr 
                    key={resource.id} 
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-3 w-8">
                      <button
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => toggleStar(resource.id)}
                        aria-label={resource.starred ? 'Unstar resource' : 'Star resource'}
                      >
                        <Star className={`h-4 w-4 ${resource.starred ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
                      </button>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        {getResourceIcon(resource.type)}
                        <span className="ml-2">{resource.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                        {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </td>
                    <td className="px-4 py-3">
                      {resource.fileSize}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        {new Date(resource.updatedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-1">
                        <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      
      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Upload Resources</h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-700 dark:text-gray-300 mb-2">Drag and drop files here or</p>
                <Button size="sm">Browse Files</Button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Supported formats: PDF, DOCX, JPG, PNG, MP4
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select a category</option>
                    <option value="medical">Medical</option>
                    <option value="educational">Educational</option>
                    <option value="administrative">Administrative</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description (optional)
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-primary focus:border-primary"
                    placeholder="Add a description for this resource..."
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setUploadModalOpen(false)}>
                  Cancel
                </Button>
                <Button>Upload</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalLibrary;