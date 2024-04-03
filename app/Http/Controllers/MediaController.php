<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function createMovie (Request $request)
   {
    $model = new Media();
    $model->name = $request->name;
    $model->synopsis = $request->synopsis;
    $model->urlimg = $request->url_img;
    $model->save();

    return $model;
   }

}
