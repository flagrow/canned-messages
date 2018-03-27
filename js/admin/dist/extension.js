'use strict';

System.register('flagrow/canned-messages/addMessagesPane', ['flarum/extend', 'flarum/app', 'flarum/components/AdminNav', 'flarum/components/AdminLinkButton', 'flagrow/canned-messages/components/MessagesPage'], function (_export, _context) {
    "use strict";

    var extend, app, AdminNav, AdminLinkButton, MessagesPage;

    _export('default', function () {
        // create the route
        app.routes['flagrow-canned-messages'] = {
            path: '/flagrow/canned-messages',
            component: MessagesPage.component()
        };

        extend(AdminNav.prototype, 'items', function (items) {
            // add the Image Upload tab to the admin navigation menu
            items.add('flagrow-canned-messages', AdminLinkButton.component({
                href: app.route('flagrow-canned-messages'),
                icon: 'map-signs',
                children: app.translator.trans('flagrow-canned-messages.admin.menu.title'),
                description: app.translator.trans('flagrow-canned-messages.admin.menu.description')
            }));
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsAdminNav) {
            AdminNav = _flarumComponentsAdminNav.default;
        }, function (_flarumComponentsAdminLinkButton) {
            AdminLinkButton = _flarumComponentsAdminLinkButton.default;
        }, function (_flagrowCannedMessagesComponentsMessagesPage) {
            MessagesPage = _flagrowCannedMessagesComponentsMessagesPage.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/canned-messages/components/LocaleDropdown', ['flarum/app', 'flarum/Component', 'flarum/components/Select'], function (_export, _context) {
    "use strict";

    var app, Component, Select, LocaleDropdown;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsSelect) {
            Select = _flarumComponentsSelect.default;
        }],
        execute: function () {
            LocaleDropdown = function (_Component) {
                babelHelpers.inherits(LocaleDropdown, _Component);

                function LocaleDropdown() {
                    babelHelpers.classCallCheck(this, LocaleDropdown);
                    return babelHelpers.possibleConstructorReturn(this, (LocaleDropdown.__proto__ || Object.getPrototypeOf(LocaleDropdown)).apply(this, arguments));
                }

                babelHelpers.createClass(LocaleDropdown, [{
                    key: 'init',
                    value: function init() {
                        this.options = {
                            all: app.translator.trans('flagrow-canned-messages.admin.locales.all')
                        };

                        for (var locale in app.data.locales) {
                            if (!app.data.locales.hasOwnProperty(locale)) {
                                continue;
                            }

                            this.options[locale] = app.data.locales[locale] + ' (' + locale + ')';
                        }
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this2 = this;

                        return Select.component({
                            options: this.options,
                            value: this.props.value === null ? 'all' : this.props.value,
                            onchange: function onchange(locale) {
                                if (locale === 'all') {
                                    _this2.props.onchange(null);
                                } else {
                                    _this2.props.onchange(locale);
                                }
                            }
                        });
                    }
                }]);
                return LocaleDropdown;
            }(Component);

            _export('default', LocaleDropdown);
        }
    };
});;
'use strict';

System.register('flagrow/canned-messages/components/MessageEdit', ['flarum/app', 'flarum/Component', 'flarum/components/Button', 'flagrow/canned-messages/components/LocaleDropdown', 'flarum/components/Select'], function (_export, _context) {
    "use strict";

    var app, Component, Button, LocaleDropdown, Select, MessageEdit;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flagrowCannedMessagesComponentsLocaleDropdown) {
            LocaleDropdown = _flagrowCannedMessagesComponentsLocaleDropdown.default;
        }, function (_flarumComponentsSelect) {
            Select = _flarumComponentsSelect.default;
        }],
        execute: function () {
            MessageEdit = function (_Component) {
                babelHelpers.inherits(MessageEdit, _Component);

                function MessageEdit() {
                    babelHelpers.classCallCheck(this, MessageEdit);
                    return babelHelpers.possibleConstructorReturn(this, (MessageEdit.__proto__ || Object.getPrototypeOf(MessageEdit)).apply(this, arguments));
                }

                babelHelpers.createClass(MessageEdit, [{
                    key: 'init',
                    value: function init() {
                        this.message = this.props.message;
                        this.dirty = false;
                        this.processing = false;

                        if (this.message === null) {
                            this.initNewMessage();
                        }
                    }
                }, {
                    key: 'initNewMessage',
                    value: function initNewMessage() {
                        this.message = app.store.createRecord('flagrow-canned-message', {
                            attributes: {
                                key: '',
                                locale: null,
                                style: null,
                                content: ''
                            }
                        });
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this2 = this;

                        var bbtag = app.data.settings['flagrow.canned-messages.bbtag'] || 'CANNED-MESSAGE';

                        return m('tr', [m('td', [m('input.FormControl', {
                            value: this.message.key(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'key'))
                        }), this.message.key() ? ['Use as ', m('code', '[' + bbtag + ']' + this.message.key() + '[/' + bbtag + ']')] : null]), m('td', [LocaleDropdown.component({
                            value: this.message.locale(),
                            onchange: this.updateAttribute.bind(this, 'locale')
                        })]), m('td', [Select.component({
                            value: this.message.style() === null ? 'none' : this.message.style(),
                            onchange: function onchange(value) {
                                _this2.updateAttribute('style', value === 'none' ? null : value);
                            },
                            options: {
                                none: 'None',
                                alert: 'Default Alert',
                                'alert-success': 'Success Alert',
                                'alert-error': 'Error Alert'
                            }
                        })]), m('td', [m('input.FormControl', {
                            value: this.message.content(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'content'))
                        })]), m('td', m('li.ButtonGroup', [Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            children: app.translator.trans('flagrow-canned-messages.admin.buttons.' + (this.message.exists ? 'save' : 'add') + '-message'),
                            loading: this.processing,
                            disabled: !this.dirty,
                            onclick: this.saveMessage.bind(this)
                        }), this.message.exists ? Button.component({
                            type: 'submit',
                            className: 'Button Button--danger',
                            children: app.translator.trans('flagrow-canned-messages.admin.buttons.delete-message'),
                            loading: this.processing,
                            onclick: this.deleteMessage.bind(this)
                        }) : '']))]);
                    }
                }, {
                    key: 'updateAttribute',
                    value: function updateAttribute(attribute, value) {
                        this.message.pushAttributes(babelHelpers.defineProperty({}, attribute, value));

                        this.dirty = true;
                    }
                }, {
                    key: 'saveMessage',
                    value: function saveMessage() {
                        var _this3 = this;

                        this.processing = true;

                        var wasNew = !this.message.exists;

                        this.message.save(this.message.data.attributes).then(function () {
                            _this3.processing = false;
                            _this3.dirty = false;

                            if (wasNew) {
                                _this3.initNewMessage();
                            }

                            m.redraw();
                        }).catch(function (err) {
                            _this3.processing = false;

                            throw err;
                        });
                    }
                }, {
                    key: 'deleteMessage',
                    value: function deleteMessage() {
                        var _this4 = this;

                        this.processing = true;

                        this.message.delete().then(function () {
                            _this4.processing = false;

                            m.redraw();
                        }).catch(function (err) {
                            _this4.processing = false;

                            throw err;
                        });
                    }
                }]);
                return MessageEdit;
            }(Component);

            _export('default', MessageEdit);
        }
    };
});;
'use strict';

