<?php

namespace Flagrow\CannedMessages\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;

class MessageSerializer extends AbstractSerializer
{
    public function getType($model)
    {
        return 'flagrow-canned-message';
    }

    protected function getDefaultAttributes($model)
    {
        return $model->toArray();
    }
}
