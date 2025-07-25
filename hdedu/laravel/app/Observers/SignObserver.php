<?php

namespace App\Observers;

use App\Models\Sign;
use App\Models\SignCount;

class SignObserver
{

    private function SignCount(Sign $sign)
    {
        $user = $sign->user;
        SignCount::updateOrCreate([
            'user_id' => $sign->user_id,
        ], [
            'year' => $user->signs()->whereYear('created_at', now())->count(),
            'month' => $user->signs()->whereMonth('created_at', now())->count(),
            'total' => $user->signs()->count(),
        ]);
    }
    /**
     * Handle the Sign "created" event.
     */
    public function created(Sign $sign): void
    {
        $this->SignCount($sign);
    }

    /**
     * Handle the Sign "updated" event.
     */
    public function updated(Sign $sign): void
    {
        //
    }

    /**
     * Handle the Sign "deleted" event.
     */
    public function deleted(Sign $sign): void
    {
        $this->SignCount($sign);
    }

    /**
     * Handle the Sign "restored" event.
     */
    public function restored(Sign $sign): void
    {
        //
    }

    /**
     * Handle the Sign "force deleted" event.
     */
    public function forceDeleted(Sign $sign): void
    {
        //
    }
}
