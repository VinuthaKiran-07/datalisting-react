import { authors, bodyPatterns, categories, excerptPatterns, replaceSubject, titleLibrary, titleSubjects } from '../data/postMetadata.js';

// Helper to generate a fake date based on the post index
const formatDate = (index) => `2026-${String((index % 9) + 1).padStart(2, '0')}-${String(((index * 7) % 27) + 1).padStart(2, '0')}`;

export const transformPosts = (posts) => {
  // Loop through the raw posts array
  const transformed = posts.map((post, index) => {
    // Pick random but consistent fake data based on the index position
    const subject = titleSubjects[index % titleSubjects.length];
    const title = titleLibrary[index % titleLibrary.length];
    const variation = Math.floor(index / titleSubjects.length);
    
    // Create fake text content replacing placeholders
    const excerpt = replaceSubject(excerptPatterns[variation % excerptPatterns.length], subject);
    const body = replaceSubject(bodyPatterns[variation % bodyPatterns.length], subject);
    
    // Return a rich, merged object
    return { 
      id: post.id, 
      userId: post.userId, 
      title, 
      excerpt, 
      body, 
      category: categories[(index * 3) % categories.length], 
      author: authors[(index * 7) % authors.length], 
      readTime: `${3 + (index % 6)} min read`, 
      views: 650 + ((index * 773) % 9100), 
      date: formatDate(index) 
    };
  });
  
  // Safety check: ensure we didn't generate duplicate titles
  const uniqueTitles = new Set(transformed.map((post) => post.title));
  if (uniqueTitles.size !== transformed.length) throw new Error('Transformed post titles must be unique.');
  
  return transformed;
};