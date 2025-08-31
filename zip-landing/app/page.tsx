'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import TweetModal, { TweetModalData } from './components/TweetModal';
import { useTweetModalData } from './components/useTweetModalData';
import { useTutorialTrigger } from './components/tutorial/TutorialTrigger';

const influencers = [
  {
    username: "@VitalikButerin",
    displayName: "vitalik.eth",
    zipCount: "2,847 ZIPS",
    image: "/image12.jpg",
    tweetUrl: "https://x.com/vitalikbuterin/status/1953131251436818684?s=46",
    tweetText: "Proof of stake has fundamentally changed how we think about consensus mechanisms. The energy efficiency gains are massive, but the real innovation is in how it enables new economic models for blockchain applications.",
    timestamp: "2h"
  },
  {
    username: "@cz_binance", 
    displayName: "CZ 🔶BNB",
    zipCount: "1,923 ZIPS",
    image: "/image13.jpg",
    tweetUrl: "https://x.com/cz_binance/status/1929246168833229243?s=46",
    tweetText: "The future of finance isn't about replacing traditional systems entirely, but about creating bridges. When crypto becomes as easy to use as sending an email, we'll see true mass adoption.",
    timestamp: "4h"
  },
  {
    username: "@elonmusk",
    displayName: "Elon Musk", 
    zipCount: "1,456 ZIPS",
    image: "/image18.jpg",
    tweetUrl: "https://x.com/elonmusk/status/1396049547680391168?s=46",
    tweetText: "Dogecoin started as a joke, but it taught us something important: the best technology isn't always what wins. Sometimes it's about community, simplicity, and making things fun.",
    timestamp: "6h"
  }
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState<TweetModalData | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { generateTweetModalData } = useTweetModalData();
  const { triggerTutorialFromLanding } = useTutorialTrigger();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleTweetClick = (influencer: typeof influencers[0]) => {
    const tweetData = generateTweetModalData({
      username: influencer.username,
      displayName: influencer.displayName,
      image: influencer.image,
      tweetText: influencer.tweetText,
      tweetUrl: influencer.tweetUrl,
      timestamp: influencer.timestamp,
      zipCount: influencer.zipCount,
    });
    setModalData(tweetData);
    setModalIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-[#4a9b5f]/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-24">
            <div className={`text-2xl sm:text-3xl font-black tracking-tighter text-[#00ff44] relative transition-all duration-1000 ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <span className="relative z-10">ZIP ON PLASMA</span>
              <div className="absolute inset-0 text-[#00ff44] blur-sm opacity-50 animate-pulse">ZIP ON PLASMA</div>
            </div>
            {/* Desktop Navigation */}
            <div className={`hidden md:flex space-x-12 text-sm font-semibold transition-all duration-1000 delay-200 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              <a href="#" className="text-[#e7e9ea] hover:text-[#5fb574] transition-colors duration-200 relative group">
                ABOUT
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4a9b5f] transition-all duration-200 group-hover:w-full"></div>
              </a>
              <a href="#" className="text-[#e7e9ea] hover:text-[#5fb574] transition-colors duration-200 relative group">
                HOW IT WORKS
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4a9b5f] transition-all duration-200 group-hover:w-full"></div>
              </a>
              <a href="#" className="text-[#e7e9ea] hover:text-[#5fb574] transition-colors duration-200 relative group">
                DOCS
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4a9b5f] transition-all duration-200 group-hover:w-full"></div>
              </a>
              <a href="#" className="text-[#e7e9ea] hover:text-[#5fb574] transition-colors duration-200 relative group">
                CONTACT
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4a9b5f] transition-all duration-200 group-hover:w-full"></div>
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden w-10 h-10 rounded-lg bg-transparent border border-[#4a9b5f]/30 hover:border-[#5fb574] transition-all duration-300 flex items-center justify-center text-[#5fb574] ${
                isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}
              style={{ transitionDelay: isLoaded ? '200ms' : '0ms' }}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-24 right-6 left-6 bg-[#0f0f0f] border border-[#4a9b5f]/30 rounded-xl p-6 shadow-2xl">
            <div className="flex flex-col space-y-4 text-center">
              <a href="#" className="text-[#e7e9ea] hover:text-[#5fb574] transition-colors duration-200 py-3 text-lg font-semibold" onClick={() => setMobileMenuOpen(false)}>
                ABOUT
              </a>
              <div className="h-px bg-[#4a9b5f]/20" />
              <a href="#" className="text-[#e7e9ea] hover:text-[#5fb574] transition-colors duration-200 py-3 text-lg font-semibold" onClick={() => setMobileMenuOpen(false)}>
                HOW IT WORKS
              </a>
              <div className="h-px bg-[#4a9b5f]/20" />
              <a href="#" className="text-[#e7e9ea] hover:text-[#5fb574] transition-colors duration-200 py-3 text-lg font-semibold" onClick={() => setMobileMenuOpen(false)}>
                DOCS
              </a>
              <div className="h-px bg-[#4a9b5f]/20" />
              <a href="#" className="text-[#e7e9ea] hover:text-[#5fb574] transition-colors duration-200 py-3 text-lg font-semibold" onClick={() => setMobileMenuOpen(false)}>
                CONTACT
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="px-6 sm:px-8 lg:px-12 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h1 className={`text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-tight mb-12 text-[#e7e9ea] relative transition-all duration-1200 delay-300 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <span className="relative z-10">
                Zero-fee tips for <span className="italic underline decoration-[#00ff44] decoration-2 underline-offset-4">the social web</span>
              </span>
              <div className="absolute inset-0 text-[#00ff44] blur-md opacity-30 animate-pulse">
                Zero-fee tips for <span className="italic underline decoration-[#00ff44] decoration-2 underline-offset-4">the social web</span>
              </div>
            </h1>

          </div>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-8 items-center justify-center max-w-2xl mx-auto mt-16 transition-all duration-1000 delay-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <button 
              onClick={triggerTutorialFromLanding}
              className="group relative bg-[#4a9b5f] text-white px-12 py-5 text-lg font-semibold border border-[#4a9b5f]/20 rounded-2xl transition-all duration-300 hover:bg-[#5fb574] overflow-hidden w-full sm:w-auto min-w-[200px] inline-block text-center"
            >
              <span className="relative z-10">CONTINUE WITH 𝕏</span>
              <div className="absolute inset-0 border-2 border-[#00ff44] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="absolute inset-0 shadow-[0_0_20px_rgba(0,255,68,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </button>
            
            <button 
              onClick={triggerTutorialFromLanding}
              className="group relative bg-transparent text-[#e7e9ea] px-12 py-5 text-lg font-semibold border border-[#4a9b5f]/40 rounded-2xl transition-all duration-300 hover:border-[#5fb574] hover:text-[#5fb574] overflow-hidden w-full sm:w-auto min-w-[200px] inline-block text-center"
            >
              <span className="relative z-10">CONTINUE WITH WALLET</span>
              <div className="absolute inset-0 bg-[#4a9b5f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4a9b5f]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </section>

      {/* 24H Trending Section */}
      <section className="px-6 sm:px-8 lg:px-12 py-24 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-16 tracking-tight text-[#e7e9ea] relative transition-all duration-1000 delay-900 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <span className="relative z-10">24H TRENDING ZIPS LEADERBOARD</span>
            <div className="absolute inset-0 text-[#4a9b5f] blur-sm opacity-40">24H TRENDING ZIPS LEADERBOARD</div>
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {influencers.map((influencer, index) => {
              const position = index + 1;
              const isFirst = position === 1;
              const isSecond = position === 2;
              const isThird = position === 3;
              
              return (
                <div
                  key={index}
                  onClick={() => handleTweetClick(influencer)}
                  className={`group relative bg-[#0f0f0f] border rounded-xl transition-all duration-500 backdrop-blur-sm hover:scale-[1.01] sm:hover:scale-[1.02] cursor-pointer ${
                    isFirst ? 'border-[#00ff44]/60 shadow-[0_0_30px_rgba(0,255,68,0.2)]' :
                    isSecond ? 'border-[#4a9b5f]/50 shadow-[0_0_20px_rgba(74,155,95,0.15)]' :
                    isThird ? 'border-[#4a9b5f]/40 shadow-[0_0_15px_rgba(74,155,95,0.1)]' :
                    'border-[#4a9b5f]/20'
                  } ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
                  ${isFirst ? 'p-4 sm:p-8' : isSecond ? 'p-4 sm:p-6' : 'p-4 sm:p-5'}`}
                  style={{ 
                    transitionDelay: `${1100 + index * 200}ms` 
                  }}
                >
                  {/* Rank Badge */}
                  <div className="absolute -left-3 sm:-left-4 top-4 sm:top-1/2 sm:transform sm:-translate-y-1/2">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-black text-sm sm:text-lg border-2 sm:border-4 ${
                      isFirst ? 'bg-[#00ff44] text-black border-[#00ff44] shadow-[0_0_20px_rgba(0,255,68,0.6)] animate-pulse' :
                      isSecond ? 'bg-[#5fb574] text-white border-[#5fb574] shadow-[0_0_15px_rgba(95,181,116,0.4)]' :
                      isThird ? 'bg-[#4a9b5f] text-white border-[#4a9b5f] shadow-[0_0_10px_rgba(74,155,95,0.3)]' :
                      'bg-[#0f0f0f] text-[#71767b] border-[#4a9b5f]/30'
                    }`}>
                      #{position}
                    </div>
                  </div>

                  {/* Glowing background for top positions */}
                  <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isFirst ? 'bg-gradient-to-br from-[#00ff44]/10 to-transparent' :
                    isSecond ? 'bg-gradient-to-br from-[#5fb574]/8 to-transparent' :
                    'bg-gradient-to-br from-[#4a9b5f]/5 to-transparent'
                  }`}></div>
                  
                  <div className="relative z-10 pl-8 sm:pl-12">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left side - Profile and content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                          <div className={`rounded-full overflow-hidden border-2 transition-colors duration-300 ${
                            isFirst ? 'border-[#00ff44] w-12 h-12 sm:w-16 sm:h-16' :
                            isSecond ? 'border-[#5fb574] w-12 h-12 sm:w-14 sm:h-14' :
                            isThird ? 'border-[#4a9b5f] w-10 h-10 sm:w-12 sm:h-12' :
                            'border-[#4a9b5f]/40 w-10 h-10 sm:w-12 sm:h-12'
                          } group-hover:border-[#5fb574]`}>
                            <Image
                              src={influencer.image}
                              alt={influencer.displayName}
                              width={isFirst ? 64 : isSecond ? 56 : 48}
                              height={isFirst ? 64 : isSecond ? 56 : 48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className={`font-bold transition-colors duration-300 truncate ${
                              isFirst ? 'text-[#00ff44] text-base sm:text-lg' :
                              isSecond ? 'text-[#5fb574] text-sm sm:text-base' :
                              'text-[#e7e9ea] text-xs sm:text-sm'
                            } group-hover:text-[#5fb574]`}>
                              {influencer.displayName}
                            </div>
                            <div className="text-[#71767b] font-medium text-xs truncate">{influencer.username}</div>
                          </div>
                        </div>
                        
                        <div className="mb-3 sm:mb-4">
                          <p className={`text-[#e7e9ea] font-normal leading-relaxed ${
                            isFirst ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                          }`}>
                            &ldquo;{influencer.tweetText}&rdquo;
                          </p>
                        </div>
                      </div>
                      
                      {/* Right side - ZIP count */}
                      <div className="flex flex-col items-start lg:items-end">
                        <div className={`inline-flex items-center rounded-full px-3 sm:px-4 py-1.5 sm:py-2 font-black relative overflow-hidden transition-all duration-300 ${
                          isFirst ? 'bg-[#00ff44]/20 border-2 border-[#00ff44] text-[#00ff44] text-base sm:text-xl shadow-[0_0_15px_rgba(0,255,68,0.3)]' :
                          isSecond ? 'bg-[#5fb574]/20 border-2 border-[#5fb574] text-[#5fb574] text-sm sm:text-lg shadow-[0_0_10px_rgba(95,181,116,0.2)]' :
                          isThird ? 'bg-[#4a9b5f]/20 border-2 border-[#4a9b5f] text-[#5fb574] text-sm sm:text-base shadow-[0_0_8px_rgba(74,155,95,0.15)]' :
                          'bg-[#4a9b5f]/15 border border-[#4a9b5f]/30 text-[#5fb574] text-xs sm:text-sm'
                        } group-hover:border-[#5fb574] group-hover:shadow-[0_0_12px_rgba(95,181,116,0.3)]`}>
                          <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                            {isFirst && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#00ff44] rounded-full animate-ping"></span>}
                            {isSecond && <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#5fb574] rounded-full animate-pulse"></span>}
                            <span className="whitespace-nowrap">{influencer.zipCount}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f0f0f] border-t border-[#4a9b5f]/20 text-white px-6 sm:px-8 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className={`flex flex-col sm:flex-row items-center justify-between transition-all duration-1000 delay-[1700ms] ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="text-sm font-medium mb-8 sm:mb-0 text-[#71767b]">
              © 2025 ZIP ON PLASMA
            </div>
            
            <div className="flex gap-6">
              <a 
                href="#" 
                className="group relative w-10 h-10 bg-transparent border border-[#4a9b5f]/30 rounded-full hover:border-[#5fb574] transition-colors duration-300 flex items-center justify-center overflow-hidden"
              >
                <svg className="relative z-10 w-5 h-5 text-[#5fb574] group-hover:text-[#5fb574]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <div className="absolute inset-0 bg-[#4a9b5f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                <div className="absolute inset-0 shadow-[0_0_12px_rgba(74,155,95,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </a>
              <a 
                href="#" 
                className="group relative w-10 h-10 bg-transparent border border-[#4a9b5f]/30 rounded-full hover:border-[#5fb574] transition-colors duration-300 flex items-center justify-center overflow-hidden"
              >
                <svg className="relative z-10 w-5 h-5 text-[#5fb574]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
                <div className="absolute inset-0 bg-[#4a9b5f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                <div className="absolute inset-0 shadow-[0_0_12px_rgba(74,155,95,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </a>
              <a 
                href="#" 
                className="group relative w-10 h-10 bg-transparent border border-[#4a9b5f]/30 rounded-full hover:border-[#5fb574] transition-colors duration-300 flex items-center justify-center overflow-hidden"
              >
                <svg className="relative z-10 w-5 h-5 text-[#5fb574]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <div className="absolute inset-0 bg-[#4a9b5f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                <div className="absolute inset-0 shadow-[0_0_12px_rgba(74,155,95,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </a>
            </div>
          </div>
        </div>
      </footer>
      
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
