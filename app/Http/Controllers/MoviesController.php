<?php

namespace App\Http\Controllers;


use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MoviesController extends Controller
{    
    public function getMovie ()
    {
        $result = Movie::all();
    }

    public function getInfo (Movie $movie, Request $request)
    {
        return $request;
    }
    
    public function createMovie (Request $request)
   {
    $movie = Movie::create([
        "name" => "$request->name",
        "synopsis" => "$request->synopsis",
        "urlimg" => "$request->url_img"
    ]);

    return ["statut"=> "OK", "message" => "Le film '$movie->name' est bien enregistré"];
   }

}
