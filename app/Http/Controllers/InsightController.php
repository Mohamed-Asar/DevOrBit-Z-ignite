<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class InsightController extends Controller
{
    public function index()
    {
        return Inertia::render('Insights/Index');
    }
}
