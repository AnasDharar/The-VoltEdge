import React from 'react';

const Blog = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[60vh]">
      <div className="flex items-center gap-4 mb-8">
           <h1 className="text-3xl font-bold text-slate-900">Blogs</h1>
      </div>
      
      <div className="border-2 w-full border-dashed border-slate-200 rounded-xl p-12 text-center bg-slate-50">
        <p className="text-slate-400">Blogs will be coming soon</p>
      </div>
    </div>
  );
};

export default Blog;
