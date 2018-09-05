<?php

namespace App\Http\Controllers;

use Validator;
use App\Setting;
use Illuminate\Http\Request;
// use Illuminate\Validation\Validator;

class SetupController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function saveSettings(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'price' => 'required|numeric',
            'totalEnergy' => 'required|numeric',
        ]);

        if ( $validator->fails() ){
            return response()->json($validator->messages(), 400);
        }

        $settings = Setting::findOrNew(1); // There's only one settings entry
        // $settings->id = 1; // There's only one settings entry
        $settings->value = json_encode([
            'total_energy_vendable' => $request->input('totalEnergy'),
            'price_per_kwh' => $request->input('price')
        ]);
        
        $settings->save();

        return response()->json($settings, 201);
    }

    public function index()
    {
        return view('index');
    }
}
