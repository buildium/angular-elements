'use strict';

var $ = require('jquery');

// @ngInject
module.exports = function BdSubmenu($rootScope, $timeout, $document) {
    var submenuService = this,
        mouseOutDelay = 250,
        $currentElement = void 0,
        mouseoutTimer = void 0;

    function unsetCurrentElement() {
        $currentElement = null;

        $document.find('body').off('click.submenu');
    }

    Object.defineProperties(submenuService, {
        currentElement: {
            get: function get() {
                return $currentElement;
            }
        }
    });

    submenuService.display = function display(elem) {
        $currentElement = elem;

        submenuService.positionPopoverBody($currentElement);
        submenuService.stopTimer();

        // If a link w/i a submenu is clicked close that submenu immediately (don't do the fade-out animation)
        $document.find('.sub-menu').one('click', function (event) {
            if ($(event.target).is('a')) {
                $rootScope.$apply(function () {
                    unsetCurrentElement();

                    // This variable will be read by the animation code in the SubMenuContainerAnimation
                    submenuService.hideImmediately = true;
                });
            }
        });
    };

    submenuService.startTimer = function startTimer() {
        // Only start the timer if there is an element that the BdSubmenu service considers open. This ignores the mouseLeave event that may be fired on a submenu as it is in the process of fading out.
        if ($currentElement) {
            mouseoutTimer = $timeout(submenuService.closeAll, mouseOutDelay);
        }
    };

    submenuService.stopTimer = function stopTimer() {
        $timeout.cancel(mouseoutTimer);
    };

    submenuService.closeAll = unsetCurrentElement;

    submenuService.positionPopoverBody = function positionPopoverBody(elem) {
        var popoverContainer = void 0,
            popoverBody = void 0,
            containerOffsetLeft = void 0;

        popoverContainer = $(elem).find('.popover__container');
        popoverBody = $(elem).find('.popover__body');
        containerOffsetLeft = popoverContainer.offset().left;

        if (containerOffsetLeft < 0) {
            popoverBody.css({
                'position': 'relative',
                'left': Math.abs(containerOffsetLeft) + 'px'
            });
        }
    };
};