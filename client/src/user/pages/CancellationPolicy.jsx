import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useCancellationPolicy } from '../hooks/useCancellationPolicy';

export default function CancellationPolicy() {
  const { data, isLoading, isError } = useCancellationPolicy();

  if (isLoading) {
    return (
      <div className="pt-16 bg-white min-h-screen flex justify-center items-center">
        <p>Loading Policy...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="pt-16 bg-white min-h-screen flex justify-center items-center">
        <p>Could not load the cancellation policy. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-white min-h-screen">
      {/* Page Header */}
      <section className="py-20 px-4 bg-slate-50 border-b">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#2A3A5B] tracking-tight">
            Cancellations & Refunds Policy
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-4">
            Terms and conditions for services provided by Smiles World.
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 px-4 whitespace-pre-wrap">
        <div 
          className="max-w-3xl mx-auto prose lg:prose-lg"
          dangerouslySetInnerHTML={{ __html: data.policy }}
        />
        
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-xl font-bold text-[#2A3A5B]">Have a Question?</h3>
            <p>If you have any questions about this policy, please don't hesitate to reach out to us.</p>
            <Link to="/contact" className="inline-flex items-center font-semibold text-orange-600 mt-2">
              Contact Us <ChevronRight size={16} className="ml-1" />
            </Link>
        </div>
      </section>
    </div>
  );
}
