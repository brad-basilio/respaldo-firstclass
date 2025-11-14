<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\ServiceSection;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ServiceSectionController extends BasicController
{
    public $model = ServiceSection::class;
    public $reactView = 'Admin/ServiceSections';

    /**
     * Set properties for React view
     */
    public function setReactViewProperties(Request $request)
    {
        $serviceId = $request->input('service_id');
        
        if (!$serviceId) {
            // Redirect back if no service_id provided
            return redirect('/admin/services')->with('error', 'Debe seleccionar un servicio');
        }

        $service = Service::with(['category', 'subcategory'])
            ->find($serviceId);

        if (!$service) {
            return redirect('/admin/services')->with('error', 'Servicio no encontrado');
        }

        return [
            'service' => $service,
            'service_id' => $serviceId,
            'service_name' => $service->name,
            'service_slug' => $service->slug,
        ];
    }

    /**
     * Display a listing of sections for a specific service (API endpoint).
     */
    public function list(Request $request)
    {
        $serviceId = $request->input('service_id');
        
        if (!$serviceId) {
            return response()->json(['error' => 'service_id is required'], 400);
        }

        $sections = ServiceSection::where('service_id', $serviceId)
            ->orderBy('order_index')
            ->get();

        return response()->json($sections);
    }

    /**
     * Store a newly created section or update existing one.
     */
    public function saveSection(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|uuid|exists:services,id',
            'section_type' => 'required|string|in:hero,howitworks,steps,benefits,partners,faq,cta,calculator,testimonials',
            'section_name' => 'required|string|max:255',
            'config' => 'nullable|array',
            'visible' => 'boolean',
            'order_index' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->only([
            'id', // Capturar ID para ediciones
            'service_id',
            'section_type',
            'section_name',
            'config',
            'visible',
            'order_index',
            'status'
        ]);

        // NO convertir config manualmente - el cast del modelo lo maneja automáticamente
        // El modelo tiene 'config' => 'array' en $casts, así que Eloquent lo codifica/decodifica

        // Si es nueva sección, asignar order_index automático
        if (!$request->has('id')) {
            $maxOrder = ServiceSection::where('service_id', $data['service_id'])->max('order_index');
            $data['order_index'] = ($maxOrder ?? 0) + 1;
            $data['id'] = Str::uuid();
            $data['visible'] = $data['visible'] ?? true;
            $data['status'] = $data['status'] ?? true;
        }

        // Crear o actualizar
        $section = ServiceSection::updateOrCreate(
            ['id' => $request->input('id', $data['id'])],
            $data
        );

        return response()->json($section, 200);
    }

    /**
     * Remove the specified section from storage.
     */
    public function destroy($id)
    {
        if (!$id) {
            return response()->json(['error' => 'id is required'], 400);
        }

        $section = ServiceSection::find($id);

        if (!$section) {
            return response()->json(['error' => 'Section not found'], 404);
        }

        $section->delete();

        return response()->json(['message' => 'Section deleted successfully'], 200);
    }

    /**
     * Toggle boolean field (visible).
     */
    public function boolean(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|uuid|exists:service_sections,id',
            'field' => 'required|string|in:visible',
            'value' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $section = ServiceSection::find($request->input('id'));
        $field = $request->input('field');
        $section->{$field} = $request->input('value');
        $section->save();

        return response()->json($section, 200);
    }

    /**
     * Reorder sections.
     */
    public function reorderSections(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|uuid|exists:services,id',
            'sections' => 'required|array',
            'sections.*.id' => 'required|uuid|exists:service_sections,id',
            'sections.*.order_index' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $serviceId = $request->input('service_id');
        $sections = $request->input('sections');

        foreach ($sections as $section) {
            ServiceSection::where('id', $section['id'])
                ->where('service_id', $serviceId)
                ->update(['order_index' => $section['order_index']]);
        }

        return response()->json(['message' => 'Sections reordered successfully'], 200);
    }
}
