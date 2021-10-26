<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use MongoDB\Database;

class GamesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    //listing des jeux

    public function displayList(){

        $games = DB::collection('games')->get();
        return response()->json($games);

    }

    //Nombre de jeux iOS/Android

    public function iosGames() {

        $ios = DB::collection('games')

            ->where('ios_name', '!=', null)
            ->count();


        return response()->json($ios);

       }

    public function androidGames() {

        $android = DB::collection('games')

            ->where('android_name', '!=', null)
            ->count();


        return response()->json($android);

    }

    public function androidSDK() {

        $android = DB::collection('games')

            ->where('android_version', '!=', null)
            ->count();


        return response()->json($android);

    }

    public function iosSDK() {

        $ios = DB::collection('games')

            ->where('ios_version', '!=', null)
            ->count();


        return response()->json($ios);

    }

    public function geoMap() {

    $result = DB::collection('users')->raw(function($collection)
    {
        return $collection->aggregate(array(
            array(
                '$group' => array(
                    '_id' => '$country_code',
                    'number' => array(
                        '$sum' => 1
                    )
                )
            )
        ));
    });
    return response()->json($result);

}

//évolution des nombre des joueurs par mois

    public function GamesLineChart(){
        $result = DB::collection('games')->raw(function($collection)
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


    public function BarChart ()
    {
        $result = DB::collection('games')

            ->where('ios_version', '=', '1.0.1')
            ->count();

        return response()->json($result);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }



}
