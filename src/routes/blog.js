const express = require('express');
const router = express.Router();

// Mock data for blog posts
const mockBlogPosts = [
  {
    id: 'post-001',
    title: '10 Eco-Friendly Destinations for Sustainable Travel',
    slug: '10-eco-friendly-destinations-sustainable-travel',
    excerpt: 'Discover beautiful destinations around the world that are leading the way in sustainable tourism practices.',
    content: `<p>As travelers become more conscious of their environmental impact, eco-friendly destinations are gaining popularity. Here are 10 destinations that offer amazing experiences while prioritizing sustainability.</p>
    <h2>1. Costa Rica</h2>
    <p>Costa Rica has long been a pioneer in eco-tourism, with over 25% of its land protected as national parks or reserves. The country runs on nearly 100% renewable energy and aims to be carbon-neutral.</p>
    <h2>2. Slovenia</h2>
    <p>Slovenia's capital, Ljubljana, was named the European Green Capital, and the country has committed to sustainable tourism through its Slovenia Green certification program.</p>
    <h2>3. Palau</h2>
    <p>This island nation requires visitors to sign an eco-pledge upon entry, promising to act in an environmentally responsible way during their stay.</p>`,
    author: {
      name: 'Emma Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    category: 'Sustainable Travel',
    tags: ['eco-friendly', 'sustainable', 'green travel'],
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
    published_at: '2023-04-22T10:30:00Z',
    read_time: '8 min'
  },
  {
    id: 'post-002',
    title: 'How to Pack Light: Essential Tips for Minimalist Travel',
    slug: 'how-to-pack-light-essential-tips-minimalist-travel',
    excerpt: 'Learn how to travel with just a carry-on, even for extended trips. These packing strategies will change how you travel forever.',
    content: `<p>Traveling light isn't just about saving on baggage fees—it's about freedom and flexibility. Here's how to master the art of minimalist packing.</p>
    <h2>Start with the Right Bag</h2>
    <p>Invest in a quality carry-on that maximizes the allowed dimensions for your frequent airlines. Look for one with thoughtful organization features and durable materials.</p>
    <h2>The 5-4-3-2-1 Rule</h2>
    <p>For a one-week trip, pack no more than: 5 pairs of socks/underwear, 4 tops, 3 bottoms, 2 pairs of shoes, and 1 jacket. Adjust slightly for longer trips, but remember you can wash clothes while traveling.</p>
    <h2>Wear Your Bulkiest Items</h2>
    <p>Always wear your heaviest shoes and jacket on travel days to save valuable luggage space.</p>`,
    author: {
      name: 'Marcus Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    category: 'Travel Tips',
    tags: ['packing', 'minimalist', 'travel hacks'],
    image: 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd',
    published_at: '2023-05-10T14:15:00Z',
    read_time: '6 min'
  },
  {
    id: 'post-003',
    title: 'The Ultimate Guide to Japanese Cuisine: Beyond Sushi',
    slug: 'ultimate-guide-japanese-cuisine-beyond-sushi',
    excerpt: 'Explore the rich diversity of Japanese food culture and discover lesser-known regional specialties worth traveling for.',
    content: `<p>Japanese cuisine is so much more than just sushi and ramen. Each region of Japan offers unique culinary traditions that reflect local ingredients and cultural history.</p>
    <h2>Osaka: Japan's Kitchen</h2>
    <p>Known as "tenka no daidokoro" (the nation's kitchen), Osaka is famous for street foods like takoyaki (octopus balls) and okonomiyaki (savory pancakes).</p>
    <h2>Hokkaido: Seafood Paradise</h2>
    <p>Japan's northernmost island is renowned for the freshest seafood, including uni (sea urchin), king crab, and scallops. Don't miss the miso ramen, which was invented here to combat the cold winters.</p>
    <h2>Kyoto: Imperial Cuisine</h2>
    <p>Kyoto's kaiseki ryori is the height of Japanese culinary refinement—a multi-course meal that emphasizes seasonal ingredients, artistic presentation, and balance of flavors.</p>`,
    author: {
      name: 'Naomi Tanaka',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
    },
    category: 'Food & Culture',
    tags: ['japan', 'food', 'culinary travel'],
    image: 'https://images.unsplash.com/photo-1535007813616-79dc02ba4021',
    published_at: '2023-06-05T09:20:00Z',
    read_time: '10 min'
  },
  {
    id: 'post-004',
    title: 'Bali Adventure: Exploring the Island of Gods',
    slug: 'bali-adventure',
    excerpt: 'Discover the magical island of Bali with its stunning beaches, lush rice terraces, and vibrant culture.',
    content: `<p>Bali, known as the Island of Gods, offers a perfect blend of natural beauty, rich culture, and adventure opportunities for travelers.</p>
    <h2>Sacred Temples</h2>
    <p>Explore ancient temples like Uluwatu and Tanah Lot that showcase Bali's spiritual heritage and offer breathtaking ocean views.</p>
    <h2>Rice Terraces</h2>
    <p>The emerald-green rice paddies of Tegallalang demonstrate the traditional Balinese cooperative irrigation system known as subak.</p>
    <h2>Beach Paradise</h2>
    <p>From the popular shores of Kuta to the hidden coves of Uluwatu, Bali's beaches offer something for every type of traveler.</p>`,
    author: {
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/34.jpg'
    },
    category: 'Adventure Travel',
    tags: ['bali', 'indonesia', 'adventure', 'culture'],
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    published_at: '2023-07-05T08:45:00Z',
    read_time: '7 min'
  }
];

/**
 * @route   GET /api/blog/posts
 * @desc    Get all blog posts
 * @access  Public
 */
router.get('/posts', (req, res) => {
  try {
    // In production, this would fetch from a database
    // For now, return mock data
    res.json({
      success: true,
      posts: mockBlogPosts.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        author: post.author,
        category: post.category,
        tags: post.tags,
        image: post.image,
        published_at: post.published_at,
        read_time: post.read_time
      }))
    });
  } catch (error) {
    console.error('Blog posts fetch error:', error);
    res.status(500).json({ message: 'Error fetching blog posts' });
  }
});

/**
 * @route   GET /api/blog/posts/:slug
 * @desc    Get a single blog post by slug
 * @access  Public
 */
router.get('/posts/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    
    // In production, this would fetch from a database
    // For now, find in mock data
    const post = mockBlogPosts.find(post => post.slug === slug);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json({
      success: true,
      post
    });
  } catch (error) {
    console.error('Blog post fetch error:', error);
    res.status(500).json({ message: 'Error fetching blog post' });
  }
});

/**
 * @route   GET /api/blog/categories/:category
 * @desc    Get posts by category
 * @access  Public
 */
router.get('/categories/:category', (req, res) => {
  try {
    const { category } = req.params;
    
    // In production, this would fetch from a database
    // For now, filter mock data
    // Check both category and tags for matches
    const posts = mockBlogPosts.filter(post => {
      const categoryMatch = post.category.toLowerCase().includes(category.toLowerCase());
      const tagMatch = post.tags.some(tag => tag.toLowerCase() === category.toLowerCase());
      return categoryMatch || tagMatch;
    });
    
    res.json({
      success: true,
      category,
      posts: posts.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        author: post.author,
        category: post.category,
        tags: post.tags,
        image: post.image,
        published_at: post.published_at,
        read_time: post.read_time
      }))
    });
  } catch (error) {
    console.error('Category posts fetch error:', error);
    res.status(500).json({ message: 'Error fetching category posts' });
  }
});

module.exports = router;