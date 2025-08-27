'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

export interface TweetModalData {
  tweet: {
    id: string;
    content: string;
    author: {
      username: string;
      displayName: string;
      profileImage: string;
    };
    metrics: {
      likes: number;
      retweets: number;
      replies: number;
      comments: number;
    };
    timestamp: string;
    url: string;
  };
  zips: Array<{
    user: {
      username: string;
      displayName: string;
      profileImage: string;
    };
    amount: number;
    timestamp: string;
  }>;
  totalZips: number;
}

interface TweetModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TweetModalData;
}

type FilterType = 'latest' | 'highest';

export default function TweetModal({ isOpen, onClose, data }: TweetModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [filter, setFilter] = useState<FilterType>('latest');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, handleClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleExternalLink = () => {
    window.open(data.tweet.url, '_blank');
  };

  const handleDownloadCSV = () => {
    console.log('CSV download requested for tweet:', data.tweet.id);
    alert('CSV download feature - placeholder for prototype');
  };

  const getSortedZips = () => {
    const sortedZips = [...data.zips];
    if (filter === 'highest') {
      return sortedZips.sort((a, b) => b.amount - a.amount);
    }
    return sortedZips.sort((a, b) => {
      const timeA = parseInt(a.timestamp.replace(/[^\d]/g, ''));
      const timeB = parseInt(b.timestamp.replace(/[^\d]/g, ''));
      return timeA - timeB;
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (!mounted || !isOpen) {
    return null;
  }

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 transition-all duration-200 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* Mobile: Full Screen Modal */}
      <div className="block sm:hidden h-full">
        <div
          className={`relative bg-[#0f0f0f] w-full h-full overflow-hidden transition-all duration-200 ${
            isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
          role="dialog"
          aria-labelledby="tweet-modal-title"
          aria-modal="true"
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#4a9b5f]/20 bg-[#0f0f0f]/95 backdrop-blur-sm sticky top-0 z-20">
            <h2 className="text-lg font-bold text-[#e7e9ea]">Tweet Details</h2>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full bg-[#0f0f0f] border border-[#4a9b5f]/30 text-[#71767b] hover:text-[#e7e9ea] hover:border-[#5fb574] transition-colors duration-200 flex items-center justify-center"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto h-full pb-20">
            {/* Mobile Tweet Section */}
            <div className="p-4 border-b border-[#4a9b5f]/20">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#4a9b5f]/40 flex-shrink-0">
                  <Image
                    src={data.tweet.author.profileImage}
                    alt={data.tweet.author.displayName}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                      <h3 id="tweet-modal-title" className="font-bold text-[#e7e9ea] text-base">{data.tweet.author.displayName}</h3>
                      <div className="flex items-center gap-2 text-sm text-[#71767b]">
                        <span>{data.tweet.author.username}</span>
                        <span>•</span>
                        <span>{data.tweet.timestamp}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleExternalLink}
                      className="p-2 rounded-full hover:bg-[#4a9b5f]/20 transition-colors duration-200 text-[#71767b] hover:text-[#5fb574]"
                      title="View on X"
                      aria-label="View tweet on X"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>

                  <div className="mb-4">
                    <p className="text-[#e7e9ea] text-base leading-relaxed whitespace-pre-wrap">
                      {data.tweet.content}
                    </p>
                  </div>

                  {/* Mobile Engagement Metrics */}
                  <div className="grid grid-cols-4 gap-2">
                    <button className="flex flex-col items-center gap-1 py-2 hover:bg-[#5fb574]/10 rounded-lg transition-colors duration-200">
                      <svg className="w-5 h-5 text-[#71767b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-xs text-[#71767b]">{formatNumber(data.tweet.metrics.replies)}</span>
                    </button>

                    <button className="flex flex-col items-center gap-1 py-2 hover:bg-[#00ba7c]/10 rounded-lg transition-colors duration-200">
                      <svg className="w-5 h-5 text-[#71767b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span className="text-xs text-[#71767b]">{formatNumber(data.tweet.metrics.retweets)}</span>
                    </button>

                    <button className="flex flex-col items-center gap-1 py-2 hover:bg-[#f91880]/10 rounded-lg transition-colors duration-200">
                      <svg className="w-5 h-5 text-[#71767b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="text-xs text-[#71767b]">{formatNumber(data.tweet.metrics.likes)}</span>
                    </button>

                    <button className="flex flex-col items-center gap-1 py-2 hover:bg-[#5fb574]/10 rounded-lg transition-colors duration-200">
                      <svg className="w-5 h-5 text-[#71767b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Zips Section */}
            <div className="p-4">
              <div className="flex flex-col gap-4 mb-4">
                <h3 className="text-xl font-bold text-[#e7e9ea]">
                  Total Zips: <span className="text-[#5fb574]">{data.totalZips.toLocaleString()}</span>
                </h3>
                
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value as FilterType)}
                      className="bg-[#0f0f0f] border border-[#4a9b5f]/30 rounded-lg px-4 py-3 text-[#e7e9ea] text-sm focus:outline-none focus:border-[#5fb574] transition-colors duration-200 appearance-none pr-10 w-full"
                      aria-label="Filter zips"
                    >
                      <option value="latest">Latest Zips</option>
                      <option value="highest">Highest Amount</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-[#71767b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <button
                    onClick={handleDownloadCSV}
                    className="flex items-center gap-2 px-4 py-3 bg-[#4a9b5f]/20 border border-[#4a9b5f]/30 rounded-lg text-[#5fb574] hover:bg-[#4a9b5f]/30 hover:border-[#5fb574] transition-colors duration-200 text-sm"
                    aria-label="Download CSV file"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>CSV</span>
                  </button>
                </div>
              </div>

              {/* Mobile Zips List */}
              <div className="bg-[#0f0f0f] border border-[#4a9b5f]/20 rounded-xl overflow-hidden">
                <div className="overflow-y-auto max-h-96">
                  {getSortedZips().map((zip, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 hover:bg-[#4a9b5f]/5 transition-colors duration-200 ${
                        index !== data.zips.length - 1 ? 'border-b border-[#4a9b5f]/10' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#4a9b5f]/40 flex-shrink-0">
                          <Image
                            src={zip.user.profileImage}
                            alt={zip.user.displayName}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-[#e7e9ea] text-sm truncate">
                            {zip.user.displayName}
                          </div>
                          <div className="text-[#71767b] text-xs truncate">
                            {zip.user.username} • {zip.timestamp}
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#5fb574]/20 border border-[#5fb574]/30 text-[#5fb574] px-3 py-1 rounded-full font-bold text-sm whitespace-nowrap">
                        {zip.amount} ZIPS
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Centered Modal */}
      <div className="hidden sm:flex items-center justify-center p-4 h-full">
        <div
          className={`relative bg-[#0f0f0f] border border-[#4a9b5f]/30 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden transition-all duration-200 ${
            isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          role="dialog"
          aria-labelledby="tweet-modal-title-desktop"
          aria-modal="true"
        >
          {/* Desktop Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#0f0f0f] border border-[#4a9b5f]/30 text-[#71767b] hover:text-[#e7e9ea] hover:border-[#5fb574] transition-colors duration-200 flex items-center justify-center shadow-lg"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="overflow-y-auto max-h-[90vh]">
            {/* Desktop Tweet Section */}
            <div className="p-6 border-b border-[#4a9b5f]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#4a9b5f]/40 flex-shrink-0">
                  <Image
                    src={data.tweet.author.profileImage}
                    alt={data.tweet.author.displayName}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex flex-col gap-1 min-w-0 flex-1 mr-4">
                      <h3 id="tweet-modal-title-desktop" className="font-bold text-[#e7e9ea] text-lg">{data.tweet.author.displayName}</h3>
                      <div className="flex items-center gap-2 text-sm text-[#71767b]">
                        <span>{data.tweet.author.username}</span>
                        <span>•</span>
                        <span>{data.tweet.timestamp}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleExternalLink}
                      className="p-2 rounded-full hover:bg-[#4a9b5f]/20 transition-colors duration-200 text-[#71767b] hover:text-[#5fb574] flex-shrink-0"
                      title="View on X"
                      aria-label="View tweet on X"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>

                  <div className="mb-4">
                    <p className="text-[#e7e9ea] text-lg leading-relaxed whitespace-pre-wrap">
                      {data.tweet.content}
                    </p>
                  </div>

                  {/* Desktop Engagement Metrics */}
                  <div className="flex items-center gap-6 text-[#71767b]">
                    <button className="flex items-center gap-2 hover:text-[#5fb574] transition-colors duration-200 group">
                      <div className="p-2 rounded-full group-hover:bg-[#5fb574]/10 transition-colors duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <span className="text-sm">{formatNumber(data.tweet.metrics.replies)}</span>
                    </button>

                    <button className="flex items-center gap-2 hover:text-[#00ba7c] transition-colors duration-200 group">
                      <div className="p-2 rounded-full group-hover:bg-[#00ba7c]/10 transition-colors duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <span className="text-sm">{formatNumber(data.tweet.metrics.retweets)}</span>
                    </button>

                    <button className="flex items-center gap-2 hover:text-[#f91880] transition-colors duration-200 group">
                      <div className="p-2 rounded-full group-hover:bg-[#f91880]/10 transition-colors duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <span className="text-sm">{formatNumber(data.tweet.metrics.likes)}</span>
                    </button>

                    <button className="flex items-center gap-2 hover:text-[#5fb574] transition-colors duration-200 group">
                      <div className="p-2 rounded-full group-hover:bg-[#5fb574]/10 transition-colors duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Zips Section */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#e7e9ea]">
                  Total Zips: <span className="text-[#5fb574]">{data.totalZips.toLocaleString()}</span>
                </h3>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value as FilterType)}
                      className="bg-[#0f0f0f] border border-[#4a9b5f]/30 rounded-lg px-4 py-2 text-[#e7e9ea] text-sm focus:outline-none focus:border-[#5fb574] transition-colors duration-200 appearance-none pr-8"
                      aria-label="Filter zips"
                    >
                      <option value="latest">Latest Zips</option>
                      <option value="highest">Highest Amount</option>
                    </select>
                    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-[#71767b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <button
                    onClick={handleDownloadCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-[#4a9b5f]/20 border border-[#4a9b5f]/30 rounded-lg text-[#5fb574] hover:bg-[#4a9b5f]/30 hover:border-[#5fb574] transition-colors duration-200 text-sm"
                    aria-label="Download CSV file"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download CSV
                  </button>
                </div>
              </div>

              {/* Desktop Zips List */}
              <div className="bg-[#0f0f0f] border border-[#4a9b5f]/20 rounded-xl overflow-hidden">
                <div className="max-h-80 overflow-y-auto">
                  {getSortedZips().map((zip, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 hover:bg-[#4a9b5f]/5 transition-colors duration-200 ${
                        index !== data.zips.length - 1 ? 'border-b border-[#4a9b5f]/10' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#4a9b5f]/40 flex-shrink-0">
                          <Image
                            src={zip.user.profileImage}
                            alt={zip.user.displayName}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-[#e7e9ea] text-sm truncate">
                            {zip.user.displayName}
                          </div>
                          <div className="text-[#71767b] text-xs truncate">
                            {zip.user.username}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="bg-[#5fb574]/20 border border-[#5fb574]/30 text-[#5fb574] px-3 py-1 rounded-full font-bold text-sm whitespace-nowrap">
                          {zip.amount} ZIPS
                        </div>
                        
                        <div className="text-[#71767b] text-xs whitespace-nowrap">
                          {zip.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}