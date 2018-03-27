import app from 'flarum/app';
import Message from 'flagrow/canned-messages/models/Message';
import Settings from 'flagrow/canned-messages/components/Settings';
import addMessagesPane from 'flagrow/canned-messages/addMessagesPane';

app.initializers.add('flagrow-canned-messages', app => {
    app.store.models['flagrow-canned-message'] = Message;

    app.extensionSettings['flagrow-canned-messages'] = () => app.modal.show(new Settings());

    addMessagesPane();
});
