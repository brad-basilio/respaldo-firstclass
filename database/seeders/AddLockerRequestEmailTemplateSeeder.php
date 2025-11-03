<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AddLockerRequestEmailTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Template de email para CLIENTE - Solicitud de casillero virtual
        DB::table('generals')->insert([
            'correlative' => 'locker_request_email',
            'name' => 'Diseño de email de solicitud de casillero virtual (Cliente)',
            'description' => '
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitud de Casillero Virtual</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">¡Gracias por tu Solicitud!</h1>
                            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Casillero Virtual FirstClass</p>
                        </td>
                    </tr>
                    
                    <!-- Contenido -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hola <strong>{{nombre}}</strong>,
                            </p>
                            
                            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hemos recibido tu solicitud para abrir un <strong>Casillero Virtual</strong>. Nuestro equipo revisará tu información y se pondrá en contacto contigo en las próximas <strong>24 horas hábiles</strong>.
                            </p>
                            
                            <!-- Datos de la solicitud -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="color: #667eea; margin: 0 0 15px 0; font-size: 18px;">📋 Resumen de tu Solicitud</h3>
                                        
                                        <table width="100%" cellpadding="8" cellspacing="0">
                                            <tr>
                                                <td style="color: #666666; font-size: 14px; border-bottom: 1px solid #e0e0e0;"><strong>Teléfono:</strong></td>
                                                <td style="color: #333333; font-size: 14px; border-bottom: 1px solid #e0e0e0;">{{telefono}}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #666666; font-size: 14px; border-bottom: 1px solid #e0e0e0;"><strong>Documento:</strong></td>
                                                <td style="color: #333333; font-size: 14px; border-bottom: 1px solid #e0e0e0;">{{tipo_documento}} - {{numero_documento}}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #666666; font-size: 14px;"><strong>Ciudad:</strong></td>
                                                <td style="color: #333333; font-size: 14px;">{{ciudad}}, {{departamento}}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Próximos pasos -->
                            <div style="background-color: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0; border-radius: 4px;">
                                <h3 style="color: #2e7d32; margin: 0 0 10px 0; font-size: 16px;">✅ Próximos Pasos:</h3>
                                <ol style="color: #333333; font-size: 14px; margin: 0; padding-left: 20px;">
                                    <li style="margin-bottom: 8px;">Verificaremos tu información</li>
                                    <li style="margin-bottom: 8px;">Crearemos tu casillero virtual en Miami</li>
                                    <li style="margin-bottom: 8px;">Te enviaremos tu dirección personal en USA</li>
                                    <li>¡Podrás empezar a comprar y recibir tus productos!</li>
                                </ol>
                            </div>
                            
                            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
                                Si tienes alguna pregunta, no dudes en contactarnos.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                            <p style="color: #666666; font-size: 14px; margin: 0 0 10px 0;">
                                Fecha de solicitud: {{fecha_solicitud}}
                            </p>
                            <p style="color: #999999; font-size: 12px; margin: 0;">
                                © {{year}} FirstClass. Todos los derechos reservados.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
            ',
        ]);

        // Template de email para ADMIN - Notificación de nueva solicitud
        DB::table('generals')->insert([
            'correlative' => 'admin_locker_request_email',
            'name' => 'Diseño de email de solicitud de casillero virtual (Admin)',
            'description' => '
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nueva Solicitud de Casillero Virtual</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">🔔 Nueva Solicitud de Casillero</h1>
                            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Panel de Administración</p>
                        </td>
                    </tr>
                    
                    <!-- Contenido -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Se ha recibido una nueva solicitud de <strong>Casillero Virtual</strong>.
                            </p>
                            
                            <!-- Datos completos del solicitante -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff3cd; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 18px;">👤 Datos del Solicitante</h3>
                                        
                                        <table width="100%" cellpadding="8" cellspacing="0">
                                            <tr>
                                                <td style="color: #666666; font-size: 14px; width: 40%; border-bottom: 1px solid #e0e0e0;"><strong>Nombre:</strong></td>
                                                <td style="color: #333333; font-size: 14px; border-bottom: 1px solid #e0e0e0;">{{nombre}}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #666666; font-size: 14px; border-bottom: 1px solid #e0e0e0;"><strong>Correo:</strong></td>
                                                <td style="color: #333333; font-size: 14px; border-bottom: 1px solid #e0e0e0;">{{email}}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #666666; font-size: 14px; border-bottom: 1px solid #e0e0e0;"><strong>Teléfono:</strong></td>
                                                <td style="color: #333333; font-size: 14px; border-bottom: 1px solid #e0e0e0;">{{telefono}}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #666666; font-size: 14px; border-bottom: 1px solid #e0e0e0;"><strong>Documento:</strong></td>
                                                <td style="color: #333333; font-size: 14px; border-bottom: 1px solid #e0e0e0;">{{tipo_documento}} - {{numero_documento}}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #666666; font-size: 14px; border-bottom: 1px solid #e0e0e0;"><strong>Dirección:</strong></td>
                                                <td style="color: #333333; font-size: 14px; border-bottom: 1px solid #e0e0e0;">{{direccion}}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #666666; font-size: 14px; border-bottom: 1px solid #e0e0e0;"><strong>Ciudad:</strong></td>
                                                <td style="color: #333333; font-size: 14px; border-bottom: 1px solid #e0e0e0;">{{ciudad}}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #666666; font-size: 14px; border-bottom: 1px solid #e0e0e0;"><strong>Departamento:</strong></td>
                                                <td style="color: #333333; font-size: 14px; border-bottom: 1px solid #e0e0e0;">{{departamento}}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #666666; font-size: 14px;"><strong>Mensaje:</strong></td>
                                                <td style="color: #333333; font-size: 14px;">{{mensaje}}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Acción requerida -->
                            <div style="background-color: #d1ecf1; border-left: 4px solid #17a2b8; padding: 15px; margin: 20px 0; border-radius: 4px;">
                                <h3 style="color: #0c5460; margin: 0 0 10px 0; font-size: 16px;">⚡ Acción Requerida:</h3>
                                <p style="color: #0c5460; font-size: 14px; margin: 0;">
                                    Por favor, contacta al cliente en las próximas <strong>24 horas</strong> para completar el proceso de apertura del casillero virtual.
                                </p>
                            </div>
                            
                            <!-- Botón al panel -->
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="{{admin_url}}" style="display: inline-block; padding: 15px 40px; background-color: #667eea; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                                    Ver en el Panel Admin
                                </a>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                            <p style="color: #666666; font-size: 14px; margin: 0 0 10px 0;">
                                Fecha de solicitud: {{fecha_solicitud}}
                            </p>
                            <p style="color: #999999; font-size: 12px; margin: 0;">
                                © {{year}} FirstClass. Panel de Administración.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
            ',
        ]);
    }
}
