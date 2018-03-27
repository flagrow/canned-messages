<?php

namespace Flagrow\CannedMessages\Listeners;

use DirectoryIterator;
use Flarum\Event\ConfigureLocales;
use Flarum\Event\ConfigureWebApp;
use Illuminate\Contracts\Events\Dispatcher;

class AddClientAssets
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureWebApp::class, [$this, 'addAssets']);
        $events->listen(ConfigureLocales::class, [$this, 'addLocales']);
    }

    public function addAssets(ConfigureWebApp $app)
    {
        if ($app->isAdmin()) {
            $app->addAssets([
                __DIR__ . '/../../js/admin/dist/extension.js',
                __DIR__ . '/../../resources/less/admin.less',
            ]);
        }

        if ($app->isForum()) {
            $app->addAssets([
                __DIR__ . '/../../js/forum/dist/extension.js',
            ]);
        }

        $app->addBootstrapper('flagrow/canned-messages/main');
    }

    public function addLocales(ConfigureLocales $event)
    {
        foreach (new DirectoryIterator(__DIR__ . '/../../resources/locale') as $file) {
            if ($file->isFile() && in_array($file->getExtension(), ['yml', 'yaml'])) {
                $event->locales->addTranslations($file->getBasename('.' . $file->getExtension()), $file->getPathname());
            }
        }
    }
}
