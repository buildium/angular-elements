const angular = require('angular');
const faker = require('faker');
require('angular-mocks');
require('./index.js');

describe('NavigationItemController', () => {
    let ctrl;
    let locals;
    let bindings;
    let compile;
    let $attrs;
    let $transclude;

    beforeEach(angular.mock.module('buildium.angular-elements.navigation'));

    beforeEach(() => {
        $transclude = jasmine.createSpyObj('$transclude', ['isSlotFilled']);

        angular.mock.module({
            $transclude
        });
    });

    beforeEach(angular.mock.inject(($componentController) => {
        $attrs = {}; 

        locals = {
            $attrs,
            $transclude
        };

        bindings = {};

        compile = function compileComponent() {
            ctrl = $componentController('bdNavigationItem', locals, bindings);
            ctrl.$onInit();
        };
    }));

    describe('hasSubMenu', () => {
        [
            null,
            undefined,
            false
        ].forEach(hasSubMenu => {
            it('should respect binding as false if provided', () => {
                bindings.hasSubMenu = $attrs.hasSubMenu = hasSubMenu;
                compile();
                expect(ctrl.hasSubMenu).toBeFalsy();
            });
        });

        [
            true,
            [],
            faker.random.number({min: 1})
        ].forEach(hasSubMenu => {
            it('should respect binding as true if provided', () => {
                bindings.hasSubMenu = $attrs.hasSubMenu = hasSubMenu;
                compile();
                expect(ctrl.hasSubMenu).toBeTruthy();
            });
        });

        it('should be true if binding is not set and a menu is provided', () => {
            $transclude.isSlotFilled.and.returnValue(true);
            compile();
            expect(ctrl.hasSubMenu).toBeTruthy();
        });

        it('should give precedence to binding value', () => {
            bindings.hasSubMenu = $attrs.hasSubMenu = false;
            $transclude.isSlotFilled.and.returnValue(true);

            compile();
            expect(ctrl.hasSubMenu).toBeFalsy();
        });
    });
});
