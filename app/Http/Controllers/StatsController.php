<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Sale;
use Illuminate\Support\Carbon;

class StatsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function all(Request $request)
    {
        $vendingToday = Sale::where('created_at', '>=', Carbon::today())->get();
        $amountToday = 0;
        foreach ($vendingToday as $today) {
            $amount = doubleVal($today->amount);
            $amountToday += $amount;
        }

        return response()->json(["vending_today" => count($vendingToday), "amount" => $amountToday], 201);
    }
}
