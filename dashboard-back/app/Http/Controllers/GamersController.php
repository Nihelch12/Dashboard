<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GamersController extends Controller
{

    //Listing des joueurs
    public function displayGamers(){

        $gamers = DB::collection('users')->get();
        return response()->json($gamers);

    }



    // Listing des pays impliqués avec %

    public function Geo(){
        // db.users.aggregate({"$group":{"_id":{"type":"$country_code"},"count":{"$sum":1}}}
        //,{"$project":{"count":1,"percentage":{"$multiply":[{"$divide":[100,totalDocument]},"$count"]}}})


        $result = DB::collection('users')->raw(function($collection)
        {
            $totalDocument = DB::collection('users')->count();
            return $collection->aggregate(array(
                array(
                    '$group'=>array(
                        '_id'=>array(
                            'country'=>'$country_code'
                        ),
                        'count'=>array('$sum'=> 1)
                    )
                ),
                array(
                    '$project'=>array(
                        'count'=>1,
                        'percentage'=>array(
                            '$multiply'=> [
                                array(
                                    '$divide'=>[100,$totalDocument]
                                ),
                                '$count'
                            ]
                        )
                    )
                )
            ));
        });
        $objects = json_decode(json_encode($result->toArray(),true));
        $array=json_decode(json_encode($objects),true);
        return response()->json($array);

    }

    //évolution des nombre des joueurs par mois

    public function GamersLineChart(){
        $result = DB::collection('users')->raw(function($collection)
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

    public function transactions(){
// db.transactions.aggregate([{$group:{_id: "$type",avgTrans: {$avg:"$amount"}}},{$sort:{avgTrans:1}}])
        $result = DB::collection('transactions')->raw(function($collection){
            return $collection->aggregate(array(
                array(
                    '$group'=> array(
                        '_id'=>'$type',
                        'avgTrans'=> array(
                            '$avg'=>'$amount'
                        ),
                    )
                ),
                array(
                    '$sort'=>array(
                        'avgTrans'=>1
                    )
                )
            ));
        });
        $objects = json_decode(json_encode($result->toArray(),true));
        $array=json_decode(json_encode($objects),true);
        // $array = json_decode(json_encode($result->toArray(),true), true);

        return response()->json($array);


    }

}
