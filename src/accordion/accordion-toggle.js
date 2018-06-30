/**
 * @ngdoc directive
 * @name bdAccordionToggle
 * @module buildium.angular-elements.accordion
 * @restrict A
 *
 * @description
 * 
 * Element responsible for toggling a {@link buildium.angular-elements.accordion.directive:bdAccordionGroup bdAccordionGroup} open or closed
 *
 * @param {Boolean} [isOpen] - is toggle open by default
 * @param {Boolean} [disabled] - is toggle disabled
 * @param {Function} [onChange] - change event to fire when open state changes
 * @param {String} [openClass] - class to add when toggle is open
 * @param {String} [disabledClass] - class to add when toggle is disabled
 * @param {String} [toggleClassName] - changes toggle trigger to element matching this class name
 * 
 * @example
 *
    <example name="bd-accordion-toggle" module="buildium.angular-elements.accordion">
        <file name="index.html">
            <section class="page-content">
                <bd-accordion>
                    <ul>
                        <li bd-accordion-toggle is-open="false">
                            This accordion group starts closed
                            <ul bd-accordion-group>
                                <li class="list-item list-item--bulleted">Hello world</li>
                                <li class="list-item list-item--bulleted">Foo Bar</li>
                            </ul>
                        </li>
                        <li bd-accordion-toggle is-open="true">
                            This accordion group starts open
                            <ul bd-accordion-group>
                                <li class="list-item list-item--bulleted">Hello world</li>
                                <li class="list-item list-item--bulleted">Foo Bar</li>
                            </ul>
                        </li>
                        <li bd-accordion-toggle is-open="false">
                            This accordion group starts closed
                            <ul bd-accordion-group>
                                <li class="list-item list-item--bulleted">Hello world</li>
                                <li class="list-item list-item--bulleted">Foo Bar</li>
                            </ul>
                        </li>
                    </ul>
                </bd-accordion>
            </section>
        </file>
    </example>
 */

// @ngInject
module.exports = function AccordionToggle() {
    const SPACEBAR_KEYCODE = 32;
    const directive = {};

    directive.restrict = 'A';
    directive.require = '^^bdAccordion';
    
    directive.scope = true;
    directive.bindToController = {
        isOpen: '<?',
        onChange: '&?',
        disabled: '<?',
        openClass: '@?',
        disabledClass: '@?'
    };

    directive.controllerAs = 'toggle';

    directive.controller = ['$element', function accordionToggleController($element) {
        const toggle = this;

        toggle.$onChanges = function $onChanges(changes) {
            if (changes.isOpen && typeof toggle.onChange === 'function') {
                toggle.onChange({isAccordionGroupOpen: changes.isOpen.currentValue});
            }

            if (changes.disabled && toggle.disabledClass) {
                $element.toggleClass(toggle.disabledClass, changes.disabled.currentValue);
            }
        };
    }];

    directive.link = function link(scope, element, attrs, accordionCtrl) {
        const toggle = scope.toggle;

        accordionCtrl.addSection(scope);

        if (attrs.openClass) {
            element.toggleClass(attrs.openClass, !!toggle.isOpen);
        }
        
        if (attrs.disabledClass) {
            element.toggleClass(attrs.disabledClass, toggle.disabled);
        }

        function toggleAccordion() {
            toggle.isOpen = !toggle.isOpen;

            if (attrs.openClass) {
                element.toggleClass(attrs.openClass, toggle.isOpen);
            }

            if (typeof toggle.onChange === 'function') {
                toggle.onChange({isAccordionGroupOpen: toggle.isOpen});
            }
        }

        toggle.handleAccordionEvent = function handleAccordionEvent(event) {
            if (!toggle.disabled) {
                if (!event || event.type === 'click' || event.keyCode === SPACEBAR_KEYCODE.Space) {
                    toggleAccordion();

                    if (event && toggle.isOpen) {
                        accordionCtrl.closeAllBut(scope);
                    }
                }
            }
        };

        let toggleElement = element;

        if (attrs.toggleClassName) {
            toggleElement = element.find(`.${attrs.toggleClassName}`);
        }

        toggleElement.on('click keypress', (event) => {
            scope.$apply(() => {
                toggle.handleAccordionEvent(event);
            });
        });
    };

    return directive;
};
