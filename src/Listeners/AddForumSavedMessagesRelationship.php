<?php

namespace Flagrow\CannedMessages\Listeners;

use Flagrow\CannedMessages\Api\Serializers\MessageSerializer;
use Flagrow\CannedMessages\Repositories\MessageRepository;
use Flarum\Api\Controller\ShowForumController;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\ConfigureApiController;
use Flarum\Event\GetApiRelationship;
use Flarum\Event\PrepareApiData;
use Flarum\Locale\LocaleManager;
use Illuminate\Contracts\Events\Dispatcher;

class AddForumSavedMessagesRelationship
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetApiRelationship::class, [$this, 'getApiRelationship']);
        $events->listen(PrepareApiData::class, [$this, 'loadRelationship']);
        $events->listen(ConfigureApiController::class, [$this, 'includeRelationship']);
    }

    public function getApiRelationship(GetApiRelationship $event)
    {
        if ($event->isRelationship(ForumSerializer::class, 'flagrow-canned-messages')) {
            return $event->serializer->hasMany($event->model, MessageSerializer::class, 'flagrow-canned-messages');
        }
    }

    public function loadRelationship(PrepareApiData $event)
    {
        /**
         * @var $messages MessageRepository
         */
        $messages = app(MessageRepository::class);

        /**
         * @var $locales LocaleManager
         */
        $locales = app(LocaleManager::class);

        if ($event->isController(ShowForumController::class)) {
            $event->data['flagrow-canned-messages'] = $messages->messagesForLocale($locales->getLocale());
        }
    }

    public function includeRelationship(ConfigureApiController $event)
    {
        if ($event->isController(ShowForumController::class)) {
            $event->addInclude([
                'flagrow-canned-messages',
            ]);
        }
    }
}
