'use strict';

var $ = require('jquery');
var angular = require('angular');
require('angular-mocks');
require('./index.js');

describe('Directive: buildium.angular-elements.popover', function () {
    var elem,
        $compile,
        scope,
        popoverCtrl,
        mockSubmenuSvc,
        mockPopUps,
        mockFilter;

    beforeEach(angular.mock.module('buildium.angular-elements.popover', function ($provide) {
        mockSubmenuSvc = {
            display : function display() {},
            startTimer : function startTimer() {},
            stopTimer : function stopTimer() {}
        };
        mockFilter = function () {
            return function (item) {
                return item;
            }
        };

        $provide.value('BdSubmenu', mockSubmenuSvc);
        $provide.value('bdSanitizeForIdentifierFilter', mockFilter);

        mockPopUps = {
            openModal : function openModal() {}
        };

        $provide.value('PopUps', mockPopUps);

        spyOn(mockSubmenuSvc, 'display').and.callThrough();
        spyOn(mockSubmenuSvc, 'startTimer').and.callThrough();
        spyOn(mockSubmenuSvc, 'stopTimer').and.callThrough();
    }));

    beforeEach(angular.mock.inject(function (_$rootScope_, _$compile_) {
        scope = _$rootScope_;
        $compile = _$compile_;

        elem = angular.element(
            '<bd-popover title="rentalsMenu.Title">' +
            '   <ul class="sub-menu">' +
            '       <li ng-repeat="menuItem in rentalsMenu.ChildItems" bd-menu-item="menuItem"></li>' +
            '   </ul>' +
            '</bd-popover>'
        );

        $compile(elem)(scope);
        scope.$digest(); 

        popoverCtrl = elem.controller('bdPopover');
    }));

    it('should call "BdSubmenu.startTimer" on "mouseleave"', function () {
        popoverCtrl.mouseLeave();

        expect(mockSubmenuSvc.startTimer).toHaveBeenCalled();
    });

    it('should call "BdSubmenu.stopTimer" on "mouseenter"', function () {
        popoverCtrl.mouseEnter();

        expect(mockSubmenuSvc.stopTimer).toHaveBeenCalled();
    });

    it('should render a pointer', function () {
        expect($(elem).find('.popover__pointer').length).toBe(0);

        elem = angular.element('<bd-popover title="rentalsMenu.Title" pointer="true"></bd-popover>');

        $compile(elem)(scope);
        scope.$digest(); 

        expect($(elem).find('.popover__pointer').length).toBe(1);
    }); 
});

