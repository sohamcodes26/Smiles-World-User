import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

const BlogCard = ({ post }) => {
  // Placeholder image if post.image is not available or is a broken URL
  const imageUrl = post.image || "https://via.placeholder.com/400x250?text=Travel+Blog";

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col group 
                    transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      {/* Image Section */}
      <div className="w-full h-56 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category, Date, Read Time */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="font-semibold text-orange-500">{post.category}</span> {/* Changed to orange */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.publishDate).toLocaleDateString()}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-[#2A3A5B] group-hover:text-orange-600 transition-colors line-clamp-2"> {/* Hover changed to orange */}
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mt-3 flex-grow line-clamp-3">
          {post.excerpt}
        </p>

        {/* Author and Read Article Button */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-[#2A3A5B]">{post.author}</span>
          </div>
          <Link to={`/blog/${post.id}`} className="font-semibold text-orange-500 flex items-center gap-1 group-hover:gap-2 transition-all"> {/* Changed to orange */}
            Read Article <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;