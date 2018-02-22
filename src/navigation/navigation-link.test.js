const angular = require('angular');
require('angular-mocks');
require('./index.js');

describe('NavigationLinkController', () => {
    let ctrl;
    let locals;
    let bindings;
    let compile;

    beforeEach(angular.mock.module('buildium.angular-elements.navigation'));

    beforeEach(angular.mock.inject(($componentController) => {
        locals = {};
        bindings = {};

        compile = function compileComponent() {
            ctrl = $componentController('bdNavigationLink', locals, bindings);
        };
    }));

    describe('onClick', () => {
        it('should prevent the default behavior if the link is disabled', () => {
            bindings.linkDisabled = true;
            const event = jasmine.createSpyObj('event', ['preventDefault']);
            compile();

            ctrl.onClick(event);
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('should allow the default behavior if the link is not disabled', () => {
            bindings.linkDisabled = false;
            const event = jasmine.createSpyObj('event', ['preventDefault']);
            compile();

            ctrl.onClick(event);
            expect(event.preventDefault).not.toHaveBeenCalled();
        });
    });
});