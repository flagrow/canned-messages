<?php

namespace Flagrow\CannedMessages;

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
class Message extends AbstractModel
{
    public $timestamps = true;

    protected $table = 'flagrow_canned_messages';

    const DEFAULT_BBTAG = 'CANNED-MESSAGE';

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
