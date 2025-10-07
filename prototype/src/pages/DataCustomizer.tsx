import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share, Save } from 'lucide-react';
import HighlightSelector from '../components/customizer/HighlightSelector';
import VideoOverlayEditor from '../components/customizer/VideoOverlayEditor';
import FactSidebar from '../components/customizer/FactSidebar';
import { mockCustomizableHighlights } from '../data/mockCustomizableHighlights';
import { mockUsers } from '../data/mockUsers';
import { CustomizableHighlight, VideoOverlay, Post } from '../types';

export default function DataCustomizer() {
  const navigate = useNavigate();
  const [selectedHighlight, setSelectedHighlight] = useState<CustomizableHighlight | null>(null);
  const [currentHighlight, setCurrentHighlight] = useState<CustomizableHighlight | null>(null);
  const [overlays, setOverlays] = useState<VideoOverlay[]>([]);
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');

  const handleHighlightSelect = (highlight: CustomizableHighlight) => {
    setSelectedHighlight(highlight);
    setCurrentHighlight({ ...highlight, selectedFacts: [] });
    setOverlays([]);
    setPostTitle(highlight.title);
    setPostDescription('');
  };

  const handleFactToggle = (factId: string) => {
    if (!currentHighlight) return;

    const updatedHighlight = {
      ...currentHighlight,
      selectedFacts: currentHighlight.selectedFacts.includes(factId)
        ? currentHighlight.selectedFacts.filter(id => id !== factId)
        : [...currentHighlight.selectedFacts, factId]
    };

    setCurrentHighlight(updatedHighlight);
  };

  const handleOverlayChange = useCallback((newOverlays: VideoOverlay[]) => {
    setOverlays(newOverlays);
  }, []);

  const handlePostToFeed = () => {
    if (!currentHighlight) return;

    // Get selected facts details with overlay positions and styles
    const overlayData = overlays
      .map(overlay => {
        const fact = currentHighlight.availableFacts.find(f => f.id === overlay.factId);
        if (!fact) return null;
        return {
          factId: fact.id,
          label: fact.label,
          value: fact.value,
          category: fact.category,
          position: overlay.position,
          style: overlay.style,
          duration: overlay.duration,
          delay: overlay.delay
        };
      })
      .filter(Boolean);

    const selectedFactsDetails = overlayData
      .map(data => `${data!.label}: ${data!.value}`)
      .join(', ');

    // Create a new post from the customized highlight
    const newPost: Post = {
      id: `custom_post_${Date.now()}`,
      title: postTitle || currentHighlight.title,
      description: postDescription || `Customized highlight with data overlays: ${selectedFactsDetails}`,
      videoUrl: currentHighlight.videoUrl,
      videoProvider: currentHighlight.videoProvider,
      youtubeId: currentHighlight.youtubeId,
      thumbnailUrl: currentHighlight.thumbnailUrl,
      context: currentHighlight.context,
      stats: [], // Convert facts to stats format if needed
      author: mockUsers[0], // Use first mock user as author
      votes: 1, // Start with 1 upvote
      userVote: 'up',
      commentCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      overlays: overlayData as any // Store overlay data
    };

    // Save to localStorage
    try {
      const POSTS_STORAGE_KEY = 'highlighthub_custom_posts';
      const existingPosts = localStorage.getItem(POSTS_STORAGE_KEY);
      const customPosts = existingPosts ? JSON.parse(existingPosts) : [];
      customPosts.unshift(newPost); // Add to beginning
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(customPosts));

      console.log('Posted customized highlight:', newPost);
      alert('Your customized highlight has been posted to the feed!');
      navigate('/');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error posting highlight. Please try again.');
    }
  };

  const canPost = currentHighlight && currentHighlight.selectedFacts.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-reddit-orange transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Feed</span>
              </Link>
              
              <div className="h-6 border-l border-gray-300 dark:border-gray-600"></div>
              
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Data Customizer
              </h1>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {canPost && (
                <>
                  <button
                    onClick={() => {/* Save draft functionality */}}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Draft</span>
                  </button>
                  
                  <button
                    onClick={handlePostToFeed}
                    className="flex items-center space-x-2 px-4 py-2 bg-reddit-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <Share className="w-4 h-4" />
                    <span>Post to Feed</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {!selectedHighlight ? (
          /* Step 1: Select Highlight */
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Customize Your Sports Highlights
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Add data overlays to highlight clips and share them with the community
              </p>
            </div>
            
            <HighlightSelector
              highlights={mockCustomizableHighlights}
              selectedHighlight={selectedHighlight}
              onHighlightSelect={handleHighlightSelect}
            />
          </div>
        ) : (
          /* Step 2: Customize Selected Highlight */
          <div className="space-y-6">
            {/* Title and Description Editor */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Post Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Enter a title for your highlight"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-reddit-orange"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={postDescription}
                    onChange={(e) => setPostDescription(e.target.value)}
                    placeholder="Add a description to provide context"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-reddit-orange resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex h-[calc(100vh-400px)] space-x-6">
              {/* Main Editor */}
              <div className="flex-1 flex flex-col">
                {currentHighlight && (
                  <VideoOverlayEditor
                    highlight={currentHighlight}
                    onOverlayChange={handleOverlayChange}
                  />
                )}
              </div>

              {/* Sidebar */}
              {currentHighlight && (
                <FactSidebar
                  facts={currentHighlight.availableFacts}
                  selectedFacts={currentHighlight.selectedFacts}
                  onFactToggle={handleFactToggle}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Instructions Panel */}
      {selectedHighlight && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 px-6 py-3 max-w-2xl">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Step {currentHighlight?.selectedFacts.length === 0 ? '1' : '2'}:</span>
              {currentHighlight?.selectedFacts.length === 0 
                ? ' Select facts from the sidebar to add data overlays to your video'
                : ' Drag overlays on the video to position them, then post to share with the community'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 