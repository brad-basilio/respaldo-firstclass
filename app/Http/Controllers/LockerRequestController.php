<?php

namespace App\Http\Controllers;

use App\Models\LockerRequest;
use App\Notifications\LockerRequestNotification;
use App\Helpers\NotificationHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LockerRequestController extends BasicController
{
    public $model = LockerRequest::class;

    public function beforeSave(Request $request): array
    {
        $messages = [
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'email.email' => 'El correo electrónico debe tener el formato user@domain.com.',
            'email.max' => 'El correo electrónico no debe exceder los 320 caracteres.',
            'phone.required' => 'El teléfono es obligatorio.',
            'phone.string' => 'El teléfono debe ser una cadena de texto.',
            'document_type.required' => 'El tipo de documento es obligatorio.',
            'document_type.in' => 'El tipo de documento debe ser DNI, CE o Pasaporte.',
            'document_number.required' => 'El número de documento es obligatorio.',
            'document_number.string' => 'El número de documento debe ser una cadena de texto.',
            'address.string' => 'La dirección debe ser una cadena de texto.',
            'city.string' => 'La ciudad debe ser una cadena de texto.',
            'department.string' => 'El departamento debe ser una cadena de texto.',
            'message.string' => 'El mensaje debe ser una cadena de texto.'
        ];

        // Validación de los datos
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:320',
            'phone' => 'required|string|max:20',
            'document_type' => 'required|in:DNI,CE,Pasaporte',
            'document_number' => 'required|string|max:20',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'department' => 'nullable|string|max:100',
            'message' => 'nullable|string',
        ], $messages);

        return $validatedData;
    }

    public function afterSave(Request $request, object $jpa, ?bool $isNew)
    {
        try {
            Log::info('LockerRequestController - Iniciando envío de notificaciones', [
                'locker_request_id' => $jpa->id,
                'email' => $jpa->email,
                'name' => $jpa->name,
                'document' => $jpa->document_type . ' - ' . $jpa->document_number
            ]);

            // Enviar notificación al cliente y al administrador
            NotificationHelper::sendToClientAndAdmin($jpa, new LockerRequestNotification($jpa));
            
            Log::info('LockerRequestController - Notificaciones enviadas exitosamente', [
                'locker_request_id' => $jpa->id
            ]);

        } catch (\Exception $e) {
            Log::error('LockerRequestController - Error enviando notificaciones', [
                'error' => $e->getMessage(),
                'locker_request_id' => $jpa->id ?? 'unknown',
                'trace' => $e->getTraceAsString(),
                'email_settings' => [
                    'mail_host' => config('mail.mailers.smtp.host'),
                    'mail_port' => config('mail.mailers.smtp.port'),
                    'mail_encryption' => config('mail.mailers.smtp.encryption'),
                    'mail_from' => config('mail.from.address'),
                ]
            ]);
            // No lanzamos la excepción para no interrumpir el flujo del guardado
        }
    }
}
