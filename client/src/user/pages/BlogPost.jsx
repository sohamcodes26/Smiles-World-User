import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';

// --- IMPORT THE HOOK ---
import { useBlogPost } from '../hooks/useBlogPost'; // Adjust path if needed

export const BlogPost = () => {
  const { postId } = useParams(); // Gets the ID from the URL
  
  // --- FETCH DATA FOR A SINGLE POST ---
  const { data: post, isLoading, isError } = useBlogPost(postId);

  if (isLoading) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-3xl font-bold">Loading post...</h1>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-3xl font-bold">Post not found!</h1>
        <p className="text-slate-500 mt-2">Sorry, we couldn't find the post you're looking for.</p>
        <Link to="/blog" className="text-blue-600 mt-4 inline-block">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-white">
      <div className="max-w-4xl mx-auto py-16 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Use 'tag' from schema as category */}
          <p className="font-semibold text-[#E8318A]">{post.tag}</p>
          <h1 className="text-4xl md:text-6xl font-bold text-[#2A3A5B] mt-2">{post.title}</h1>
          <div className="flex justify-center items-center gap-6 mt-6 text-slate-500">
            <span className="flex items-center gap-2"><User size={16} /> {post.author}</span>
            <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(post.publishDate).toLocaleDateString()}</span>
            {/* Use 'readMin' from schema and format it */}
            <span className="flex items-center gap-2"><Clock size={16} /> {post.readMin} min read</span>
          </div>
        </div>

        {/* Main Image - Use 'thumbnailUrl' from schema */}
        <img src={post.thumbnailUrl} alt={post.title} className="w-full h-96 object-cover rounded-2xl shadow-lg mb-12" />

        {/* Blog Content - Use 'content' from schema */}
        {/* The 'prose' class from Tailwind is great for styling HTML content rendered from a CMS */}
        <div className="prose lg:prose-xl max-w-none">
          {/* If post.content is HTML, you might use: <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};