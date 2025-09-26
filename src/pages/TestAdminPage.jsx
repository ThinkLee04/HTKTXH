import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Test page để debug AdminPage
 */
const TestAdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            🔧 Test Admin Page
          </h1>
          <p className="text-gray-600 mb-6">
            This is a test page to verify routing works correctly.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-4"
            >
              🏠 Back to Home
            </button>
            
            <button
              onClick={() => navigate('/quiz')}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              🎯 Go to Quiz
            </button>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Debug Info:</h3>
            <div className="text-sm text-gray-600 text-left">
              <div><strong>Current URL:</strong> {window.location.href}</div>
              <div><strong>Route Path:</strong> /admin-test</div>
              <div><strong>Navigation Works:</strong> ✅ Yes</div>
              <div><strong>Component Loads:</strong> ✅ Yes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAdminPage;