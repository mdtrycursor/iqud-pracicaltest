// Customer Form Page Component
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLoading } from '../contexts/LoadingContext';
import { customerAPI } from '../services/api';
import { ArrowLeft, Save, User, MapPin, Phone } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const CustomerForm = () => {
  const { setLoading, isLoading } = useLoading();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  // Form handling with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Load existing customer data for editing
  useEffect(() => {
    if (isEdit) {
      loadCustomer();
    }
  }, [id, isEdit]);

  // Load customer data for editing
  const loadCustomer = async () => {
    try {
      setLoading('loadCustomer', true);
      const response = await customerAPI.getCustomer(id);
      const customer = response.data.data.customer;
      
      // Populate form with existing data
      setValue('name', customer.name);
      setValue('address', customer.address);
      setValue('phone', customer.phone);
    } catch (error) {
      toast.error('Failed to load customer data');
      navigate('/customers');
    } finally {
      setLoading('loadCustomer', false);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading('saveCustomer', true);
    try {
      if (isEdit) {
        await customerAPI.updateCustomer(id, data);
        toast.success('Customer updated successfully!');
      } else {
        await customerAPI.createCustomer(data);
        toast.success('Customer created successfully!');
      }
      navigate('/customers');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to save customer';
      toast.error(message);
    } finally {
      setLoading('saveCustomer', false);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    navigate('/customers');
  };

  // Show loading spinner while loading customer data
  if (isLoading('loadCustomer')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading customer data..." size="lg" type="database" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4 sm:py-6">
            <button
              onClick={handleCancel}
              className="mr-3 sm:mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
              {isEdit ? 'Edit Customer' : 'Add New Customer'}
            </h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Customer Name *
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('name', {
                    required: 'Customer name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                    maxLength: {
                      value: 100,
                      message: 'Name cannot exceed 100 characters',
                    },
                  })}
                  type="text"
                  className="appearance-none rounded-md relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter customer name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[\+]?[1-9][\d]{0,15}$/,
                      message: 'Please enter a valid phone number',
                    },
                  })}
                  type="tel"
                  className="appearance-none rounded-md relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter phone number"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* Address Field */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address *
              </label>
              <div className="mt-1 relative">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  {...register('address', {
                    required: 'Address is required',
                    minLength: {
                      value: 5,
                      message: 'Address must be at least 5 characters',
                    },
                    maxLength: {
                      value: 500,
                      message: 'Address cannot exceed 500 characters',
                    },
                  })}
                  rows={4}
                  className="appearance-none rounded-md relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm resize-none"
                  placeholder="Enter customer address"
                />
              </div>
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 sm:pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading('saveCustomer')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading('saveCustomer') ? (
                  <LoadingSpinner text="" size="sm" className="flex-row" />
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">
                      {isEdit ? 'Update Customer' : 'Create Customer'}
                    </span>
                    <span className="sm:hidden">
                      {isEdit ? 'Update' : 'Create'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
