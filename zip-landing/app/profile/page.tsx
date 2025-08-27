'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import TweetModal, { TweetModalData } from '../components/TweetModal';
import { useTweetModalData } from '../components/useTweetModalData';
import TutorialTrigger from '../components/tutorial/TutorialTrigger';
import TutorialButton from '../components/tutorial/TutorialButton';

// Scene's tweet data created from existing influencer patterns
const sceneTopZips = [
  {
    text: "The convergence of AI and Web3 is creating unprecedented opportunities for creators to monetize their content in ways we never imagined before.",
    zipCount: "1,847",
    timestamp: "2h ago",
    url: "https://x.com/scene999/status/1234567890"
  },
  {
    text: "Building sustainable crypto communities isn't just about technology—it's about fostering genuine connections and shared value creation.",
    zipCount: "1,234",
    timestamp: "6h ago", 
    url: "https://x.com/scene999/status/1234567891"
  },
  {
    text: "The future of decentralized finance lies in making complex protocols accessible to everyday users through intuitive interfaces.",
    zipCount: "987",
    timestamp: "1d ago",
    url: "https://x.com/scene999/status/1234567892"
  }
];

const sceneLatestPosts = [
  {
    text: "Just discovered a fascinating pattern in on-chain data that could predict the next wave of DeFi innovation...",
    zipCount: "234",
    timestamp: "3h ago"
  },
  {
    text: "The beauty of permissionless protocols is that innovation happens at the edges, where traditional finance fears to tread.",
    zipCount: "156",
    timestamp: "8h ago"
  },
  {
    text: "Crypto Twitter's energy today is unmatched. The builders are building, the traders are trading, and the vibes are immaculate ✨",
    zipCount: "89",
    timestamp: "12h ago"
  },
  {
    text: "Sometimes the best investment strategy is simply paying attention to what the smartest people in the space are actually building.",
    zipCount: "67",
    timestamp: "1d ago"
  },
  {
    text: "Web3 social platforms are finally reaching the tipping point where user experience matches user expectations. Exciting times ahead.",
    zipCount: "45",
    timestamp: "2d ago"
  }
];

