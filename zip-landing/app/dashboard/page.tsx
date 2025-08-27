'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import TweetModal, { TweetModalData } from '../components/TweetModal';
import { useTweetModalData } from '../components/useTweetModalData';
import TutorialTrigger from '../components/tutorial/TutorialTrigger';
import TutorialButton from '../components/tutorial/TutorialButton';

interface InfluencerData {
  username: string;
  displayName: string;
  zipCount: string;
  image: string;
  tweetUrl: string;
  trendPercentage: string;
  timestamp: string;
  tweetText?: string;
  zipCountNumeric?: number;
}

const influencersData: InfluencerData[] = [
  {
    username: "@VitalikButerin",
    displayName: "vitalik.eth",
    zipCount: "4,235",
    image: "/image12.jpg",
    tweetUrl: "https://x.com/vitalikbuterin/status/1953131251436818684?s=46",
    trendPercentage: "+23%",
    timestamp: "2h",
    tweetText: "Proof of stake has fundamentally changed how we think about consensus mechanisms. The energy efficiency gains are massive, but the real innovation is in how it enables new economic models for blockchain applications."
  },
  {
    username: "@cz_binance",
    displayName: "CZ 🔶BNB",
    zipCount: "3,891",
    image: "/image13.jpg", 
    tweetUrl: "https://x.com/cz_binance/status/1929246168833229243?s=46",
    trendPercentage: "+18%",
    timestamp: "4h",
    tweetText: "The future of finance isn't about replacing traditional systems entirely, but about creating bridges. When crypto becomes as easy to use as sending an email, we'll see true mass adoption."
  },
  {
    username: "@elonmusk",
    displayName: "Elon Musk",
    zipCount: "3,156",
    image: "/image18.jpg",
    tweetUrl: "https://x.com/elonmusk/status/1396049547680391168?s=46", 
    trendPercentage: "+31%",
    timestamp: "1h",
    tweetText: "Dogecoin started as a joke, but it taught us something important: the best technology isn't always what wins. Sometimes it's about community, simplicity, and making things fun."
  },
  {
    username: "@saylor",
    displayName: "Michael Saylor",
    zipCount: "2,847",
    image: "/image19.jpg",
    tweetUrl: "https://x.com/saylor/status/1307029562321231873?s=46",
    trendPercentage: "+15%",
    timestamp: "3h",
    tweetText: "Bitcoin isn't just digital gold, it's the monetary energy that will power the next century of human progress."
  },
  {
    username: "@brian_armstrong",
    displayName: "Brian Armstrong", 
    zipCount: "2,634",
    image: "/image14.png",
    tweetUrl: "https://x.com/brian_armstrong/status/1958259831577731159?s=46",
    trendPercentage: "+12%",
    timestamp: "5h",
    tweetText: "Building the infrastructure for the cryptoeconomy means thinking beyond today's use cases to what's possible tomorrow."
  },
  {
    username: "@blknoiz06",
    displayName: "Ansem",
    zipCount: "2,456",
    image: "/image4.jpg",
    tweetUrl: "https://x.com/blknoiz06/status/1944455894105747817?s=46",
    trendPercentage: "+28%",
    timestamp: "6h",
    tweetText: "Markets are driven by narrative, but sustained by fundamentals. The best plays understand both."
  },
  {
    username: "@notthreadguy",
    displayName: "threadguy",
    zipCount: "2,234",
    image: "/image20.jpg",
    tweetUrl: "https://x.com/notthreadguy/status/1939436644886818895?s=46",
    trendPercentage: "+19%",
    timestamp: "7h",
    tweetText: "Web3 social is finally reaching the tipping point where user experience matches user expectations."
  },
  {
    username: "@cryptunez",
    displayName: "tunez (evm/acc)",
    zipCount: "1,987",
    image: "/image16.jpg",
    tweetUrl: "https://x.com/cryptunez/status/1956440121034588409?s=46",
    trendPercentage: "+22%",
    timestamp: "8h",
    tweetText: "The EVM ecosystem continues to evolve at breakneck speed. L2s, L3s, and now application-specific chains are changing everything."
  },
  {
    username: "@waleswoosh",
    displayName: "wale.moca 🐋",
    zipCount: "1,876",
    image: "/image1.jpg",
    tweetUrl: "https://x.com/waleswoosh/status/1958491758867693878?s=46",
    trendPercentage: "+16%",
    timestamp: "9h",
    tweetText: "Gaming and DeFi convergence is creating entirely new economic models that didn't exist before crypto."
  },
  {
    username: "@mztacat",
    displayName: "〽️ᄃﾑt 🐾",
    zipCount: "1,743",
    image: "/image2.jpg",
    tweetUrl: "https://x.com/mztacat/status/1947363390403358792?s=46",
    trendPercentage: "+14%",
    timestamp: "10h",
    tweetText: "Sometimes the best alpha comes from the most unexpected places. Stay curious, stay humble."
  },
  {
    username: "@zachxbt",
    displayName: "ZachXBT",
    zipCount: "1,654",
    image: "/image6.jpg",
    tweetUrl: "https://x.com/zachxbt/status/1955613912201896113?s=46",
    trendPercentage: "+9%",
    timestamp: "11h",
    tweetText: "Transparency and accountability in crypto aren't just ideals - they're necessities for long-term success."
  },
  {
    username: "@sibeleth",
    displayName: "Sibel",
    zipCount: "1,567",
    image: "/image8.jpg",
    tweetUrl: "https://x.com/sibeleth/status/1953322514274287899?s=46",
    trendPercentage: "+11%",
    timestamp: "12h",
    tweetText: "The intersection of AI and blockchain is where the next wave of innovation will emerge."
  },
  {
    username: "@beast_ico",
    displayName: "IcoBeast.eth",
    zipCount: "1,432",
    image: "/image10.jpg",
    tweetUrl: "https://x.com/beast_ico/status/1958392453888721088?s=46",
    trendPercentage: "+17%",
    timestamp: "13h",
    tweetText: "ICO era taught us valuable lessons about token distribution and community building that still apply today."
  },
  {
    username: "@banditxbt",
    displayName: "banditxbt",
    zipCount: "1,345",
    image: "/image9.jpg",
    tweetUrl: "https://x.com/banditxbt/status/1958090441586274796?s=46",
    trendPercentage: "+13%",
    timestamp: "14h",
    tweetText: "Risk management in crypto isn't about avoiding risk - it's about understanding and pricing it correctly."
  },
  {
    username: "@binji_x",
    displayName: "binji",
    zipCount: "1,234",
    image: "/image7.jpg",
    tweetUrl: "https://x.com/binji_x/status/1958492204801855684?s=46",
    trendPercentage: "+8%",
    timestamp: "15h",
    tweetText: "Building in bear markets creates the strongest foundations for bull market success."
  },
  {
    username: "@AlexOnchain",
    displayName: "Alex",
    zipCount: "1,156",
    image: "/image17.jpg",
    tweetUrl: "https://x.com/alexonchain/status/1955678720313680166?s=46",
    trendPercentage: "+21%",
    timestamp: "16h",
    tweetText: "On-chain analysis reveals patterns that traditional metrics miss. The blockchain never lies."
  },
  {
    username: "@stacy_muur",
    displayName: "Stacy Muur",
    zipCount: "1,087",
    image: "/image11.jpg",
    tweetUrl: "https://x.com/stacy_muur/status/1958479967865696503?s=46",
    trendPercentage: "+25%",
    timestamp: "17h",
    tweetText: "User experience is the final frontier for crypto adoption. We need to make complex simple."
  },
  {
    username: "@Zun2025",
    displayName: "Zun",
    zipCount: "987",
    image: "/image3.jpg",
    tweetUrl: "https://x.com/zun2025/status/1958437433508274411?s=46",
    trendPercentage: "+6%",
    timestamp: "18h",
    tweetText: "2025 is shaping up to be the year where crypto infrastructure matures beyond early adoption."
  },
  {
    username: "@vohvohh",
    displayName: "voh",
    zipCount: "876",
    image: "/image15.jpg",
    tweetUrl: "https://x.com/vohvohh/status/1958534086290469155?s=46",
    trendPercentage: "+10%",
    timestamp: "19h",
    tweetText: "Sometimes the quietest builders make the loudest impact when their projects finally launch."
  },
  {
    username: "@OxTochi",
    displayName: "OxTøchi🦧🔍",
    zipCount: "754",
    image: "/image5.jpg",
    tweetUrl: "https://x.com/oxtochi/status/1958506334627803624?s=46",
    trendPercentage: "+4%",
    timestamp: "20h",
    tweetText: "Research and due diligence separate successful investors from the crowd. Always verify, never trust."
  }
];

