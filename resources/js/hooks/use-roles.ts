import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types'; // Update to your actual shared types path

/**
 * Hook to strictly check if the authenticated user has a specific role.
 */
export function useHasRole(role: string | string[]) {
    // Assuming you share the generated roles array from Laravel via Inertia Shared Props
    const { auth } = usePage<SharedData>().props;
    const userRoles = auth.user?.roles || []; // Plucked from user relation on Laravel side

    if (Array.isArray(role)) {
        return role.some(r => userRoles.includes(r));
    }

    return userRoles.includes(role);
}

/**
 * Hook to strictly check if the authenticated user has a specific permission.
 */
export function useHasPermission(permission: string | string[]) {
    const { auth } = usePage<SharedData>().props;
    const userPermissions = auth.user?.permissions || [];

    if (Array.isArray(permission)) {
        return permission.some(p => userPermissions.includes(p));
    }

    return userPermissions.includes(permission);
}