export default function Profile() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState<TweetModalData | null>(null);
  const { generateTweetModalData } = useTweetModalData();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleTopZipClick = (zip: typeof sceneTopZips[0]) => {
    const tweetData = generateTweetModalData({
      username: '@scene999',
      displayName: 'scene ✩',
      image: '/scene.jpg',
      tweetText: zip.text,
      tweetUrl: zip.url,
      timestamp: zip.timestamp,
      zipCount: zip.zipCount + ' ZIPS',
    });
    setModalData(tweetData);
    setModalIsOpen(true);
  };

  const handleLatestPostClick = (post: typeof sceneLatestPosts[0]) => {
    const tweetData = generateTweetModalData({
      username: '@scene999',
      displayName: 'scene ✩',
      image: '/scene.jpg',
      tweetText: post.text,
      tweetUrl: 'https://x.com/scene999/status/1234567890',
      timestamp: post.timestamp,
      zipCount: post.zipCount + ' ZIPS',
    });
    setModalData(tweetData);
    setModalIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-[#4a9b5f]/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/dashboard" className={`text-2xl font-black tracking-tighter text-[#00ff44] relative transition-all duration-1000 hover:opacity-75 ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <span className="relative z-10">ZIP ON PLASMA</span>
              <div className="absolute inset-0 text-[#00ff44] blur-sm opacity-50 animate-pulse">ZIP ON PLASMA</div>
            </Link>
            
            {/* Navigation Actions */}
            <div className={`flex items-center gap-3 transition-all duration-1000 delay-300 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              {/* Tutorial Button */}
              <TutorialButton variant="minimal" />
              
              {/* Back to Dashboard */}
              <Link href="/dashboard" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#4a9b5f]/20 border border-[#4a9b5f]/30 rounded-lg text-[#5fb574] hover:bg-[#4a9b5f]/30 hover:border-[#5fb574] transition-colors duration-200 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Dashboard
              </Link>
              
              {/* Mobile Back Button */}
              <Link href="/dashboard" className="sm:hidden w-10 h-10 bg-transparent border border-[#4a9b5f]/30 rounded-full hover:border-[#5fb574] transition-colors duration-300 flex items-center justify-center text-[#5fb574]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              
              {/* Search Icon */}
              <button className="w-10 h-10 bg-transparent border border-[#4a9b5f]/30 rounded-full hover:border-[#5fb574] transition-colors duration-300 flex items-center justify-center text-[#5fb574]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Profile & Top Zips */}
          <div className="space-y-8">
            {/* Profile Section */}
            <div className={`bg-[#0f0f0f] border border-[#4a9b5f]/20 rounded-2xl p-6 sm:p-8 transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} data-tutorial="profile-overview">
              <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
                {/* Profile Picture */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-[#5fb574] shadow-[0_0_20px_rgba(95,181,116,0.3)]">
                  <Image
                    src="/scene.jpg"
                    alt="scene profile"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* User Info */}
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#e7e9ea] mb-2">scene ✩</h1>
                  <p className="text-[#71767b] text-base sm:text-lg">@scene999</p>
                </div>
              </div>
            </div>

            {/* Earnings Section - Separate for tutorial targeting */}
            <div className={`bg-[#0f0f0f] border border-[#4a9b5f]/20 rounded-2xl p-6 sm:p-8 transition-all duration-1000 delay-200 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} data-tutorial="earnings-display">
              <div className="text-center">
                <h3 className="text-lg font-bold text-[#e7e9ea] mb-4">Your Earnings</h3>
                <div className="bg-[#4a9b5f]/10 border border-[#4a9b5f]/30 rounded-xl p-4 sm:p-6 mb-6">
                  <p className="text-[#71767b] text-sm mb-2">Total Earnings</p>
                  <p className="text-2xl sm:text-3xl font-black text-[#5fb574]">
                    6,942 ZIPS <span className="text-lg sm:text-xl text-[#e7e9ea]">($6,940)</span>
                  </p>
                </div>
                
                {/* Claim Button */}
                <button className="group relative bg-[#5fb574] text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:bg-[#4a9b5f] overflow-hidden w-full" data-tutorial="claim-button">
                  <span className="relative z-10">Claim Earnings</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <div className="absolute inset-0 shadow-[0_0_20px_rgba(95,181,116,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </button>
              </div>
            </div>

            {/* Top Zips Section */}
            <div className={`transition-all duration-1000 delay-300 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} data-tutorial="top-zips">
              <h2 className="text-2xl font-bold text-[#e7e9ea] mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-[#5fb574] rounded-full"></span>
                Top Zips
              </h2>
              
              <div className="space-y-4">
                {sceneTopZips.map((zip, index) => (
                  <div
                    key={index}
                    onClick={() => handleTopZipClick(zip)}
                    className="group bg-[#0f0f0f] border border-[#4a9b5f]/20 rounded-xl p-6 hover:border-[#5fb574]/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="flex-1 min-w-0 w-full sm:w-auto">
                        <p className="text-[#e7e9ea] text-sm leading-relaxed mb-3">
                          &ldquo;{zip.text}&rdquo;
                        </p>
                        <div className="flex items-center gap-3 text-xs text-[#71767b]">
                          <span>{zip.timestamp}</span>
                          <span>•</span>
                          <a href={zip.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#5fb574] transition-colors">
                            View Tweet
                          </a>
                        </div>
                      </div>
                      <div className="bg-[#5fb574]/20 border border-[#5fb574]/30 text-[#5fb574] px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm group-hover:border-[#5fb574] transition-colors duration-300 self-start whitespace-nowrap">
                        {zip.zipCount} ZIPS
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Latest Posts */}
          <div className={`transition-all duration-1000 delay-500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} data-tutorial="latest-posts">
            <h2 className="text-2xl font-bold text-[#e7e9ea] mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#5fb574] rounded-full"></span>
              Your Latest Posts
            </h2>
            
            <div className="bg-[#0f0f0f] border border-[#4a9b5f]/20 rounded-2xl overflow-hidden">
              <div className="space-y-0">
                {sceneLatestPosts.map((post, index) => (
                  <div
                    key={index}
                    onClick={() => handleLatestPostClick(post)}
                    className={`group p-6 hover:bg-[#4a9b5f]/5 transition-colors duration-300 cursor-pointer ${
                      index !== sceneLatestPosts.length - 1 ? 'border-b border-[#4a9b5f]/20' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-[#e7e9ea] text-sm leading-relaxed mb-3 line-clamp-2">
                          {post.text}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#71767b]">{post.timestamp}</span>
                          <div className="bg-[#4a9b5f]/20 border border-[#4a9b5f]/30 text-[#5fb574] px-2 sm:px-3 py-1 rounded-full font-bold text-xs group-hover:border-[#5fb574] transition-colors duration-300 whitespace-nowrap">
                            {post.zipCount} zips
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* View All Posts Button */}
            <div className="mt-6 text-center">
              <button className="group text-[#5fb574] hover:text-[#4a9b5f] font-semibold text-sm transition-colors duration-300 flex items-center gap-2 mx-auto">
                <span>View All Posts</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Tutorial Trigger */}
      <TutorialTrigger autoStart={false} triggerPage="profile" />
      
      {/* Tweet Modal */}
      {modalData && (
        <TweetModal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          data={modalData}
        />
      )}
    </div>
  );
}