type TabType = 'trending' | 'tweets' | 'accounts';
type TimeFilterType = '1h' | '4h' | '24h' | '7d';

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('trending');
  const [timeFilter, setTimeFilter] = useState<TimeFilterType>('24h');
  const [userWallet] = useState('scene ✩');
  const [userName] = useState('@scene999');
  const [isClient, setIsClient] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState<TweetModalData | null>(null);
  const { generateTweetModalData } = useTweetModalData();

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);


  const handleTweetClick = (influencer: InfluencerData) => {
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

  const getFilteredData = () => {
    // Only shuffle and randomize on client side to prevent hydration mismatch
    if (!isClient) {
      return influencersData.map(influencer => ({
        ...influencer,
        zipCount: influencer.zipCount
      }));
    }
    
    // Create a seed based on the time filter and tab for consistent randomization
    const filterSeed = timeFilter === '1h' ? 1 : timeFilter === '4h' ? 4 : timeFilter === '24h' ? 24 : 168;
    const tabSeed = activeTab === 'trending' ? 1 : activeTab === 'tweets' ? 2 : 3;
    
    // Generate different random data for each time filter and tab
    const processedData = influencersData.map((influencer, index) => {
      // Use filter seed + tab seed + index to generate consistent but different values per combination
      const seed = filterSeed * 1000 + tabSeed * 500 + index * 17;
      const pseudoRandom1 = (Math.sin(seed) * 10000) % 1;
      const pseudoRandom2 = (Math.sin(seed * 2) * 10000) % 1;
      const pseudoRandom3 = (Math.sin(seed * 3) * 10000) % 1;
      
      // Generate different ZIP counts based on tab type
      const baseCount = parseInt(influencer.zipCount.replace(',', ''));
      let newZipCount;
      
      if (activeTab === 'accounts') {
        // Most Zipped Accounts - higher cumulative counts (5k-10k+)
        const accountMultiplier = Math.abs(pseudoRandom1) * 3 + 2; // 2x to 5x multiplier
        newZipCount = Math.floor(baseCount * accountMultiplier);
        // Ensure minimum of 5k for accounts tab
        newZipCount = Math.max(newZipCount, 5000 + Math.floor(Math.abs(pseudoRandom1) * 5000));
      } else {
        // Trending and Tweets - normal ranges
        const variation = Math.abs(pseudoRandom1) * 0.8 + 0.6; // 0.6 to 1.4 multiplier
        newZipCount = Math.floor(baseCount * variation);
      }
      
      // Generate different trend percentages for each time filter
      const isPositive = Math.abs(pseudoRandom2) > 0.25; // 75% chance positive
      const trendValue = Math.floor(Math.abs(pseudoRandom3) * 35) + 1; // 1-35%
      const trendPercentage = isPositive ? `+${trendValue}%` : `-${trendValue}%`;
      
      return {
        ...influencer,
        zipCountNumeric: newZipCount,
        zipCount: newZipCount.toLocaleString(),
        trendPercentage
      };
    });
    
    // Shuffle the array differently for each time filter and tab
    const shuffled = [...processedData];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const seed = filterSeed * 100 + tabSeed * 50 + i * 7;
      const j = Math.floor(Math.abs(Math.sin(seed) * 10000) % (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Sort by ZIP count in descending order so ranks match ZIP counts
    return shuffled.sort((a, b) => b.zipCountNumeric - a.zipCountNumeric);
  };

  const renderTabContent = () => {
    const data = getFilteredData();
    
    return (
      <div className="space-y-4">
        {data.map((influencer, index) => {
          const position = index + 1;
          
          return (
            <div
              key={index}
              onClick={() => handleTweetClick(influencer)}
              className={`group relative bg-[#0f0f0f] border rounded-xl transition-all duration-300 hover:scale-[1.01] p-4 sm:p-6 cursor-pointer ${
                position === 1 ? 'border-[#00ff44]/60 shadow-[0_0_20px_rgba(0,255,68,0.1)]' :
                position === 2 ? 'border-[#4a9b5f]/50' :
                position === 3 ? 'border-[#4a9b5f]/40' :
                'border-[#4a9b5f]/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0 ${
                    position === 1 ? 'bg-[#00ff44] text-black' :
                    position === 2 ? 'bg-[#5fb574] text-white' :
                    position === 3 ? 'bg-[#4a9b5f] text-white' :
                    'bg-[#0f0f0f] text-[#71767b] border border-[#4a9b5f]/30'
                  }`}>
                    #{position}
                  </div>
                  
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#4a9b5f]/40 group-hover:border-[#5fb574] flex-shrink-0">
                      <Image
                        src={influencer.image}
                        alt={influencer.displayName}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-[#e7e9ea] text-xs sm:text-sm group-hover:text-[#5fb574] transition-colors duration-300 truncate">
                        {influencer.displayName}
                      </div>
                      <div className="text-[#71767b] text-xs truncate">{influencer.username}</div>
                    </div>
                  </div>
                </div>

                {activeTab === 'tweets' && influencer.tweetText && (
                  <div className="w-full sm:flex-1 sm:ml-6 order-last sm:order-none">
                    <p className="text-[#e7e9ea] text-xs sm:text-sm leading-relaxed line-clamp-2">
                      &ldquo;{influencer.tweetText}&rdquo;
                    </p>
                  </div>
                )}
                
                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className={`flex items-center gap-2 text-xs sm:text-sm font-semibold ${
                    (influencer.trendPercentage || '+0%').startsWith('+') ? 'text-[#5fb574]' : 'text-red-400'
                  }`}>
                    <span className={`w-0 h-0 border-l-[3px] sm:border-l-[4px] border-r-[3px] sm:border-r-[4px] border-l-transparent border-r-transparent ${
                      (influencer.trendPercentage || '+0%').startsWith('+') 
                        ? 'border-b-[5px] sm:border-b-[6px] border-b-[#5fb574]' 
                        : 'border-t-[5px] sm:border-t-[6px] border-t-red-400'
                    }`}></span>
                    {influencer.trendPercentage || '+0%'}
                  </div>
                  
                  <div className="bg-[#4a9b5f]/20 border border-[#4a9b5f]/30 text-[#5fb574] px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm group-hover:border-[#5fb574] transition-colors duration-300 whitespace-nowrap">
                    {influencer.zipCount} ZIPS
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-[#4a9b5f]/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className={`text-2xl font-black tracking-tighter text-[#00ff44] relative transition-all duration-1000 ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <span className="relative z-10">ZIP ON PLASMA</span>
              <div className="absolute inset-0 text-[#00ff44] blur-sm opacity-50 animate-pulse">ZIP ON PLASMA</div>
            </div>
            
            {/* Search Bar */}
            <div className={`flex flex-1 max-w-2xl mx-4 sm:mx-8 transition-all duration-1000 delay-300 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for an account or paste tweet link"
                  className="w-full bg-[#0f0f0f] border border-[#4a9b5f]/30 rounded-full pl-4 sm:pl-6 pr-10 sm:pr-12 py-2 sm:py-3 text-xs sm:text-sm text-[#e7e9ea] placeholder-[#71767b] focus:outline-none focus:border-[#5fb574] transition-colors duration-300"
                />
                <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-[#71767b] pointer-events-none">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* User Profile and Tutorial */}
            <div className="flex items-center gap-3">
              <TutorialButton variant="minimal" />
              <Link href="/profile" className={`flex items-center gap-2 sm:gap-4 transition-all duration-1000 delay-500 hover:opacity-75 ${
                isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#4a9b5f]/30 hover:border-[#5fb574] transition-colors duration-300">
                  <Image
                    src="/scene.jpg"
                    alt="scene profile"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-[#e7e9ea] text-sm font-semibold">{userWallet}</div>
                  <div className="text-[#71767b] text-xs">{userName}</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Tab Navigation */}
        <div className={`flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 transition-all duration-1000 delay-700 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6 lg:mb-0 w-full lg:w-auto" data-tutorial="tab-navigation">
            <button
              onClick={() => setActiveTab('trending')}
              className={`font-bold text-sm sm:text-lg transition-all duration-300 relative group text-left ${
                activeTab === 'trending' ? 'text-[#5fb574]' : 'text-[#71767b] hover:text-[#e7e9ea]'
              }`}
            >
              TRENDING
              <div className={`absolute -bottom-2 left-0 h-0.5 bg-[#5fb574] transition-all duration-300 ${
                activeTab === 'trending' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></div>
            </button>
            <button
              onClick={() => setActiveTab('tweets')}
              className={`font-bold text-sm sm:text-lg transition-all duration-300 relative group text-left ${
                activeTab === 'tweets' ? 'text-[#5fb574]' : 'text-[#71767b] hover:text-[#e7e9ea]'
              }`}
            >
              MOST ZIPPED TWEETS
              <div className={`absolute -bottom-2 left-0 h-0.5 bg-[#5fb574] transition-all duration-300 ${
                activeTab === 'tweets' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></div>
            </button>
            <button
              onClick={() => setActiveTab('accounts')}
              className={`font-bold text-sm sm:text-lg transition-all duration-300 relative group text-left ${
                activeTab === 'accounts' ? 'text-[#5fb574]' : 'text-[#71767b] hover:text-[#e7e9ea]'
              }`}
            >
              MOST ZIPPED ACCOUNTS
              <div className={`absolute -bottom-2 left-0 h-0.5 bg-[#5fb574] transition-all duration-300 ${
                activeTab === 'accounts' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></div>
            </button>
          </div>
          
          {/* Time Filters - Only show for trending tab */}
          {activeTab === 'trending' && (
            <div className="flex gap-2 flex-wrap" data-tutorial="time-filters">
              {(['1h', '4h', '24h', '7d'] as TimeFilterType[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${
                    timeFilter === filter
                      ? 'bg-[#5fb574] text-white'
                      : 'bg-[#4a9b5f]/20 text-[#5fb574] hover:bg-[#4a9b5f]/30'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`transition-all duration-500 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`} style={{ transitionDelay: '900ms' }}>
          {renderTabContent()}
        </div>
      </main>
      
      {/* Tutorial Trigger */}
      <TutorialTrigger autoStart={true} triggerPage="dashboard" />
      
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