'use strict';

System.register('flagrow/saved-messages/main', ['flarum/app', 'flagrow/saved-messages/models/Message'], function (_export, _context) {
    "use strict";

    var app, Message;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flagrowSavedMessagesModelsMessage) {
            Message = _flagrowSavedMessagesModelsMessage.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-saved-messages', function (app) {
                app.store.models['flagrow-saved-message'] = Message;
            });
        }
    };
});;
'use strict';

System.register('flagrow/saved-messages/models/Message', ['flarum/Model', 'flarum/utils/mixin'], function (_export, _context) {
    "use strict";

    var Model, mixin, Message;
    return {
        setters: [function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumUtilsMixin) {
            mixin = _flarumUtilsMixin.default;
        }],
        execute: function () {
            Message = function (_mixin) {
                babelHelpers.inherits(Message, _mixin);

                function Message() {
                    babelHelpers.classCallCheck(this, Message);
                    return babelHelpers.possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).apply(this, arguments));
                }

                babelHelpers.createClass(Message, [{
                    key: 'apiEndpoint',
                    value: function apiEndpoint() {
                        return '/flagrow/saved-messages' + (this.exists ? '/' + this.data.id : '');
                    }
                }]);
                return Message;
            }(mixin(Model, {
                key: Model.attribute('key'),
                locale: Model.attribute('locale'),
                style: Model.attribute('style'),
                content: Model.attribute('content')
            }));

            _export('default', Message);
        }
    };
});;
'use strict';

System.register('flagrow/saved-messages/utils/textFormatter', ['flarum/app'], function (_export, _context) {
    "use strict";

    var app;
    function filterSavedMessage(tag) {
        var message = app.store.getBy('flagrow-saved-message', 'key', tag.getAttribute('key'));

        var classes = '';
        var content = '';

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
            content = app.translator.trans('flagrow-saved-messages.forum.bbcode.invalid-key');
        }

        tag.setAttribute('classes', classes);
        tag.setAttribute('content', content);

        return true;
    }

    _export('filterSavedMessage', filterSavedMessage);

    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }],
        execute: function () {}
    };
});