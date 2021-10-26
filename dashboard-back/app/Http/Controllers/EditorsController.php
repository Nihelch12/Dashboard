<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EditorsController extends Controller
{
    public function displayEditors(){

        $editors = DB::collection('editors')->get();
        return response()->json($editors);

    }
}
