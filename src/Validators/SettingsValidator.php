<?php

namespace Flagrow\CannedMessages\Validators;

use Flarum\Core\Validator\AbstractValidator;

class SettingsValidator extends AbstractValidator
{
    protected function getRules()
    {
        return [
            'bbtag' => 'sometimes|regex:~^[A-Z_-]+$~',
        ];
    }
}
