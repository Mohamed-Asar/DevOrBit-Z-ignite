<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        // For Hackathon prototype purposes, this handles the React view logic
        // It can accept filters such as 'startDate', 'endDate', 'role'
        return Inertia::render('Reports/Index', [
            'filters' => $request->all(['startDate', 'endDate', 'role'])
        ]);
    }
}
