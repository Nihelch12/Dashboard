<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DuelsController extends Controller
{
    public function DuelsChart ()
    {
        $result = DB::collection('challenges')

            ->where('gain_type', '=', 'bubble')
            ->count();

        return response()->json($result);
    }

    public function GamersLineChart(){
        $result = DB::collection('challenges')->raw(function($collection)
        {
            return $collection->aggregate(array(
                array(
                    '$group' => array(
                        '_id' => array('mois'=>array(
                            '$month'=>'$created_at'
                        )),
                        'number'=>array(
                            '$sum'=> 1
                        )

                    )
                ), array('$sort'=>array(
                    'number'=> 1,
                    'mois'=>1
                ))
            ));
        });

        // db.users.aggregate([{$group:{_id:{mois:{$month:"$created_at"}},number:{$sum : 1}}},{$sort:{number: 1, mois: 1}}])

        $objects = json_decode(json_encode($result->toArray(),true));
        $array=json_decode(json_encode($objects),true);
        // $array = json_decode(json_encode($result->toArray(),true), true);

        return response()->json($array);


    }

}
