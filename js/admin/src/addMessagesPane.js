import {extend} from 'flarum/extend';
import app from 'flarum/app';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import MessagesPage from 'flagrow/canned-messages/components/MessagesPage';

export default function () {
    // create the route
    app.routes['flagrow-canned-messages'] = {
        path: '/flagrow/canned-messages',
        component: MessagesPage.component(),
    };

    extend(AdminNav.prototype, 'items', items => {
        // add the Image Upload tab to the admin navigation menu
        items.add('flagrow-canned-messages', AdminLinkButton.component({
            href: app.route('flagrow-canned-messages'),
            icon: 'map-signs',
            children: app.translator.trans('flagrow-canned-messages.admin.menu.title'),
            description: app.translator.trans('flagrow-canned-messages.admin.menu.description'),
        }));
    });
}