System.register('flagrow/canned-messages/components/MessagesPage', ['flarum/app', 'flarum/components/Page', 'flarum/components/Button', 'flagrow/canned-messages/components/MessageEdit', 'flagrow/canned-messages/utils/sortByProp', 'flagrow/canned-messages/components/Settings'], function (_export, _context) {
    "use strict";

    var app, Page, Button, MessageEdit, sortByProp, Settings, MessagesPane;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsPage) {
            Page = _flarumComponentsPage.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flagrowCannedMessagesComponentsMessageEdit) {
            MessageEdit = _flagrowCannedMessagesComponentsMessageEdit.default;
        }, function (_flagrowCannedMessagesUtilsSortByProp) {
            sortByProp = _flagrowCannedMessagesUtilsSortByProp.default;
        }, function (_flagrowCannedMessagesComponentsSettings) {
            Settings = _flagrowCannedMessagesComponentsSettings.default;
        }],
        execute: function () {
            MessagesPane = function (_Page) {
                babelHelpers.inherits(MessagesPane, _Page);

                function MessagesPane() {
                    babelHelpers.classCallCheck(this, MessagesPane);
                    return babelHelpers.possibleConstructorReturn(this, (MessagesPane.__proto__ || Object.getPrototypeOf(MessagesPane)).apply(this, arguments));
                }

                babelHelpers.createClass(MessagesPane, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(MessagesPane.prototype.__proto__ || Object.getPrototypeOf(MessagesPane.prototype), 'init', this).call(this);

                        app.request({
                            method: 'GET',
                            url: app.forum.attribute('apiUrl') + '/flagrow/canned-messages'
                        }).then(function (result) {
                            app.store.pushPayload(result);

                            m.redraw();
                        });
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var messages = app.store.all('flagrow-canned-message').sort(sortByProp('key'));

                        return m('.container', [m('table.Flagrow-Canned-Messages', [m('thead', m('tr', [m('th', app.translator.trans('flagrow-canned-messages.admin.strings.key')), m('th', app.translator.trans('flagrow-canned-messages.admin.strings.locale')), m('th', app.translator.trans('flagrow-canned-messages.admin.strings.style')), m('th', app.translator.trans('flagrow-canned-messages.admin.strings.content'))])), m('tbody', messages.map(function (message) {
                            return MessageEdit.component({
                                key: message.id(),
                                message: message
                            });
                        })), m('tbody', MessageEdit.component({
                            key: 'new',
                            message: null
                        }))]), Button.component({
                            className: 'Button',
                            icon: 'cog',
                            children: app.translator.trans('flagrow-canned-messages.admin.buttons.configure-advanced'),
                            onclick: function onclick() {
                                app.modal.show(new Settings());
                            }
                        })]);
                    }
                }]);
                return MessagesPane;
            }(Page);

            _export('default', MessagesPane);
        }
    };
});;
'use strict';

