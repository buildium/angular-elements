const $ = require('jquery');
const angular = require('angular');
require('angular-mocks');
require('./index.js');

describe('Directive: buildium.angular-elements.popover', () => {
    let elem,
        $compile,
        scope,
        popoverCtrl,
        mockSubmenuSvc;

    beforeEach(angular.mock.module('buildium.angular-elements.popover', ($provide) => {
        mockSubmenuSvc = jasmine.createSpyObj('mockSubmenuSvc', ['display', 'startTimer', 'stopTimer']);

        function mockFilter() {
            return jasmine.createSpy('bdSanitizeForIdentifierFilter').and.callFake(item => item);
        }

        $provide.value('BdSubmenu', mockSubmenuSvc);
        $provide.value('bdSanitizeForIdentifierFilter', mockFilter);
        $provide.value('PopUps', jasmine.createSpyObj('PopUps', ['openModal']));
    }));

    beforeEach(angular.mock.inject((_$rootScope_, _$compile_) => {
        scope = _$rootScope_;
        $compile = _$compile_;

        elem = angular.element(
            '<bd-popover link-id="rentalsMenu.Title">' +
            '   <ul class="sub-menu">' +
            '       <li ng-repeat="menuItem in rentalsMenu.ChildItems" bd-menu-item="menuItem"></li>' +
            '   </ul>' +
            '</bd-popover>'
        );

        $compile(elem)(scope);
        scope.$digest(); 

        popoverCtrl = elem.controller('bdPopover');
    }));

    it('should call "BdSubmenu.startTimer" on "mouseleave"', () => {
        popoverCtrl.mouseLeave();

        expect(mockSubmenuSvc.startTimer).toHaveBeenCalled();
    });

    it('should call "BdSubmenu.stopTimer" on "mouseenter"', () => {
        popoverCtrl.mouseEnter();

        expect(mockSubmenuSvc.stopTimer).toHaveBeenCalled();
    });

    it('should render a pointer', () => {
        expect($(elem).find('.popover__pointer').length).toBe(0);

        elem = angular.element('<bd-popover link-id="rentalsMenu.Title" pointer="true"></bd-popover>');

        $compile(elem)(scope);
        scope.$digest(); 

        expect($(elem).find('.popover__pointer').length).toBe(1);
    }); 
});
