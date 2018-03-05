const angular = require('angular');
require('angular-mocks');
require('./index.js');

describe('VerticalNavigationController', () => {
    let ctrl;
    let compile;

    beforeEach(angular.mock.module('buildium.angular-elements.navigation'));

    beforeEach(angular.mock.inject(($componentController) => {
        compile = function compileComponent() {
            ctrl = $componentController('bdVerticalNavigation');
        };
    }));

    describe('getMenuClassName', () => {
        [
            ['hello', 'navigation__menu--hello'],
            ['hello-world', 'navigation__menu--helloworld'],
            ['hello   WORLD', 'navigation__menu--helloworld'],
            ['hello & world', 'navigation__menu--helloworld'],
        ].forEach(([title, expectedClassName]) => {
            it('should create valid class name based on the navigation item title', () => {
                compile();
                expect(ctrl.getMenuClassName(title)).toEqual(expectedClassName);
            });
        });
    });
});
