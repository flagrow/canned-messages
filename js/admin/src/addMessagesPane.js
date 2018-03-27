import {extend} from 'flarum/extend';
import app from 'flarum/app';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import MessagesPane from 'flagrow/saved-messages/panes/MessagesPane';

export default function () {
    // create the route
    app.routes['flagrow-saved-messages'] = {
        path: '/flagrow/saved-messages',
        component: MessagesPane.component(),
    };

    // bind the route we created to the three dots settings button
    app.extensionSettings['flagrow-saved-messages'] = () => m.route(app.route('flagrow-saved-messages'));

    extend(AdminNav.prototype, 'items', items => {
        // add the Image Upload tab to the admin navigation menu
        items.add('flagrow-saved-messages', AdminLinkButton.component({
            href: app.route('flagrow-saved-messages'),
            icon: 'map-signs',
            children: app.translator.trans('flagrow-saved-messages.admin.menu.title'),
            description: app.translator.trans('flagrow-saved-messages.admin.menu.description'),
        }));
    });
}
