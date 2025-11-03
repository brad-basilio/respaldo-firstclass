<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class LockerRequest extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'document_type',
        'document_number',
        'address',
        'city',
        'department',
        'message',
        'seen',
    ];

    protected $casts = [
        'seen' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Route notifications for mail channel
     */
    public function routeNotificationForMail()
    {
        return $this->email;
    }
}
