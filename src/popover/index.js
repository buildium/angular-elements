let moduleName = 'buildium.angular-elements.popover';

/**
 * @ngdoc module
 * @name popover
 * @module popover
 */
angular.module(moduleName, [])
.directive('bdPopover', ['$rootScope', '$element', 'BdSubmenu', function BdPopover($rootScope, $element, BdSubmenu) {
    let directive = {};

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

    /* @ngInject */
    directive.controller = [$rootScope, $element, function PopoverCtrl($rootScope, $element) {
        let ctrl = this;

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
        scope.$watch(function() {
            return BdSubmenu.currentElement === elem;
        }, function(isOpen) {
            ctrl.isOpen = isOpen;
        });

        transclude(scope.$parent, function(clone) {
            angular.forEach(clone, function(cloneElem) {
                let insertId,
                    target;

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

}]).service('BdSubmenu', [$rootScope, $timeout, $document, require('./submenu')]);


module.exports = moduleName;