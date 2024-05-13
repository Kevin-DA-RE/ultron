<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;

class MediaController extends Controller
{

    public function index()
    {
        return "Hello world 1";
    }


    
    public function getMovie ()
    {
        return Media::all();
    }
    public function createMovie (Request $request)
   {
    $media = Media::create([
        "name" => "$request->name",
        "synopsis" => "$request->synopsis",
        "urlimg" => "$request->url_img"
    ]);

    return ["statut"=> "OK", "message" => "Le film '$media->name' est bien enregistré"];
   }

}
