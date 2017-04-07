'use strict';

var moduleName = 'buildium.angular-elements.popover';

/**
 * @ngdoc module
 * @name popover
 * @module popover
 */
angular.module(moduleName, [])
/**
* @ngdoc directive
* @name bdPopover
* @module popover
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
*
* @example
* ```
* <bd-popover selected="false" title="Ygritte" pointer="true" show-on-hover="true" link-class="popover-link" container-class="'popover'" pointer-class="'popover__pointer'" show-on-hover="true" on-link-click="controller.onClick()">
*    <popover-link>
*        <span class="tooltip">
*            Ygritte quotes
*        </span>
*    </popover-link>
*    <popover-body>
*      <h1>You know nothing, Jon Snow</h1>
*   </popover-body>
* </bd-popover>
```
*
*
*/
.directive('bdPopover', ['$rootScope', 'BdSubmenu', function BdPopover($rootScope, BdSubmenu) {
    var directive = {};

    directive.restrict = 'E';
    directive.template = '\n        <a href\n           id="bd-popover-{{:: ctrl.title}}"\n           insert-point="popover-link"\n           ng-click="!ctrl.showOnHover && ctrl.linkClicked()"\n           ng-mouseover="ctrl.showOnHover && ctrl.linkClicked()"\n           ng-mouseleave="ctrl.mouseLeave($event)"\n           ng-class="{ \'popover__link--selected\' : ctrl.selected }"\n           class="popover__link {{ctrl.popoverLinkClass}}">\n            <!-- anything within <popover-link> will appear here -->\n        </a>\n        <div class="popover__container popover__right" ng-class="ctrl.popoverContainerClass">\n            <div insert-point="popover-body"\n                 ng-class="{ \'pointer\': ctrl.pointer }"\n                 ng-show="ctrl.isOpen"\n                 ng-mouseenter="ctrl.mouseEnter($event)"\n                 ng-mouseleave="ctrl.mouseLeave($event)">\n                <span class="popover__pointer" ng-class="ctrl.pointerClass" ng-if="::ctrl.pointer"></span>\n\n                <!-- anything within <popover-body> will appear here -->\n            </div>\n        </div>';
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

    /* @ngInject */
    directive.controller = ['$rootScope', '$element', 'BdSubmenu', function PopoverCtrl($rootScope, $element, BdSubmenu) {
        var ctrl = this;

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
        scope.$watch(function () {
            return BdSubmenu.currentElement === elem;
        }, function (isOpen) {
            ctrl.isOpen = isOpen;
        });

        transclude(scope.$parent, function (clone) {
            angular.forEach(clone, function (cloneElem) {
                var insertId = void 0,
                    target = void 0;

                if (!cloneElem.attributes) {
                    return;
                }

                insertId = cloneElem.tagName.toLowerCase();
                target = $(elem).find('[insert-point="' + insertId + '"]');

                target.append(cloneElem);
            });
        });
    };

    return directive;
}]).service('BdSubmenu', ['$rootScope', '$timeout', '$document', require('./submenu')]);

module.exports = moduleName;