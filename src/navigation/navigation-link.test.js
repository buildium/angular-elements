const angular = require('angular');
require('angular-mocks');
require('./index.js');

describe('NavigationLinkController', () => {
    let ctrl;
    let locals;
    let bindings;
    let compile;
    const $state = jasmine.createSpyObj('$state', ['go']);
    const $element = jasmine.createSpyObj('$element', ['append']);

    beforeEach(angular.mock.module('buildium.angular-elements.navigation'));

    beforeEach(() => {
        $state.go.calls.reset();

        angular.mock.module({
            $state,
            $element
        });
    });

    beforeEach(angular.mock.inject(($componentController) => {
        locals = {};
        bindings = {};

        compile = function compileComponent() {
            ctrl = $componentController('bdNavigationLink', locals, bindings);
        };
    }));

    describe('onClick', () => {
        const event = jasmine.createSpyObj('event', ['preventDefault']);

        beforeEach(() => {
            event.preventDefault.calls.reset();
        });

        it('should prevent the default behavior if the link is disabled', () => {
            bindings.linkDisabled = true;
            compile();

            ctrl.onClick(event);
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('should allow the default behavior if the link is not disabled', () => {
            bindings.linkDisabled = false;
            compile();

            ctrl.onClick(event);
            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        it('should navigation using $state if an sref is provided', () => {
            bindings.linkSref = 'hello.world';
            compile();

            ctrl.onClick(event);
            expect($state.go).toHaveBeenCalledWith(bindings.linkSref);
        });
    });
});
