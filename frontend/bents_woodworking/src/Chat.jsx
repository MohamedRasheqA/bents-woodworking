import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ArrowRight, PlusCircle, Menu, ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';

// Initial questions
const initialQuestions = [
  "Best tools for beginners?",
  "Maintain my woodworking tools?",
  "Hardwood and softwood?"
];

// Function to extract YouTube video ID from URL
const getYoutubeVideoId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default function Chat() {
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showInitialQuestions, setShowInitialQuestions] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState("bents"); // Default index
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5002/chat', {
        message: searchQuery,
        selected_index: selectedIndex,
        chat_history: conversations.flatMap(conv => [conv.question, conv.text])
      });
      
      const newConversation = {
        question: searchQuery,
        text: response.data.response,
        video: response.data.url,
        products: response.data.related_products,
        videoLinks: response.data.video_links
      };
      setConversations([...conversations, newConversation]);
      setSearchHistory([...searchHistory, searchQuery]);
      setShowInitialQuestions(false);
      setSearchQuery("");
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConversation = () => {
    setConversations([]);
    setShowInitialQuestions(true);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (hamburgerRef.current) {
        const rect = hamburgerRef.current.getBoundingClientRect();
        const isNearHamburger = 
          event.clientX <= rect.right + 50 && 
          event.clientY >= rect.top - 50 && 
          event.clientY <= rect.bottom + 50;
        setShowSidebar(isNearHamburger);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const renderVideo = (video, videoLinks) => {
    const videoId = getYoutubeVideoId(video);
    if (videoId) {
      return (
        <div className="float-right ml-4 mb-2 w-full sm:w-1/2 md:w-1/3">
          <YouTube
            videoId={videoId}
            opts={{
              height: '195',
              width: '320',
              playerVars: {
                autoplay: 0,
              },
            }}
          />
        </div>
      );
    } else if (videoLinks && Object.keys(videoLinks).length > 0) {
      return (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Related Video Links:</h3>
          <ul>
            {Object.entries(videoLinks).map(([key, link], index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {key}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  const formatResponse = (text, videoLinks) => {
    // Replace timestamps with hyperlinks
    let formattedText = text.replace(/\[video(\d+)\]/g, (match, p1) => {
      const link = videoLinks[`[video${p1}]`];
      return link ? `<a href="${link}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">Video ${p1}</a>` : match;
    });

    // Format points and numbered bold text
    formattedText = formattedText.replace(/^- (.*?)$/gm, '<li>• $1</li>');
    formattedText = formattedText.replace(/(\d+)\.\s*\*\*(.*?)\*\*/g, '<div class="font-bold mt-2 mb-1">$1. $2</div>');

    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center border-b">
        <div 
          ref={hamburgerRef}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Menu size={24} />
        </div>
        <h1 className="text-xl font-bold">Woodworking Assistant</h1>
        <div className="w-6"></div>
      </header>

      {/* Sidebar */}
      {showSidebar && (
        <div 
          ref={sidebarRef}
          className="fixed top-16 left-0 w-64 bg-white p-4 shadow-lg z-10 h-full"
        >
          <button
            onClick={handleNewConversation}
            className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600 w-full"
          >
            <PlusCircle className="mr-2" size={20} />
            New Conversation
          </button>
          <div className="mb-4">
            <label htmlFor="index-select" className="block mb-2">Select Index:</label>
            <select
              id="index-select"
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="bents">All</option>
              <option value="shop-improvement">Shop Improvement</option>
              <option value="tool-recommendations">Tool Recommendations</option>
            </select>
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
            <h3 className="font-semibold mb-2">Search History</h3>
            {searchHistory.map((query, index) => (
              <div key={index} className="py-2 px-3 hover:bg-gray-100 cursor-pointer rounded">
                {query}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-grow overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <h2 className="text-3xl font-bold mb-8">A question creates knowledge</h2>
            
            {/* Initial Search bar with increased height and grey background */}
            <form onSubmit={handleSearch} className="w-full max-w-2xl mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask anything..."
                  className="w-full p-6 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin">⌛</span>
                  ) : (
                    <ArrowRight size={24} />
                  )}
                </button>
              </div>
            </form>

            {/* Initial questions in a single line */}
            {showInitialQuestions && (
              <div className="w-full max-w-2xl flex justify-between space-x-4 overflow-x-auto">
                {initialQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(question);
                      handleSearch({ preventDefault: () => {} });
                    }}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100 text-center whitespace-nowrap"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="p-4">
            {conversations.map((conv, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
                <h2 className="font-bold mb-4">{conv.question}</h2>
                
                {/* Related Products */}
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Related Products</h3>
                  <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:gap-2">
                    {conv.products.map((product, pIndex) => (
                      <Link 
                        key={pIndex} 
                        to={product.link} 
                        className="flex-shrink-0 bg-gray-100 rounded-lg p-2 flex items-center justify-between mr-2 sm:mr-0 sm:w-auto min-w-[200px] sm:min-w-0"
                      >
                        <span className="font-medium">{product.title}</span>
                        <ChevronRight size={20} className="ml-2 text-gray-500" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Answer and Video */}
                <div className="mb-4">
                  {renderVideo(conv.video, conv.videoLinks)}
                  {formatResponse(conv.text, conv.videoLinks)}
                </div>
                <div className="clear-both"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Bar for non-empty conversations */}
      {conversations.length > 0 && (
        <div className="p-4 bg-gray-100">
          <form onSubmit={handleSearch} className="flex items-center w-full max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask a question..."
              className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-spin">⌛</span>
              ) : (
                <Search size={20} />
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}