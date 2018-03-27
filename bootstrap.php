<?php

namespace Flagrow\CannedMessages;

use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(Listeners\AddApiRoutes::class);
    $events->subscribe(Listeners\AddBBCode::class);
    $events->subscribe(Listeners\AddClientAssets::class);
    $events->subscribe(Listeners\AddForumSavedMessagesRelationship::class);
    $events->subscribe(Listeners\CheckBBTagFormat::class);
};
