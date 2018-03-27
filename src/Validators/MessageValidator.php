<?php

namespace Flagrow\CannedMessages\Validators;

use Flarum\Core\Validator\AbstractValidator;

class MessageValidator extends AbstractValidator
{
    protected function getRules()
    {
        return [
            'key' => 'required|alpha_dash',
            'locale' => 'sometimes|string',
            'style' => 'sometimes|string',
            'content' => 'required|string',
        ];
    }
}
