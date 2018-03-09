const angular = require('angular');
const faker = require('faker');
require('angular-mocks');
require('./index.js');

describe('NavigationItemController', () => {
    let ctrl;
    let locals;
    let bindings;
    let compile;

    beforeEach(angular.mock.module('buildium.angular-elements.navigation'));

    beforeEach(angular.mock.inject(($componentController) => {
        locals = {};
        bindings = {};

        compile = function compileComponent() {
            ctrl = $componentController('bdNavigationItem', locals, bindings);
        };
    }));

    describe('onAccordionToggleChange', () => {
        it('should set a corresponding property on the controller', () => {
            compile();

            let isOpen = faker.random.boolean();
            ctrl.onAccordionToggleChange(isOpen);
            expect(ctrl.isOpen).toEqual(isOpen);
        });

        it('should call the onToggle callback if provided', () => {
            bindings.onToggle = jasmine.createSpy('onToggle');
            compile();

            let isActive = faker.random.boolean();
            ctrl.onAccordionToggleChange(isActive);
            expect(bindings.onToggle).toHaveBeenCalledWith({ isActive });
        });
    });
});
