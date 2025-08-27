import { TweetModalData } from './TweetModal';

// Sample usernames and profile images from the existing data
const sampleUsers = [
  { username: "@VitalikButerin", displayName: "vitalik.eth", profileImage: "/image12.jpg" },
  { username: "@cz_binance", displayName: "CZ 🔶BNB", profileImage: "/image13.jpg" },
  { username: "@elonmusk", displayName: "Elon Musk", profileImage: "/image18.jpg" },
  { username: "@saylor", displayName: "Michael Saylor", profileImage: "/image19.jpg" },
  { username: "@brian_armstrong", displayName: "Brian Armstrong", profileImage: "/image14.png" },
  { username: "@blknoiz06", displayName: "Ansem", profileImage: "/image4.jpg" },
  { username: "@notthreadguy", displayName: "threadguy", profileImage: "/image20.jpg" },
  { username: "@cryptunez", displayName: "tunez (evm/acc)", profileImage: "/image16.jpg" },
  { username: "@waleswoosh", displayName: "wale.moca 🐋", profileImage: "/image1.jpg" },
  { username: "@mztacat", displayName: "〽️ᄃﾑt 🐾", profileImage: "/image2.jpg" },
  { username: "@zachxbt", displayName: "ZachXBT", profileImage: "/image6.jpg" },
  { username: "@sibeleth", displayName: "Sibel", profileImage: "/image8.jpg" },
  { username: "@beast_ico", displayName: "IcoBeast.eth", profileImage: "/image10.jpg" },
  { username: "@banditxbt", displayName: "banditxbt", profileImage: "/image9.jpg" },
  { username: "@binji_x", displayName: "binji", profileImage: "/image7.jpg" },
  { username: "@AlexOnchain", displayName: "Alex", profileImage: "/image17.jpg" },
  { username: "@stacy_muur", displayName: "Stacy Muur", profileImage: "/image11.jpg" },
  { username: "@Zun2025", displayName: "Zun", profileImage: "/image3.jpg" },
  { username: "@vohvohh", displayName: "voh", profileImage: "/image15.jpg" },
  { username: "@OxTochi", displayName: "OxTøchi🦧🔍", profileImage: "/image5.jpg" },
];

const timeOptions = ['1m', '2m', '5m', '12m', '23m', '1h', '2h', '3h', '4h', '6h', '8h', '12h', '1d', '2d'];

function generateRandomMetrics() {
  return {
    likes: Math.floor(Math.random() * 5000) + 100,
    retweets: Math.floor(Math.random() * 1500) + 50,
    replies: Math.floor(Math.random() * 800) + 20,
    comments: Math.floor(Math.random() * 400) + 10,
  };
}

function generateRandomZips(count: number) {
  const shuffledUsers = [...sampleUsers].sort(() => Math.random() - 0.5);
  const selectedUsers = shuffledUsers.slice(0, count);
  
  return selectedUsers.map((user) => ({
    user,
    amount: Math.floor(Math.random() * 50) + 1, // 1-50 ZIPS
    timestamp: timeOptions[Math.floor(Math.random() * timeOptions.length)] + ' ago',
  }));
}

export function generateTweetModalData(
  tweetData: {
    username: string;
    displayName: string;
    image: string;
    tweetText?: string;
    tweetUrl: string;
    timestamp: string;
    zipCount: string;
  }
): TweetModalData {
  // Extract numeric zip count
  const numericZipCount = parseInt(tweetData.zipCount.replace(/[^\d]/g, '')) || 0;
  
  // Generate random number of zippers (10-30 people)
  const zipperCount = Math.floor(Math.random() * 21) + 10;
  
  return {
    tweet: {
      id: Math.random().toString(36).substr(2, 9),
      content: tweetData.tweetText || "This is a sample tweet content for demonstration purposes.",
      author: {
        username: tweetData.username,
        displayName: tweetData.displayName,
        profileImage: tweetData.image,
      },
      metrics: generateRandomMetrics(),
      timestamp: tweetData.timestamp,
      url: tweetData.tweetUrl,
    },
    zips: generateRandomZips(zipperCount),
    totalZips: numericZipCount,
  };
}

export function useTweetModalData() {
  return { generateTweetModalData };
}