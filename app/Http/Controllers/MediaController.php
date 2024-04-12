<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function createMovie (Request $request)
   {
    $media = new Media();
    $media->name = $request->name;
    $media->synopsis = $request->synopsis;
    $media->urlimg = $request->url_img;
    $media->save();

    return ["statut"=> "OK", "message" => "Le film '$media->name' est bien enregistré"];
   }

}
