<?php

namespace Flagrow\CannedMessages\Api\Controllers;

use Flagrow\CannedMessages\Repositories\MessageRepository;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Core\Access\AssertPermissionTrait;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class MessageDeleteController extends AbstractDeleteController
{
    use AssertPermissionTrait;

    /**
     * @var MessageRepository
     */
    protected $messages;

    public function __construct(MessageRepository $messages)
    {
        $this->messages = $messages;
    }

    protected function delete(ServerRequestInterface $request)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $id = Arr::get($request->getQueryParams(), 'id');

        $field = $this->messages->findOrFail($id);

        $this->messages->delete($field);
    }
}
