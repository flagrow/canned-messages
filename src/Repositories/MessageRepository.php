<?php

namespace Flagrow\CannedMessages\Repositories;

use Flagrow\CannedMessages\Message;
use Flagrow\CannedMessages\Validators\MessageValidator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class MessageRepository
{
    /**
     * @var Message
     */
    protected $savedMessage;

    /**
     * @var MessageValidator
     */
    protected $validator;

    public function __construct(Message $message, MessageValidator $validator)
    {
        $this->savedMessage = $message;
        $this->validator = $validator;
    }

    protected function query(): Builder
    {
        return $this->savedMessage->newQuery()->orderBy('key')->orderBy('locale');
    }

    public function messagesForLocale(string $locale): Collection
    {
        return $this->query()->where('locale', $locale)->orWhere('locale', null)->get();
    }

    public function all(): Collection
    {
        return $this->query()->get();
    }

    public function findOrFail($id): Message
    {
        return $this->query()->findOrFail($id);
    }

    /**
     * @param string $locale
     * @param string $key
     * @return Message|null
     */
    public function findForLocale(string $locale, string $key)
    {
        return $this->query()->where(function (Builder $query) use ($locale) {
            $query->where('locale', $locale)->orWhereNull('locale');
        })->where('key', $key)->orderBy('locale', 'desc')->first();
    }

    public function store(array $attributes): Message
    {
        $this->validator->assertValid($attributes);

        $message = new Message($attributes);
        $message->save();

        return $message;
    }

    public function update(Message $message, array $attributes): Message
    {
        $this->validator->assertValid($attributes);

        $message->fill($attributes);
        $message->save();

        return $message;
    }

    public function delete(Message $message)
    {
        $message->delete();
    }
}
