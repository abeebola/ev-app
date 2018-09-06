<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Sale;
use App\Setting;

class SalesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('index');
    }

    public function addSale(Request $request){
        $validator = Validator::make($request->all(), [
            'meter_number' => 'required|string',
            'price' => 'required|numeric',
            'energy_vended' => 'required|numeric',
        ]);

        if ( $validator->fails() ){
            return response()->json($validator->messages(), 400);
        }

        $sale = new Sale;
        $energyVended = $request->input('energy_vended');
        $price = $request->input('price');
        $sale->meter_number = $request->input('meter_number');
        $sale->energy_vended = $energyVended;
        $sale->price = $price;
        $sale->amount = $energyVended * $price;     
        $id = $sale->save();

        // Deplete total vending amount
        $setting = Setting::find(1);
        $total_energy_vendable = $setting->total_energy_vendable - $energyVended;
        $setting->total_energy_vendable = $total_energy_vendable;
        $setting->save();

        // $sale = Sale::find($id);
        $sale->total_energy_vendable = $total_energy_vendable;

        return response()->json($sale, 201);
    }

    public function getSales(Request $request){
        $sales = Sale::orderBy('created_at', 'desc')->get();

        return response()->json($sales, 200);
    }
}
