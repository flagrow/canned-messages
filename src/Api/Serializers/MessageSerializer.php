<?php

namespace Flagrow\SavedMessages\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;

class MessageSerializer extends AbstractSerializer
{
    public function getType($model)
    {
        return 'flagrow-saved-message';
    }

    protected function getDefaultAttributes($model)
    {
        return $model->toArray();
    }
}
