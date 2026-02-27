<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. KPI Data
        $totalUsers = User::count();
        $totalAdmins = User::role('Admin')->count() + User::role('Super Admin')->count();
        $totalManagers = User::role('Manager')->count();
        $totalEmployees = User::role('Employee')->count();

        // 2. User Distribution Grouped By Role
        // Simplified for this mock using Spatie raw queries:
        $distribution = [
            ['role' => 'Super Admin', 'count' => User::role('Super Admin')->count()],
            ['role' => 'Admin', 'count' => User::role('Admin')->count()],
            ['role' => 'Manager', 'count' => User::role('Manager')->count()],
            ['role' => 'Employee', 'count' => User::role('Employee')->count()],
        ];

        // 3. Monthly Activity (Mocked for demonstration, ordinarily group by created_at)
        $monthly = [
            ['month' => 'Jan', 'users' => 45, 'logins' => 5],
            ['month' => 'Feb', 'users' => 62, 'logins' => 7],
            ['month' => 'Mar', 'users' => 85, 'logins' => 9],
            ['month' => 'Apr', 'users' => 110, 'logins' => 12],
            ['month' => 'May', 'users' => 135, 'logins' => 14],
            ['month' => 'Jun', 'users' => 156, 'logins' => 15],
            ['month' => 'Jul', 'users' => 182, 'logins' => 18],
            ['month' => 'Aug', 'users' => 200, 'logins' => 18],
        ];

        return Inertia::render('Dashboard', [
            'kpis' => [
                'totalUsers' => $totalUsers,
                'totalAdmins' => $totalAdmins,
                'totalManagers' => $totalManagers,
                'totalEmployees' => $totalEmployees,
            ],
            'distribution' => $distribution,
            'monthly' => $monthly,
        ]);
    }
}
