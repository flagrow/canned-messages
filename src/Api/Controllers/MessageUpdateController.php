<?php

namespace Flagrow\CannedMessages\Api\Controllers;

use Flagrow\CannedMessages\Api\Serializers\MessageSerializer;
use Flagrow\CannedMessages\Repositories\MessageRepository;
use Flarum\Api\Controller\AbstractResourceController;
use Flarum\Core\Access\AssertPermissionTrait;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class MessageUpdateController extends AbstractResourceController
{
    use AssertPermissionTrait;

    public $serializer = MessageSerializer::class;

    /**
     * @var MessageRepository
     */
    protected $messages;

    public function __construct(MessageRepository $messages)
    {
        $this->messages = $messages;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $id = Arr::get($request->getQueryParams(), 'id');

        $field = $this->messages->findOrFail($id);

        $attributes = Arr::get($request->getParsedBody(), 'data.attributes', []);

        return $this->messages->update($field, $attributes);
    }
}
