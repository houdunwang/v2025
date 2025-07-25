<?php

namespace App\Services;

use App\Models\Lesson;
use App\Models\LessonSubscribe;
use App\Models\Order;
use App\Models\Package;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class OrderService
{
    public function handle(string $sn)
    {
        $order = Order::where('sn', $sn)->firstOrFail();
        if ($order->pay_state) return;
        switch (get_class($order->orderable)) {
            case 'App\Models\Package':
                $res =  $this->packageHandle($order->user, $order->orderable);
                $order->pay_state = true;
                $order->save();
                return $res;
            case 'App\Models\Lesson':
                $res =  $this->lessonHandle($order->user, $order->orderable);
                $order->pay_state = true;
                $order->save();
                return $res;
        }
    }

    public function lessonHandle(User $user, Lesson $lesson)
    {
        return LessonSubscribe::create([
            'user_id' => $user->id,
            'lesson_id' => $lesson->id,
        ]);
    }

    public function packageHandle(User $user, Package $package)
    {
        $subscribe = $user->subscribe;
        if (!$subscribe) {
            return $user->subscribe()->create([
                'end_time' => now()->addMonth($package->months),
            ]);
        }
        $endTime = $subscribe->end_time > now() ? $subscribe->end_time : now();
        $subscribe->end_time = $endTime->addMonth($package->months);
        $subscribe->save();
        return $subscribe;
    }

    public function create(Model $model)
    {
        return $model->orders()->create([
            'user_id' => Auth::id(),
            'sn' => $this->getSn($model),
            'price' => $model->price,
            'pay_state' => false,
            'subject' => $model->title
        ]);
    }

    public function getSn(Model $model)
    {
        return 'HD-' . Auth::id() . '-' .  time() . mt_rand(1000, 9999);
    }
}
