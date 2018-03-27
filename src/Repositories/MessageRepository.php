<?php

namespace Flagrow\SavedMessages\Repositories;

use Flagrow\SavedMessages\SavedMessage;
use Flagrow\SavedMessages\Validators\MessageValidator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class MessageRepository
{
    /**
     * @var SavedMessage
     */
    protected $savedMessage;

    /**
     * @var MessageValidator
     */
    protected $validator;

    public function __construct(SavedMessage $message, MessageValidator $validator)
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

    public function findOrFail($id): SavedMessage
    {
        return $this->query()->findOrFail($id);
    }

    /**
     * @param string $locale
     * @param string $key
     * @return SavedMessage|null
     */
    public function findForLocale(string $locale, string $key)
    {
        return $this->query()->where(function (Builder $query) use ($locale) {
            $query->where('locale', $locale)->orWhereNull('locale');
        })->where('key', $key)->orderBy('locale', 'desc')->first();
    }

    public function store(array $attributes): SavedMessage
    {
        $this->validator->assertValid($attributes);

        $message = new SavedMessage($attributes);
        $message->save();

        return $message;
    }

    public function update(SavedMessage $message, array $attributes): SavedMessage
    {
        $this->validator->assertValid($attributes);

        $message->fill($attributes);
        $message->save();

        return $message;
    }

    public function delete(SavedMessage $message)
    {
        $message->delete();
    }
}
