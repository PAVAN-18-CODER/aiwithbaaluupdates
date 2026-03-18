const mongoose = require('mongoose');
require('dotenv').config();

const News = require('./models/News');
const Tool = require('./models/Tool');

const newsData = [
  {
    emoji: '🧠',
    title: 'OpenAI Releases GPT-5',
    excerpt: 'Revolutionary new AI model with improved reasoning and understanding capabilities.',
    date: new Date(),
    category: 'LLM',
    fullContent: 'OpenAI has officially announced GPT-5, the latest iteration in their language model series. This breakthrough model features significantly improved reasoning capabilities, better context understanding, and reduced hallucinations. Available for researchers and enterprise clients starting next month.',
    featured: true
  },
  {
    emoji: '🤖',
    title: 'Google DeepMind Breakthrough',
    excerpt: 'New AI system achieves superhuman performance in scientific discovery.',
    date: new Date(Date.now() - 86400000),
    category: 'Research',
    fullContent: 'Google DeepMind has unveiled AlphaDiscover, an AI system that has already contributed to 10 new scientific breakthroughs in protein folding and molecular research. The system can analyze complex patterns that human researchers might miss.',
    featured: true
  },
  {
    emoji: '🎨',
    title: 'Text-to-Image Models Evolve',
    excerpt: 'Latest DALL-E update produces photorealistic images with fine details.',
    date: new Date(Date.now() - 172800000),
    category: 'Vision',
    fullContent: 'DALL-E 4 has been released with significantly improved photorealism and fine detail rendering. The new model can now understand complex spatial relationships and generate consistent object interactions within a single image.',
    featured: false
  },
  {
    emoji: '⚡',
    title: 'Efficient AI Models Rise',
    excerpt: 'New tiny language models challenge larger competitors in speed and efficiency.',
    date: new Date(Date.now() - 259200000),
    category: 'Optimization',
    fullContent: 'A new wave of ultra-efficient language models is showing that you don\'t need billions of parameters for excellent performance. These models run on edge devices and are becoming the standard for mobile AI applications.',
    featured: false
  },
  {
    emoji: '🔒',
    title: 'AI Safety Standards Announced',
    excerpt: 'Industry adopts new guidelines for responsible AI development and deployment.',
    date: new Date(Date.now() - 345600000),
    category: 'Ethics',
    fullContent: 'The Global AI Alliance has released comprehensive safety and ethics guidelines for AI development. These standards are now being adopted by major tech companies and will shape the future of responsible AI.',
    featured: false
  },
  {
    emoji: '💻',
    title: 'AI Coding Assistants Level Up',
    excerpt: 'Latest version of GitHub Copilot now understands context across entire codebases.',
    date: new Date(Date.now() - 432000000),
    category: 'Tools',
    fullContent: 'GitHub Copilot now features whole-codebase understanding, allowing it to provide suggestions based on your entire project context. This significantly improves code quality and reduces bugs in production environments.',
    featured: false
  }
];

const toolsData = [
  {
    icon: '🤖',
    name: 'ChatGPT',
    description: 'Advanced conversational AI for any task',
    link: 'https://chatgpt.com',
    featured: true
  },
  {
    icon: '🎨',
    name: 'DALL-E 3',
    description: 'Create stunning images from text descriptions',
    link: 'https://openai.com/dall-e-3',
    featured: true
  },
  {
    icon: '💻',
    name: 'GitHub Copilot',
    description: 'AI-powered code completion and generation',
    link: 'https://github.com/features/copilot',
    featured: true
  },
  {
    icon: '🔍',
    name: 'Perplexity AI',
    description: 'Search engine powered by AI',
    link: 'https://www.perplexity.ai',
    featured: false
  },
  {
    icon: '📊',
    name: 'MidJourney',
    description: 'Professional AI art generation',
    link: 'https://www.midjourney.com',
    featured: false
  },
  {
    icon: '🎬',
    name: 'Synthesia',
    description: 'Create AI videos with avatars',
    link: 'https://www.synthesia.io',
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-news-db';
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await News.deleteMany({});
    await Tool.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert news
    const insertedNews = await News.insertMany(newsData);
    console.log(`✅ Inserted ${insertedNews.length} news articles`);

    // Insert tools
    const insertedTools = await Tool.insertMany(toolsData);
    console.log(`✅ Inserted ${insertedTools.length} tools`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nSample endpoints to test:');
    console.log('GET http://localhost:3000/api/news');
    console.log('GET http://localhost:3000/api/tools');
    console.log('GET http://localhost:3000/api/health');

    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
