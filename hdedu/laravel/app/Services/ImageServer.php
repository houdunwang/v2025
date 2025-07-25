<?php

namespace App\Services;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;

class ImageServer
{
    public function scale($file, $width, $height)
    {
        $manager = new ImageManager(new Driver());
        $image = $manager->read($file);
        $image->scale(width: $width, height: $height);
        return  $image->toJpeg()->save($file);
    }
}
