<?php

namespace Flagrow\CannedMessages\Listeners;

use Flagrow\CannedMessages\Validators\SettingsValidator;
use Flarum\Event\PrepareSerializedSetting;
use Illuminate\Contracts\Events\Dispatcher;

class CheckBBTagFormat
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PrepareSerializedSetting::class, [$this, 'check']);
    }

    public function check(PrepareSerializedSetting $event)
    {
        if ($event->key !== 'flagrow.canned-messages.bbtag') {
            return;
        }

        /**
         * @var $validator SettingsValidator
         */
        $validator = app(SettingsValidator::class);

        $validator->assertValid([
            'bbtag' => $event->value,
        ]);
    }

}
