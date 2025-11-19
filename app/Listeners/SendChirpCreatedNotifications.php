<?php

namespace App\Listeners;

use App\Events\ChirpCreated;
use App\Models\User;
use App\Notifications\NewChirp;

class SendChirpCreatedNotifications
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ChirpCreated $event): void
    {
        // Chirpの作者以外の全ユーザーに通知を送信
        User::whereNot('id', $event->chirp->user_id)
            ->each(fn (User $user) => $user->notify(new NewChirp($event->chirp)));
    }
}
