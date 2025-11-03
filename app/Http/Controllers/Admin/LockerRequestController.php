<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\LockerRequest;
use Illuminate\Http\Request;

class LockerRequestController extends BasicController
{
   public $model = LockerRequest::class;
   public $reactView = 'Admin/LockerRequests';

   public function setPaginationInstance(Request $request, string $model)
   {
      return $model::where('id', '>', 0);
   }
}
