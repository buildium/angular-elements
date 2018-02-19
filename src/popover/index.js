const moduleName = 'buildium.angular-elements.popover';
const $ = require('jquery');

/**
 * @ngdoc module
 * @name buildium.angular-elements.popover
 * @module buildium.angular-elements.popover
 */
angular.module(moduleName, [])

/**
 * @ngdoc directive
 * @name bdPopover
 * @module buildium.angular-elements.popover
 * @restrict E
 * 
 * @description
 *
 * Attaches a popover tooltip to an element with custom content.
 * 
 * @param {boolean} selected 
 *
 * @param {string} title
 * 
 * @param {boolean} pointer
 *
 * @param {string} popoverContainerClass
 *
 * @param {string} popoverLinkClass 
 *
 * @param {string} pointerClass 
 *
 * @param {boolean} showOnHover
 *
 * @param {function} onLinkClick 
 *
 * @example
    <example name="bd-popover" module="buildium.angular-elements.popover">
        <file name="index.html">
            <bd-popover selected="false" 
                        title="Ygritte" 
                        pointer="true" 
                        show-on-hover="true" 
                        link-class="popover-link" 
                        container-class="'popover'" 
                        pointer-class="'popover__pointer'" 
                        show-on-hover="true" 
                        on-link-click="controller.onClick()">
                <popover-link>
                    <span class="tooltip">Ygritte quotes</span>
                </popover-link>
                <popover-body>
                    <h1>You know nothing, Jon Snow</h1>
                </popover-body>
            </bd-popover>
        </file>
    </example>
 *
 */
.directive('bdPopover', ['BdSubmenu', function BdPopoverDirective(BdSubmenu) {
    const directive = {};

    directive.restrict = 'E';
    directive.template = `
        <a href
           id="bd-popover-{{:: ctrl.title}}"
           insert-point="popover-link"
           ng-click="!ctrl.showOnHover && ctrl.linkClicked()"
           ng-mouseover="ctrl.showOnHover && ctrl.linkClicked()"
           ng-mouseleave="ctrl.mouseLeave($event)"
           ng-class="{ 'popover__link--selected' : ctrl.selected }"
           class="popover__link {{ctrl.popoverLinkClass}}">
            <!-- anything within <popover-link> will appear here -->
        </a>
        <div class="popover__container popover__right" ng-class="ctrl.popoverContainerClass">
            <div insert-point="popover-body"
                 ng-class="{ 'pointer': ctrl.pointer }"
                 ng-show="ctrl.isOpen"
                 ng-mouseenter="ctrl.mouseEnter($event)"
                 ng-mouseleave="ctrl.mouseLeave($event)">
                <span class="popover__pointer" ng-class="ctrl.pointerClass" ng-if="::ctrl.pointer"></span>

                <!-- anything within <popover-body> will appear here -->
            </div>
        </div>`;
    directive.scope = {
        selected: '=',
        title: '=',
        pointer: '=',
        popoverContainerClass: '=containerClass',
        popoverLinkClass: '=linkClass',
        pointerClass: '=',
        showOnHover: '=',
        onLinkClick: '&?'
    };
    directive.controllerAs = 'ctrl';
    directive.transclude = true;
    directive.bindToController = true;

    directive.controller = ['$rootScope', '$element', function PopoverCtrl($rootScope, $element) {
        const ctrl = this;

        ctrl.isOpen = false;

        ctrl.linkClicked = function linkClicked() {
            BdSubmenu.display($element);
            $rootScope.$broadcast('bd.popover.clicked', $element);
            if (ctrl.onLinkClick) {
                ctrl.onLinkClick();
            }
        };

        ctrl.mouseEnter = BdSubmenu.stopTimer;
        ctrl.mouseLeave = BdSubmenu.startTimer;
    }];

    directive.link = function link(scope, elem, attrs, ctrl, transclude) {
        scope.$watch(() => BdSubmenu.currentElement === elem, (isOpen) => {
            ctrl.isOpen = isOpen;
        });

        transclude(scope.$parent, (clone) => {
            angular.forEach(clone, (cloneElem) => {
                if (!cloneElem.attributes) {
                    return;
                }

                const insertId = cloneElem.tagName.toLowerCase();
                const target = $(elem).find(`[insert-point="${insertId}"]`);

                target.append(cloneElem);
            });
        });
    };

    return directive;
}])

.service('BdSubmenu', ['$rootScope', '$timeout', '$document', require('./submenu')]);

module.exports = moduleName;
