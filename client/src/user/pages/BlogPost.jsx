import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockBlogData } from './Blogs'; // We import the data from Blogs.jsx
import { Calendar, Clock, User } from 'lucide-react';

export const BlogPost = () => {
  const { postId } = useParams(); // Gets the ID from the URL (e.g., '1', '2')
  const post = mockBlogData.find(p => p.id === parseInt(postId));

  if (!post) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-3xl font-bold">Post not found!</h1>
        <Link to="/blog" className="text-blue-600 mt-4 inline-block">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-white">
      <div className="max-w-4xl mx-auto py-16 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-semibold text-[#E8318A]">{post.category}</p>
          <h1 className="text-4xl md:text-6xl font-bold text-[#2A3A5B] mt-2">{post.title}</h1>
          <div className="flex justify-center items-center gap-6 mt-6 text-slate-500">
            <span className="flex items-center gap-2"><User size={16} /> {post.author}</span>
            <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(post.publishDate).toLocaleDateString()}</span>
            <span className="flex items-center gap-2"><Clock size={16} /> {post.readTime}</span>
          </div>
        </div>

        {/* Main Image */}
        <img src={post.image} alt={post.title} className="w-full h-96 object-cover rounded-2xl shadow-lg mb-12" />

        {/* Blog Content */}
        <div className="prose lg:prose-xl max-w-none">
          <p>{post.content}</p>
          <p>This is where the full text of your article would go. You can add more paragraphs, images, and other elements here to build out the full reading experience.</p>
          {/* Add more of post.content here */}
        </div>
      </div>
    </div>
  );
};