System.register('flagrow/canned-messages/components/Settings', ['flarum/app', 'flarum/components/SettingsModal', 'flarum/components/Button'], function (_export, _context) {
    "use strict";

    var app, SettingsModal, Button, settingsPrefix, translationPrefix, Settings;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }],
        execute: function () {
            settingsPrefix = 'flagrow.canned-messages.';
            translationPrefix = 'flagrow-canned-messages.admin.settings.';

            Settings = function (_SettingsModal) {
                babelHelpers.inherits(Settings, _SettingsModal);

                function Settings() {
                    babelHelpers.classCallCheck(this, Settings);
                    return babelHelpers.possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).apply(this, arguments));
                }

                babelHelpers.createClass(Settings, [{
                    key: 'title',
                    value: function title() {
                        return app.translator.trans(translationPrefix + 'title');
                    }
                }, {
                    key: 'form',
                    value: function form() {
                        return [m('.Form-group', [Button.component({
                            className: 'Button',
                            icon: 'map-signs',
                            children: app.translator.trans('flagrow-canned-messages.admin.buttons.configure-messages'),
                            onclick: function onclick() {
                                m.route(app.route('flagrow-canned-messages'));
                                app.modal.close();
                            }
                        })]), m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'bbtag')), m('input.FormControl', {
                            bidi: this.setting(settingsPrefix + 'bbtag'),
                            placeholder: 'CANNED-MESSAGE'
                        }), m('.helpText', app.translator.trans('flagrow-canned-messages.admin.settings.bbtag-help'))])];
                    }
                }]);
                return Settings;
            }(SettingsModal);

            _export('default', Settings);
        }
    };
});;
'use strict';

System.register('flagrow/canned-messages/main', ['flarum/app', 'flagrow/canned-messages/models/Message', 'flagrow/canned-messages/components/Settings', 'flagrow/canned-messages/addMessagesPane'], function (_export, _context) {
    "use strict";

    var app, Message, Settings, addMessagesPane;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flagrowCannedMessagesModelsMessage) {
            Message = _flagrowCannedMessagesModelsMessage.default;
        }, function (_flagrowCannedMessagesComponentsSettings) {
            Settings = _flagrowCannedMessagesComponentsSettings.default;
        }, function (_flagrowCannedMessagesAddMessagesPane) {
            addMessagesPane = _flagrowCannedMessagesAddMessagesPane.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-canned-messages', function (app) {
                app.store.models['flagrow-canned-message'] = Message;

                app.extensionSettings['flagrow-canned-messages'] = function () {
                    return app.modal.show(new Settings());
                };

                addMessagesPane();
            });
        }
    };
});;
'use strict';

System.register('flagrow/canned-messages/models/Message', ['flarum/Model', 'flarum/utils/mixin'], function (_export, _context) {
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
                        return '/flagrow/canned-messages' + (this.exists ? '/' + this.data.id : '');
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

System.register('flagrow/canned-messages/utils/sortByProp', [], function (_export, _context) {
    "use strict";

    _export('default', function (prop) {
        var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'asc';

        return function (a, b) {
            var value1 = a[prop]();
            var value2 = b[prop]();

            var result = 0;

            if (value1 > value2) {
                result = 1;
            } else if (value2 > value1) {
                result = -1;
            }

            if (order === 'desc') {
                result *= -1;
            }

            return result;
        };
    });

    return {
        setters: [],
        execute: function () {}
    };
});