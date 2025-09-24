'use client';

import { createChildAccount } from '@/app/actions';
import { useRef, useState } from 'react';

// The 'onClose' prop is a function that will be called to close the modal
export default function AddChildModal({ onClose }: { onClose: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await createChildAccount(formData);

    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage(result.success || '');
      formRef.current?.reset(); // Clear the form
      // You could automatically close the modal here after a delay
      // setTimeout(onClose, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Child</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input type="text" name="fullName" id="fullName" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password" name="password" id="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          {message && <p className="text-sm text-gray-600">{message}</p>}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}