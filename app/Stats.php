<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stats extends Model
{
    protected $fillable = ['id','count'];
    public $incrementing = false;
    protected $attributes = [
        'count' => 0,
    ];
}
