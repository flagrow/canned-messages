<?php

namespace Flagrow\SavedMessages;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;

/**
 * @property int $id
 * @property string $key
 * @property string $locale
 * @property string $style
 * @property string $content
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class SavedMessage extends AbstractModel
{
    public $timestamps = true;

    protected $table = 'flagrow_saved_messages';

    protected $visible = [
        'key',
        'locale',
        'style',
        'content',
    ];

    protected $fillable = [
        'key',
        'locale',
        'style',
        'content',
    ];
}
