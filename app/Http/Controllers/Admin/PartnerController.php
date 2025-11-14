<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Partner;
use App\Models\WebDetail;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PartnerController extends BasicController
{
    public $model = Partner::class;
    public $reactView = 'Admin/Partner';
    public $imageFields = ['image'];

    public function setReactViewProperties(Request $request)
    {
        $details = WebDetail::where('page', 'values')->get();
        return [
            'details' => $details,
        ];
    }

    public function getVisiblePartners(Request $request)
    {
        try {
            $partners = Partner::where('visible', true)
                ->where('status', true)
                ->orderBy('created_at', 'desc')
                ->get(['id', 'name', 'description', 'image']);

            return response()->json($partners);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Error loading partners',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
