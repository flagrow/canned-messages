<?php

namespace Flagrow\CannedMessages\Api\Controllers;

use Flagrow\CannedMessages\Api\Serializers\MessageSerializer;
use Flagrow\CannedMessages\Repositories\MessageRepository;
use Flarum\Api\Controller\AbstractCollectionController;
use Flarum\Core\Access\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class MessageIndexController extends AbstractCollectionController
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

        return $this->messages->all();
    }
}
