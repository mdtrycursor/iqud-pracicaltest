// Customer List Page - Shows all customers
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLoading } from '../contexts/LoadingContext';
import { customerAPI } from '../services/api';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Users,
  Phone,
  MapPin,
  User,
  LogOut,
  Hash
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmDialog from '../components/ConfirmDialog';
import toast from 'react-hot-toast';

const CustomerList = () => {
  const { user, logout } = useAuth();
  const { setLoading, isLoading } = useLoading();
  const [customers, setCustomers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, customer: null });

  // Get customers from server
  const fetchCustomers = async (page = 1, search = '') => {
    try {
      setLoading('fetchCustomers', true);
      const response = await customerAPI.getCustomers({
        page,
        limit: 12,
        search,
      });
      
      setCustomers(response.data.data.customers);
      setPagination(response.data.data.pagination);
    } catch (error) {
      toast.error('Failed to load customers');
    } finally {
      setLoading('fetchCustomers', false);
    }
  };

  // Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Debounce search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchCustomers(1, searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchCustomers(page, searchTerm);
  };

  // Show delete confirmation
  const handleDeleteClick = (customer) => {
    setDeleteDialog({ isOpen: true, customer });
  };

  // Delete customer
  const handleDeleteConfirm = async () => {
    try {
      setLoading('deleteCustomer', true);
      await customerAPI.deleteCustomer(deleteDialog.customer._id);
      toast.success('Customer deleted successfully');
      fetchCustomers(currentPage, searchTerm);
    } catch (error) {
      toast.error('Failed to delete customer');
    } finally {
      setLoading('deleteCustomer', false);
    }
  };

  // Cancel delete
  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, customer: null });
  };


  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Professional Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-xl border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-6 sm:py-8 space-y-4 sm:space-y-0">
            {/* Brand Section */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Customer Management
                  </h1>
                  <p className="mt-1 text-sm text-gray-600 font-medium">
                    Welcome back, <span className="text-blue-600 font-semibold">{user?.email}</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex space-x-3">
                <Link
                  to="/me"
                  className="inline-flex items-center px-4 py-2.5 border border-gray-200 text-sm font-semibold rounded-xl text-gray-700 bg-white/80 hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 backdrop-blur-sm"
                >
                  <User className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">My Profile</span>
                  <span className="sm:hidden">Profile</span>
                </Link>
                <Link
                  to="/customers/new"
                  className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Add Customer</span>
                  <span className="sm:hidden">Add</span>
                </Link>
              </div>
              <button
                onClick={logout}
                className="inline-flex items-center justify-center px-4 py-2.5 border border-red-200 text-sm font-semibold rounded-xl text-red-600 bg-red-50/80 hover:bg-red-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 backdrop-blur-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Search Customers</h2>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search customers by name or phone number..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Customer List */}
        {isLoading('fetchCustomers') ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner text="Loading customers..." size="lg" type="database" />
          </div>
        ) : customers.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No customers found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first customer.'}
            </p>
            {!searchTerm && (
              <Link
                to="/customers/new"
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Customer
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Customer Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {customers.map((customer) => (
                <div key={customer._id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                  <div className="p-6">
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {customer.name}
                        </h3>
                        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
                      </div>
                      <div className="flex space-x-2 flex-shrink-0">
                        <Link
                          to={`/customers/${customer._id}/edit`}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                          title="Edit customer"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(customer)}
                          disabled={isLoading('deleteCustomer')}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete customer"
                        >
                          {isLoading('deleteCustomer') ? (
                            <LoadingSpinner size="sm" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {/* Customer Details */}
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <Hash className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="truncate font-mono text-xs">{customer._id}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <Phone className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="truncate font-medium">{customer.phone}</span>
                      </div>
                      <div className="flex items-start text-sm text-gray-600">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <MapPin className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="line-clamp-2 break-words">{customer.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="text-sm text-gray-600 text-center sm:text-left">
                      Showing{' '}
                      <span className="font-semibold text-gray-900">
                        {(pagination.currentPage - 1) * pagination.limit + 1}
                      </span>{' '}
                      to{' '}
                      <span className="font-semibold text-gray-900">
                        {Math.min(pagination.currentPage * pagination.limit, pagination.totalCustomers)}
                      </span>{' '}
                      of{' '}
                      <span className="font-semibold text-gray-900">{pagination.totalCustomers}</span>{' '}
                      customers
                    </div>
                    
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!pagination.hasPrevPage}
                        className="inline-flex items-center px-3 py-2 border border-gray-200 text-sm font-medium rounded-xl text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Previous</span>
                      </button>
                      
                      <div className="flex items-center space-x-1">
                        <span className="inline-flex items-center px-4 py-2 border border-blue-200 text-sm font-semibold rounded-xl text-blue-600 bg-blue-50">
                          <span className="hidden sm:inline">Page {pagination.currentPage} of {pagination.totalPages}</span>
                          <span className="sm:hidden">{pagination.currentPage}/{pagination.totalPages}</span>
                        </span>
                      </div>
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!pagination.hasNextPage}
                        className="inline-flex items-center px-3 py-2 border border-gray-200 text-sm font-medium rounded-xl text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Customer"
        message={`Are you sure you want to delete "${deleteDialog.customer?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default CustomerList;
