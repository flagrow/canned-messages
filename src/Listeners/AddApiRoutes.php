<?php

namespace Flagrow\SavedMessages\Listeners;

use Flagrow\SavedMessages\Api\Controllers;
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
            '/flagrow/saved-messages',
            'flagrow.saved-messages.api.messages.index',
            Controllers\MessageIndexController::class
        );
        $routes->post(
            '/flagrow/saved-messages',
            'flagrow.saved-messages.api.messages.store',
            Controllers\MessageStoreController::class
        );
        $routes->patch(
            '/flagrow/saved-messages/{id:[0-9]+}',
            'flagrow.saved-messages.api.messages.update',
            Controllers\MessageUpdateController::class
        );
        $routes->delete(
            '/flagrow/saved-messages/{id:[0-9]+}',
            'flagrow.saved-messages.api.messages.delete',
            Controllers\MessageDeleteController::class
        );
    }
}
