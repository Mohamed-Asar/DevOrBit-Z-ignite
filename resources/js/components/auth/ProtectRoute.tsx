import React from 'react';
import { useHasRole, useHasPermission } from '@/hooks/use-roles';

interface ProtectRouteProps {
    children: React.ReactNode;
    role?: string | string[];
    permission?: string | string[];
    fallback?: React.ReactNode;
}

/**
 * A wrapper component that conditionally renders its children based on the authenticated user's Spatie roles/permissions.
 * Example Usage:
 * <ProtectRoute role="Super Admin"> <AdminSettingsButton /> </ProtectRoute>
 */
export const ProtectRoute: React.FC<ProtectRouteProps> = ({
    children,
    role,
    permission,
    fallback = null
}) => {
    const hasRole = role ? useHasRole(role) : true;
    const hasPermission = permission ? useHasPermission(permission) : true;

    if (hasRole && hasPermission) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
};
