<?php

namespace App\Notifications;

use App\Models\LockerRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LockerRequestNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $lockerRequest;

    /**
     * Create a new notification instance.
     */
    public function __construct(LockerRequest $lockerRequest)
    {
        $this->lockerRequest = $lockerRequest;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $isAdmin = !($notifiable instanceof LockerRequest);

        if ($isAdmin) {
            // Email para administrador
            return (new MailMessage)
                ->subject('Nueva Solicitud de Casillero Virtual - FirstClass')
                ->greeting('¡Nueva Solicitud de Casillero!')
                ->line('Se ha recibido una nueva solicitud de apertura de casillero virtual.')
                ->line('**Datos del Solicitante:**')
                ->line('**Nombre:** ' . $this->lockerRequest->name)
                ->line('**Email:** ' . ($this->lockerRequest->email ?? 'No proporcionado'))
                ->line('**Teléfono:** ' . ($this->lockerRequest->phone ?? 'No proporcionado'))
                ->line('**Documento:** ' . ($this->lockerRequest->document_type ?? 'N/A') . ' - ' . ($this->lockerRequest->document_number ?? 'N/A'))
                ->line('**Dirección:** ' . ($this->lockerRequest->address ?? 'No proporcionada'))
                ->line('**Ciudad:** ' . ($this->lockerRequest->city ?? 'N/A'))
                ->line('**Departamento:** ' . ($this->lockerRequest->department ?? 'N/A'))
                ->line('**Mensaje:** ' . ($this->lockerRequest->message ?? 'Sin mensaje'))
                ->line('**Fecha:** ' . $this->lockerRequest->created_at->format('d/m/Y H:i:s'))
                ->action('Ver en el Panel', url('/admin/locker-requests'))
                ->line('Por favor, contacta al cliente lo antes posible para completar el proceso de apertura.');
        } else {
            // Email para cliente
            return (new MailMessage)
                ->subject('Solicitud de Casillero Virtual Recibida - FirstClass')
                ->greeting('¡Hola ' . $this->lockerRequest->name . '!')
                ->line('Hemos recibido tu solicitud de apertura de **Casillero Virtual FirstClass**.')
                ->line('Nuestro equipo la revisará y se pondrá en contacto contigo en las próximas **24 horas hábiles**.')
                ->line('**Resumen de tu solicitud:**')
                ->line('**Email:** ' . ($this->lockerRequest->email ?? 'No proporcionado'))
                ->line('**Teléfono:** ' . ($this->lockerRequest->phone ?? 'No proporcionado'))
                ->line('**Documento:** ' . ($this->lockerRequest->document_type ?? 'N/A') . ' - ' . ($this->lockerRequest->document_number ?? 'N/A'))
                ->line('**¿Qué sigue?**')
                ->line('1. Verificaremos tus datos')
                ->line('2. Crearemos tu casillero virtual en Miami')
                ->line('3. Te enviaremos tu dirección personal en USA')
                ->line('4. ¡Podrás empezar a comprar!')
                ->action('Ver Estado de Solicitud', url('/mi-cuenta/casillero'))
                ->line('Si tienes alguna pregunta, no dudes en contactarnos.')
                ->salutation('Saludos, ' . config('app.name'));
        }
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(object $notifiable): array
    {
        return [
            'locker_request_id' => $this->lockerRequest->id,
            'name' => $this->lockerRequest->name,
            'email' => $this->lockerRequest->email,
            'phone' => $this->lockerRequest->phone,
        ];
    }
}
