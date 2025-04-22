'use client';
import React from 'react';

function Details() {
  return (
    <div className="w-full max-w-full">
      <div className="border-b-2 py-3 px-4 sm:px-6 md:px-8">
        <h2 className="text-lg font-bold">Details</h2>
      </div>

      <div className="space-y-6 px-4 sm:px-6 md:px-8 py-4">
        {/* Assigned */}
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-2">Assigned</h4>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-sm text-white">
              E
            </div>
            <span className="text-sm sm:text-base">Eric Alexander</span>
          </div>
        </div>

        {/* Department */}
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-2">Department</h4>
          <span className="text-sm sm:text-base">Service</span>
        </div>

        {/* Category */}
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-2">Category</h4>
          <span className="text-sm sm:text-base">Maintenance</span>
        </div>

        {/* Requester */}
        <div>
          <div className="border-2 py-2 px-4 mb-4">
            <h2 className="text-lg font-bold">Requester</h2>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-sm text-white">
              S
            </div>
            <span className="text-sm sm:text-base">Sarah Johnson</span>
          </div>
        </div>

        {/* District */}
        <div>
          <h4 className="text-xs text-gray-500 mb-1">District</h4>
          <span className="text-sm sm:text-base">Valley / Admin</span>
        </div>

        {/* Phone */}
        <div>
          <h4 className="text-xs text-gray-500 mb-1">Phone</h4>
          <span className="text-sm sm:text-base">555-123-4567</span>
        </div>

        {/* Related Referrals */}
        <div>
          <h3 className="text-lg font-bold mb-3">Related Referrals</h3>

          {/* Referral 1 */}
          <div className="mb-4">
            <div className="flex items-center mb-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-blue-500">PRC-182</span>
            </div>
            <p className="text-xs text-gray-500 ml-4">
              Created on 02/04/2023 by MANAGER
            </p>
          </div>

          {/* Referral 2 */}
          <div>
            <div className="flex items-center mb-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-blue-500">IIRC-152</span>
            </div>
            <p className="text-xs text-gray-500 ml-4">
              Opened on 08/14/2023 by MANAGER
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
