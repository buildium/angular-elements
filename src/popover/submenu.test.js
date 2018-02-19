const $ = require('jquery');
const angular = require('angular');
require('angular-mocks');
require('./index.js');

/* global window */
window.$ = $;

describe('Service: buildium.angular-elements.popover.BdSubmenu', () => {
    let $rootScope,
        $timeout,
        $document,
        $compile,
        BdSubmenu;

    beforeEach(angular.mock.module('buildium.angular-elements.popover'));

    beforeEach(angular.mock.inject((_$rootScope_, _$timeout_, _BdSubmenu_, _$document_, _$compile_) => {
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        $document = _$document_;
        BdSubmenu = _BdSubmenu_;
        $compile = _$compile_;
    }));

    afterEach(() => {
        $document.find('body').off('click.submenu');
    });

    it('should store the current element', () => {
        const fakeElem = angular.element('<div><div class="popover__container"><div class="popover__body"></div></div></div>');

        BdSubmenu.display(fakeElem);
        const el = $compile(fakeElem)($rootScope);
        BdSubmenu.display(el);
        $rootScope.$digest();

        // element echoed back
        expect(BdSubmenu.currentElement).toEqual(fakeElem);
    });

    it('should start the timer if if the "startTimer()" method is called', () => {
        // create a fake element being shown.
        const fakeElem = angular.element('<div><div class="popover__container"><div class="popover__body"></div></div></div>');

        BdSubmenu.display(fakeElem);
        const el = $compile(fakeElem)($rootScope);
        BdSubmenu.display(el);
        $rootScope.$digest();

        // timer will only start if there is a "current element" - our fake element above
        BdSubmenu.startTimer();
        $timeout.flush();
        $rootScope.$digest();

        // no current == none opened
        expect(BdSubmenu.currentElement).toBe(null);
    });

    it('should cancel the timer if the "stopTimer()" method is called', () => {
        const fakeElem = angular.element('<div><div class="popover__container"><div class="popover__body"></div></div></div>');

        BdSubmenu.display(fakeElem);
        const el = $compile(fakeElem)($rootScope);
        BdSubmenu.display(el);
        BdSubmenu.stopTimer();
        $rootScope.$digest();

        expect(BdSubmenu.currentElement).toEqual(fakeElem);
    });
});
