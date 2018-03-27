<?php

namespace Flagrow\CannedMessages\Listeners;

use Flagrow\CannedMessages\Repositories\MessageRepository;
use Flarum\Event\ConfigureFormatter;
use Flarum\Event\ConfigureFormatterRenderer;
use Flarum\Locale\LocaleManager;
use Illuminate\Contracts\Events\Dispatcher;
use s9e\TextFormatter\Utils;

class AddBBCode
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureFormatter::class, [$this, 'configure']);
        $events->listen(ConfigureFormatterRenderer::class, [$this, 'render']);
    }

    public function configure(ConfigureFormatter $event)
    {
        $event->configurator->BBCodes->addCustom(
            '[SAVED-MESSAGE key={IDENTIFIER;useContent}]',
            '<div class="Flagrow-Saved-Message Flagrow-Saved-Message--{@key} {@classes}">{@content}</div>'
        );

        $tag = $event->configurator->tags->get('SAVED-MESSAGE');

        // It's necessary to register the attributes here or the javascript preview doesn't work
        // But if they are marked as not required they won't be saved to the database
        $tag->attributes->add('classes')->required = false;
        $tag->attributes->add('content')->required = false;
        $tag->filterChain
            ->prepend([static::class, 'noOpFilter'])
            ->setJS('function(tag) { return System.get("flagrow/canned-messages/utils/textFormatter").filterSavedMessage(tag); }');
    }

    public function render(ConfigureFormatterRenderer $event)
    {
        $event->xml = Utils::replaceAttributes($event->xml, 'SAVED-MESSAGE', function ($attributes) {
            $key = array_get($attributes, 'key');

            /**
             * @var $messages MessageRepository
             */
            $messages = app(MessageRepository::class);

            /**
             * @var $locales LocaleManager
             */
            $locales = app(LocaleManager::class);

            $classes = '';

            if ($key && $message = $messages->findForLocale($locales->getLocale(), $key)) {
                switch ($message->style) {
                    case 'alert':
                        $classes = 'Alert';
                        break;
                    case 'alert-success':
                        $classes = 'Alert Alert--success';
                        break;
                    case 'alert-error':
                        $classes = 'Alert Alert--error';
                        break;
                }

                $content = $message->content;
            } else {
                $classes = 'Alert';
                $content = $locales->getTranslator()->trans('flagrow-canned-messages.forum.bbcode.invalid-key');
            }

            $attributes['classes'] = $classes;
            $attributes['content'] = $content;

            return $attributes;
        });
    }

    public static function noOpFilter()
    {
        // We apparently can't provide a javascript-only filter, so we add this useless-but-successful php filter
        return true;
    }
}
