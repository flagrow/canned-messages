# Canned Messages by ![Flagrow logo](https://avatars0.githubusercontent.com/u/16413865?v=3&s=20) [Flagrow](https://discuss.flarum.org/d/1832-flagrow-extension-developer-group), a project of [Gravure](https://gravure.io/)

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/flagrow/canned-messages/blob/master/LICENSE.md) [![Latest Stable Version](https://img.shields.io/packagist/v/flagrow/canned-messages.svg)](https://packagist.org/packages/flagrow/canned-messages) [![Total Downloads](https://img.shields.io/packagist/dt/flagrow/canned-messages.svg)](https://packagist.org/packages/flagrow/canned-messages) [![Donate](https://img.shields.io/badge/patreon-support-yellow.svg)](https://www.patreon.com/flagrow) [![Join our Discord server](https://discordapp.com/api/guilds/240489109041315840/embed.png)](https://flagrow.io/join-discord)

This extension adds a new bbcode which will display predefined messages created by an administrator.
The messages can be updated anytime in the admin panel and will immediately reflect the new content on the forum.

## Installation

Use [Bazaar](https://discuss.flarum.org/d/5151-flagrow-bazaar-the-extension-marketplace) or install manually:

```bash
composer require flagrow/canned-messages
```

## Updating

```bash
composer update flagrow/canned-messages
php flarum migrate
php flarum cache:clear
```

## Configuration

You can add new messages under the "Canned Messages" tab of the admin panel.
Each message has a unique key that must be inserted along with the bbcode.
You can define a different content for different locales.
The script will first try to find a message for the given key and locale, then the given key and no locale, and fallbacks to a default text if no message is found.

By default the extension uses the `[CANNED-MESSAGE]` bbcode, but you can change it to something else in the "advanced settings".
Keep in mind this will break all existing canned messages using a different tag.
If you want to use a custom tag name, better set it early.

Make sure to clear the forum cache with `php flarum cache:clear` and your browser cache after changing the tag name.

There are currently no usage permissions. Anybody can use any of the message keys in their posts.

Messages are not secret, the full list is loaded with the forum in order to provide the live preview.
Anybody with knowledge of the Flarum data store can read the list of existing messages.

## Support our work

We prefer to keep our work available to everyone.
In order to do so we rely on voluntary contributions on [Patreon](https://www.patreon.com/flagrow).

## Security

If you discover a security vulnerability within Canned Messages, please send an email to the Gravure team at security@gravure.io. All security vulnerabilities will be promptly addressed.

Please include as many details as possible. You can use `php flarum info` to get the PHP, Flarum and extension versions installed.

## Links

- [Flarum Discuss post](https://discuss.flarum.org/d/10547-flagrow-canned-messages)
- [Source code on GitHub](https://github.com/flagrow/canned-messages)
- [Report an issue](https://github.com/flagrow/canned-messages/issues)
- [Download via Packagist](https://packagist.org/packages/flagrow/canned-messages)

An extension by [Flagrow](https://flagrow.io/), a project of [Gravure](https://gravure.io/).
