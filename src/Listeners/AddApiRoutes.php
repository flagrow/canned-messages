<?php

namespace Flagrow\CannedMessages\Listeners;

use Flagrow\CannedMessages\Api\Controllers;
use Flarum\Event\ConfigureApiRoutes;
use Illuminate\Contracts\Events\Dispatcher;

class AddApiRoutes
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'routes']);
    }

    public function routes(ConfigureApiRoutes $routes)
    {
        $routes->get(
            '/flagrow/canned-messages',
            'flagrow.canned-messages.api.messages.index',
            Controllers\MessageIndexController::class
        );
        $routes->post(
            '/flagrow/canned-messages',
            'flagrow.canned-messages.api.messages.store',
            Controllers\MessageStoreController::class
        );
        $routes->patch(
            '/flagrow/canned-messages/{id:[0-9]+}',
            'flagrow.canned-messages.api.messages.update',
            Controllers\MessageUpdateController::class
        );
        $routes->delete(
            '/flagrow/canned-messages/{id:[0-9]+}',
            'flagrow.canned-messages.api.messages.delete',
            Controllers\MessageDeleteController::class
        );
    }
}
