/**
 * @ngdoc directive
 * @name bdAccordionGroup
 * @module buildium.angular-elements.accordion
 * @restrict A
 *
 * @description
 * 
 * Encapsulates a section of content that can be toggled by {@link buildium.angular-elements.accordion.directive:bdAccordionToggle bdAccordionToggle}
 *
 * @param {String} openClass - class to add when accordion group is open
 * 
 * @example
 *
    <example name="bd-accordion-group" module="buildium.angular-elements.accordion">
        <file name="index.html">
            <section class="page-content">
                <bd-accordion>
                    <ul>
                        <li bd-accordion-toggle>
                            Click this to toggle
                            <ul bd-accordion-group>
                                <li class="list-item">link 1</li>
                                <li class="list-item">link 2</li>
                            </ul>
                        </li>
                    </ul>
                </bd-accordion>
            </section>
        </file>
    </example>
 *
 */

// @ngInject
module.exports = function AccordionGroup() {
    const SPACEBAR_KEYCODE = 32;
    const directive = {};

    directive.restrict = 'A';
    directive.require = '^^bdAccordionToggle';
    directive.scope = false;

    directive.link = function link(scope, element, attrs, accordionToggleCtrl) {
        element.on('click keypress', (event) => {
            if (event.type === 'click' || event.keyCode === SPACEBAR_KEYCODE) {
                event.stopPropagation();
            }
        });

        function toggleOpen() {
            element.toggleClass('hide', !scope.toggle.isOpen);
            if (attrs.openClass) {
                element.toggleClass(attrs.openClass, !scope.toggle.isOpen);
            }
        }

        toggleOpen();

        scope.$watch('toggle.isOpen', () => {
            toggleOpen();
        });
    };

    return directive;
};
