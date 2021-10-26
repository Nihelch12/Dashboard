<?php

namespace App\Http\Controllers;

use App\Models\Administrator;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class SuperAdminController extends Controller
{
    public function displayAdmins(){

        $admins = DB::collection('administrators')->get();
        return response()->json($admins);

    }


    public function UpdateStatus(Request $request ){

 //db.administrators.update({ _id: ObjectId("616b750757230000d0005e2a")  },{ $set: { "status": false} })

        $result = DB::collection('administrators')->raw(function($collection) use($request)
        {
            return $collection->updateMany(array(
               '_id'=> new \MongoDB\BSON\ObjectID($request -> input('_id'))
            ),
            array(
                '$set'=> array(
                    'status'=> $request -> input('status')
                )
            )
            );
        });


//        $objects = json_decode(json_encode($result->toArray(),true));
//        $array=json_decode(json_encode($objects),true);
        // $array = json_decode(json_encode($result->toArray(),true), true);

        return response()->json($result);

    }


}
