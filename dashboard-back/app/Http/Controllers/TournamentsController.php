<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TournamentsController extends Controller
{
    public function MonthLineChart(){
        $result = DB::collection('tournaments')->raw(function($collection)
        {
            //   var date =db.games.find({created_at: {$not: {$type: 9}}})

            return $collection->aggregate(array(
                array(
                    '$group' => array(
                        '_id' => array('mois'=>array(
                            '$month'=>'$createdAt'
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

    public function DayLineChart(){
        $result = DB::collection('tournaments')->raw(function($collection)
        {
            //   var date =db.games.find({created_at: {$not: {$type: 9}}})

            return $collection->aggregate(array(
                array(
                    '$group' => array(
                        '_id' => array('jour'=>array(
                            '$dayOfWeek'=>'$createdAt'
                        )),
                        'number'=>array(
                            '$sum'=> 1
                        )

                    )
                ), array('$sort'=>array(
                    'number'=> 1,
                    'jour'=>1
                ))
            ));
        });

        // db.users.aggregate([{$group:{_id:{mois:{$month:"$created_at"}},number:{$sum : 1}}},{$sort:{number: 1, mois: 1}}])

        $objects = json_decode(json_encode($result->toArray(),true));
        $array=json_decode(json_encode($objects),true);
        // $array = json_decode(json_encode($result->toArray(),true), true);

        return response()->json($array);


    }
    public function WeekLineChart(){
        $result = DB::collection('tournaments')->raw(function($collection)
        {
            //   var date =db.games.find({created_at: {$not: {$type: 9}}})

            return $collection->aggregate(array(
                array(
                    '$group' => array(
                        '_id' => array('semaine'=>array(
                            '$week'=>'$createdAt'
                        )),
                        'number'=>array(
                            '$sum'=> 1
                        )

                    )
                ), array('$sort'=>array(
                    'number'=> 1,
                    'semaine'=>1
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
