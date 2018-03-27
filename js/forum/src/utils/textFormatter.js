import app from 'flarum/app';

export function filterSavedMessage(tag) {
    const message = app.store.getBy('flagrow-canned-message', 'key', tag.getAttribute('key'));

    let classes = '';
    let content = '';

    if (message) {
        switch (message.style()) {
            case 'alert':
                classes = 'Alert';
                break;
            case 'alert-success':
                classes = 'Alert Alert--success';
                break;
            case 'alert-error':
                classes = 'Alert Alert--error';
                break;
        }

        content = message.content();
    } else {
        classes = 'Alert';
        content = app.translator.trans('flagrow-canned-messages.forum.bbcode.invalid-key');
    }

    tag.setAttribute('classes', classes);
    tag.setAttribute('content', content);

    return true;
}
