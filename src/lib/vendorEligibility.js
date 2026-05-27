export const TEMP_PERSONAL_DETAILS_AUTO_PASS = true;

const TRUTHY_STATUSES = new Set([
  'pending',
  'submitted',
  'uploaded',
  'under_review',
  'approved',
  'verified',
]);

const PENDING_VENDOR_STATUSES = new Set([
  'pending',
  'requested',
  'under_review',
  'awaiting_approval',
]);

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

export function hasUploadedIdVerification(user) {
  const status = normalize(user?.id_verification_status);
  if (TRUTHY_STATUSES.has(status)) return true;
  return Boolean(user?.id_verification_url);
}

export function hasVerifiedEmail(user) {
  return Boolean(user?.is_verified || user?.email_verified || user?.email_verified_at);
}

export function hasUpdatedAddress(user) {
  if (TEMP_PERSONAL_DETAILS_AUTO_PASS) return true;
  return Boolean(String(user?.address || '').trim());
}

export function hasUpdatedPhoneNumber(user) {
  if (TEMP_PERSONAL_DETAILS_AUTO_PASS) return true;
  return Boolean(String(user?.phone_number || '').trim());
}

export function isVendorVerifiedBySuperAdmin(user) {
  if (!user) return false;
  if (user.role === 'superadmin') return true;
  return Boolean(user?.vendor_verified || user?.vendor_verified_at);
}

export function isPendingVendorRequest(user) {
  if (!user || isVendorVerifiedBySuperAdmin(user)) return false;

  const verificationStatus = normalize(
    user?.vendor_verification_status || user?.vendor_status || user?.vendor_request_status
  );

  if (PENDING_VENDOR_STATUSES.has(verificationStatus)) {
    return true;
  }

  if (user?.vendor_requested_at) {
    return true;
  }

  return user?.role === 'vendor' && !user?.vendor_verified;
}

export function getVendorEligibilityCriteria(user) {
  return [
    {
      key: 'id_verification',
      label: 'Successful upload of ID Verification',
      met: hasUploadedIdVerification(user),
    },
    {
      key: 'email_verified',
      label: 'Verified email address',
      met: hasVerifiedEmail(user),
    },
    {
      key: 'address_updated',
      label: 'Updated address',
      met: hasUpdatedAddress(user),
      temporaryAutoPass: TEMP_PERSONAL_DETAILS_AUTO_PASS,
    },
    {
      key: 'phone_updated',
      label: 'Updated phone number',
      met: hasUpdatedPhoneNumber(user),
      temporaryAutoPass: TEMP_PERSONAL_DETAILS_AUTO_PASS,
    },
  ];
}

export function hasCompletedVendorEligibility(user) {
  return getVendorEligibilityCriteria(user).every((criterion) => criterion.met);
}
