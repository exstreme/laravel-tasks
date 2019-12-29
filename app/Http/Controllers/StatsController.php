<?php

namespace App\Http\Controllers;

use App\Stats;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class StatsController extends Controller
{
    public function index(Request $request)
    {
        try {
            $this->validate($request, [
                'task_id' => 'required|integer'
            ]);
        }
        catch (ValidationException $e){
            return response()->json('error',404);
        }

        $item = Stats::updateOrCreate(array('id'=>$request->task_id));
        $item->count++;
        $item->save();
    }
}
