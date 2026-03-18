// Mock Data for Testing Frontend-Backend Connection
// Used when MongoDB is not available

const mockNews = [
  {
    _id: "1",
    emoji: "🤖",
    title: "OpenAI Releases GPT-5 with Reasoning",
    excerpt: "New model shows significant improvements in complex problem-solving...",
    fullContent: "OpenAI has announced GPT-5, their latest language model with advanced reasoning capabilities. The model demonstrates improved performance on complex tasks and programming challenges.",
    category: "LLM",
    date: new Date("2026-03-15"),
    author: "AI News Team",
    imageUrl: "https://via.placeholder.com/300x200?text=GPT-5",
    views: 1250,
    featured: true
  },
  {
    _id: "2",
    emoji: "🧠",
    title: "DeepMind's AlphaFold 3 Breakthrough",
    excerpt: "Revolutionary protein structure prediction with 99.2% accuracy...",
    fullContent: "DeepMind researchers unveiled AlphaFold 3, achieving unprecedented accuracy in predicting protein structures. This advancement has major implications for drug discovery and biological research.",
    category: "Research",
    date: new Date("2026-03-14"),
    author: "AI News Team",
    imageUrl: "https://via.placeholder.com/300x200?text=AlphaFold",
    views: 980,
    featured: true
  },
  {
    _id: "3",
    emoji: "🎨",
    title: "DALL-E 4 Unveiled with Real-time Generation",
    excerpt: "Image generation now happens in milliseconds with photorealistic quality...",
    fullContent: "OpenAI announced DALL-E 4 with real-time generation capabilities and improved understanding of complex prompts. Users report remarkable improvements in output quality and coherence.",
    category: "Vision",
    date: new Date("2026-03-13"),
    author: "AI News Team",
    imageUrl: "https://via.placeholder.com/300x200?text=DALL-E",
    views: 2100,
    featured: true
  },
  {
    _id: "4",
    emoji: "⚡",
    title: "Google Quantized LLMs Cut Inference Time by 70%",
    excerpt: "New approach enables faster AI models without quality loss...",
    fullContent: "Google released new quantization techniques that reduce model size and inference time while maintaining performance. This enables more efficient deployment on edge devices.",
    category: "Optimization",
    date: new Date("2026-03-12"),
    author: "AI News Team",
    imageUrl: "https://via.placeholder.com/300x200?text=Quantization",
    views: 650,
    featured: false
  },
  {
    _id: "5",
    emoji: "⚖️",
    title: "New AI Ethics Framework for Enterprise",
    excerpt: "Organizations now have clearer guidelines for responsible AI deployment...",
    fullContent: "Industry leaders released a comprehensive ethics framework for deploying AI in enterprise settings. The framework covers bias detection, fairness auditing, and accountability measures.",
    category: "Ethics",
    date: new Date("2026-03-11"),
    author: "AI News Team",
    imageUrl: "https://via.placeholder.com/300x200?text=Ethics",
    views: 450,
    featured: false
  },
  {
    _id: "6",
    emoji: "🛠️",
    title: "10 Best AI Tools for Content Creators",
    excerpt: "Tools and platforms revolutionizing content creation workflows...",
    fullContent: "A comprehensive guide to the best AI tools available for content creators. From video editing to copywriting, these tools will transform your creative process.",
    category: "Tools",
    date: new Date("2026-03-10"),
    author: "AI News Team",
    imageUrl: "https://via.placeholder.com/300x200?text=Tools",
    views: 1850,
    featured: true
  }
];

const mockTools = [
  {
    _id: "1",
    icon: "🤖",
    name: "ChatGPT",
    description: "Advanced conversational AI for writing, coding, and analysis",
    link: "https://chat.openai.com",
    category: "LLM",
    rating: 4.9,
    featured: true
  },
  {
    _id: "2",
    icon: "🎨",
    name: "DALL-E 4",
    description: "Generate stunning images from text descriptions",
    link: "https://openai.com/dall-e",
    category: "Vision",
    rating: 4.8,
    featured: true
  },
  {
    _id: "3",
    icon: "💻",
    name: "GitHub Copilot",
    description: "AI-powered code completion and generation",
    link: "https://github.com/features/copilot",
    category: "Tools",
    rating: 4.7,
    featured: true
  },
  {
    _id: "4",
    icon: "🔍",
    name: "Perplexity AI",
    description: "Search engine with AI reasoning and multi-source synthesis",
    link: "https://www.perplexity.ai",
    category: "Research",
    rating: 4.6,
    featured: false
  },
  {
    _id: "5",
    icon: "🎬",
    name: "Midjourney",
    description: "Powerful AI art generation with stunning consistency",
    link: "https://www.midjourney.com",
    category: "Vision",
    rating: 4.5,
    featured: false
  },
  {
    _id: "6",
    icon: "📹",
    name: "Synthesia",
    description: "Create AI avatars and videos from text",
    link: "https://www.synthesia.io",
    category: "Tools",
    rating: 4.5,
    featured: false
  }
];

module.exports = {
  mockNews,
  mockTools
};
