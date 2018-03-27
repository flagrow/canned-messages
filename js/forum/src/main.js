import app from 'flarum/app';
import Message from 'flagrow/saved-messages/models/Message';

app.initializers.add('flagrow-saved-messages', app => {
    app.store.models['flagrow-saved-message'] = Message;
});
