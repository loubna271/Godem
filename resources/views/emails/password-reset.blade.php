

@component('mail::message')
# Réinitialisation de votre mot de passe

Vous recevez cet email parce que nous avons reçu une demande de réinitialisation de mot de passe pour votre compte.

@component('mail::button', ['url' => $resetUrl])
Réinitialiser le mot de passe
@endcomponent

Ce lien expirera dans 60 minutes.

Si vous n'avez pas demandé de réinitialisation, ignorez simplement cet email.
@endcomponent