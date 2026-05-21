/**
 * Admin API Client
 * File: src/lib/admin.js
 *
 * API client functions for all superadmin dashboard endpoints.
 */

import { apiFetch } from './api';

// ===================================================================
// Dashboard
// ===================================================================

export const getDashboardStats = () =>
  apiFetch('/admin/dashboard/stats');

// ===================================================================
// User Management
// ===================================================================

export const getAdminUsers = ({ search, role, is_active, page = 1, limit = 20 } = {}) => {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (role) params.set('role', role);
  if (is_active !== undefined && is_active !== null) params.set('is_active', is_active);
  params.set('page', page);
  params.set('limit', limit);
  return apiFetch(`/admin/users?${params.toString()}`);
};

export const getAdminUserStats = () =>
  apiFetch('/admin/users/stats');

export const getAdminUserDetail = (userId) =>
  apiFetch(`/admin/users/${userId}`);

export const changeUserRole = (userId, role) =>
  apiFetch(`/admin/users/${userId}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  });

export const verifyVendor = (userId, action, reason = null) =>
  apiFetch(`/admin/users/${userId}/verify-vendor`, {
    method: 'PATCH',
    body: JSON.stringify({ action, reason }),
  });

export const changeUserStatus = (userId, is_active) =>
  apiFetch(`/admin/users/${userId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ is_active }),
  });

// ===================================================================
// Property Management
// ===================================================================

export const getAdminProperties = ({ status, search, page = 1, limit = 20 } = {}) => {
  const params = new URLSearchParams();
  if (status) params.set('status', status);
  if (search) params.set('search', search);
  params.set('page', page);
  params.set('limit', limit);
  return apiFetch(`/admin/listings/properties?${params.toString()}`);
};

export const getAdminPropertyDetail = (propertyId) =>
  apiFetch(`/admin/listings/properties/${propertyId}`);

export const changePropertyStatus = (propertyId, status, admin_notes = null) =>
  apiFetch(`/admin/listings/properties/${propertyId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status, admin_notes }),
  });

// ===================================================================
// Ride Management
// ===================================================================

export const getAdminRides = ({ status, search, page = 1, limit = 20 } = {}) => {
  const params = new URLSearchParams();
  if (status) params.set('status', status);
  if (search) params.set('search', search);
  params.set('page', page);
  params.set('limit', limit);
  return apiFetch(`/admin/listings/rides?${params.toString()}`);
};

export const getAdminRideDetail = (rideId) =>
  apiFetch(`/admin/listings/rides/${rideId}`);

export const changeRideStatus = (rideId, status, admin_notes = null) =>
  apiFetch(`/admin/listings/rides/${rideId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status, admin_notes }),
  });

// ===================================================================
// Support Tickets
// ===================================================================

export const getAdminTickets = ({ status, page = 1, limit = 20 } = {}) => {
  const params = new URLSearchParams();
  if (status) params.set('status', status);
  params.set('page', page);
  params.set('limit', limit);
  return apiFetch(`/admin/support/tickets?${params.toString()}`);
};

export const changeTicketStatus = (ticketId, status) =>
  apiFetch(`/admin/support/tickets/${ticketId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
