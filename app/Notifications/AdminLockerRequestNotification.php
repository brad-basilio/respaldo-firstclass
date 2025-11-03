<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Mail\RawHtmlMail;
use Illuminate\Support\Facades\Log;

class AdminLockerRequestNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $lockerRequest;
    protected $coorporative_email;

    public function __construct($lockerRequest)
    {
        $this->lockerRequest = $lockerRequest;
        $this->coorporative_email = \App\Models\General::where('correlative', 'coorporative_email')->first();
    }

    /**
     * Variables disponibles para la plantilla de email del administrador.
     */
    public static function availableVariables()
    {
        return [
            'nombre' => 'Nombre del solicitante',
            'email' => 'Correo electrónico del solicitante',
            'telefono' => 'Teléfono del solicitante',
            'tipo_documento' => 'Tipo de documento (DNI, CE, Pasaporte)',
            'numero_documento' => 'Número de documento',
            'direccion' => 'Dirección del solicitante',
            'ciudad' => 'Ciudad del solicitante',
            'departamento' => 'Departamento del solicitante',
            'mensaje' => 'Mensaje adicional',
            'fecha_solicitud' => 'Fecha de la solicitud',
            'admin_url' => 'URL al panel de administración',
        ];
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        Log::info('Enviando a admin: ' . $notifiable->description);
        
        // Buscar plantilla específica para administrador
        $template = \App\Models\General::where('correlative', 'admin_locker_request_email')->first();
        if (!$template) {
            $template = \App\Models\General::where('correlative', 'locker_request_email')->first();
        }

        $body = $template
            ? \App\Helpers\Text::replaceData($template->description, [
                'nombre' => $this->lockerRequest->name,
                'email' => $this->lockerRequest->email ?: 'No proporcionado',
                'telefono' => $this->lockerRequest->phone,
                'tipo_documento' => $this->lockerRequest->document_type,
                'numero_documento' => $this->lockerRequest->document_number,
                'direccion' => $this->lockerRequest->address ?: 'No proporcionada',
                'ciudad' => $this->lockerRequest->city ?: 'No proporcionada',
                'departamento' => $this->lockerRequest->department ?: 'No proporcionado',
                'mensaje' => $this->lockerRequest->message ?: 'Sin mensaje adicional',
                'year' => date('Y'),
                'fecha_solicitud' => $this->lockerRequest->created_at
                    ? $this->lockerRequest->created_at->translatedFormat('d \d\e F \d\e\l Y')
                    : '',
                'admin_url' => url('/admin/locker-requests'),
            ])
            : 'Nueva solicitud de casillero virtual de: ' . $this->lockerRequest->name;

        return (new RawHtmlMail($body, '[NUEVA SOLICITUD CASILLERO] ' . $this->lockerRequest->name, $this->coorporative_email->description));
    }
}
