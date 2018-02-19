const $ = require('jquery');

/**
 * @ngdoc service
 * @name BdSubmenu
 * @module buildium.angular-elements.popover
 * @kind function 
 * @require $rootScope
 * @require $timeout
 * @require $document
 * 
 * @description
 * Control the positioning and display of the popover element
 */
module.exports = function BdSubmenu($rootScope, $timeout, $document) {
    const submenuService = this;
    const mouseOutDelay = 250;

    let $currentElement,
        mouseoutTimer;

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

    /**
     * @ngdoc method
     * @name BdSubmenu#display
     * @description
     * Positions popover against the given element (`elem`) and displays it on the page
     * @param {DOMElement} elem 
     */
    submenuService.display = function display(elem) {
        $currentElement = elem;

        submenuService.positionPopoverBody($currentElement);
        submenuService.stopTimer();

        // If a link w/i a submenu is clicked close that submenu immediately (don't do the fade-out animation)
        $document.find('.sub-menu').one('click', (event) => {
            if ($(event.target).is('a')) {
                $rootScope.$apply(() => {
                    unsetCurrentElement();

                    // This variable will be read by the animation code in the SubMenuContainerAnimation
                    submenuService.hideImmediately = true;
                });
            }
        });
    };

    /**
     * @ngdoc method
     * @name BdSubmenu#startTimer
     * @description
     * Start the timer if there is an element that the BdSubmenu service considers open. 
     * At the end of the time, the popover is closed. 
     * This ignores the mouseLeave event that may be fired on a submenu as it is in the process of fading out.
     */
    submenuService.startTimer = function startTimer() {
        if ($currentElement) {
            mouseoutTimer = $timeout(submenuService.closeAll, mouseOutDelay);
        }
    };

    /**
     * @ngdoc method
     * @name BdSubmenu#stopTimer
     * @description
     * Cancels any timer started by `startTimer`
     */
    submenuService.stopTimer = function stopTimer() {
        $timeout.cancel(mouseoutTimer);
    };

    /**
     * @ngdoc method
     * @name BdSubmenu#closeAll
     * @description
     * Closes any active popover elements
     */
    submenuService.closeAll = unsetCurrentElement;

    /**
     * @ngdoc method
     * @name BdSubmenu#positionPopoverBody
     * @description
     * Positions popover against the given element (`elem`)
     * @param {DOMElement} elem 
     */
    submenuService.positionPopoverBody = function positionPopoverBody(elem) {
        const popoverContainer = $(elem).find('.popover__container');
        const popoverBody = $(elem).find('.popover__body');
        const containerOffsetLeft = popoverContainer.offset().left;

        if (containerOffsetLeft < 0) {
            popoverBody.css({
                position: 'relative',
                left: `${Math.abs(containerOffsetLeft)}px`
            });
        }
    };
};
