/**
 * API Utilities
 * Handles all API calls with error handling and user feedback
 */

const API_BASE_URL = process.env.API_URL || 'http://localhost:3000/api';

/**
 * Show toast notification to user
 * @param {string} message - Message to display
 * @param {string} type - Type of toast: success, error, info, warning
 */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.setAttribute('role', 'alert');
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Generic API fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<object>} - Response data or error
 */
async function apiCall(endpoint, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, defaultOptions);
        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                message: data.message || 'An error occurred',
                details: data.details
            };
        }

        return {
            success: true,
            data: data
        };
    } catch (error) {
        console.error('API Error:', error);
        
        // Handle different error types
        if (error instanceof TypeError) {
            return {
                success: false,
                error: 'Network Error',
                message: 'Unable to connect to server. Please check your internet connection.'
            };
        }

        return {
            success: false,
            error: error.status ? `Error ${error.status}` : 'Error',
            message: error.message || 'An unexpected error occurred',
            details: error.details
        };
    }
}

/**
 * GET request
 * @param {string} endpoint - API endpoint
 * @returns {Promise<object>}
 */
async function get(endpoint) {
    return apiCall(endpoint, { method: 'GET' });
}

/**
 * POST request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body
 * @returns {Promise<object>}
 */
async function post(endpoint, data = {}) {
    return apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

/**
 * PUT request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body
 * @returns {Promise<object>}
 */
async function put(endpoint, data = {}) {
    return apiCall(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

/**
 * PATCH request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body
 * @returns {Promise<object>}
 */
async function patch(endpoint, data = {}) {
    return apiCall(endpoint, {
        method: 'PATCH',
        body: JSON.stringify(data)
    });
}

/**
 * DELETE request
 * @param {string} endpoint - API endpoint
 * @returns {Promise<object>}
 */
async function del(endpoint) {
    return apiCall(endpoint, { method: 'DELETE' });
}

/**
 * Check API health
 * @returns {Promise<object>}
 */
async function checkHealth() {
    return get('/health');
}

/**
 * Check API status
 * @returns {Promise<object>}
 */
async function checkStatus() {
    return get('/status');
}

/**
 * Set loading state on element
 * @param {element} element - DOM element
 * @param {boolean} isLoading - Loading state
 */
function setLoading(element, isLoading) {
    if (isLoading) {
        element.classList.add('loading');
        element.disabled = true;
    } else {
        element.classList.remove('loading');
        element.disabled = false;
    }
}

/**
 * Show loading spinner
 * @returns {element} - Spinner element
 */
function showSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.innerHTML = '<div class="spinner-circle"></div>';
    return spinner;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showToast,
        apiCall,
        get,
        post,
        put,
        patch,
        del,
        checkHealth,
        checkStatus,
        setLoading,
        showSpinner
    };
}
