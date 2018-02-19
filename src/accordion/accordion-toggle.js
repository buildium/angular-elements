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
            <style>
                .hide { display: none; }
            </style>
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
    directive.require = '^bdAccordion';
    directive.bindToController = true;
    directive.controllerAs = 'vm';
    
    directive.scope = {
        isOpen: '<?',
        onChange: '&?',
        disabled: '<?',
        openClass: '@?',
        disabledClass: '@?'
    };

    directive.controller = ['$element', function AccordionToggleCtrl($element) {
        const vm = this;

        vm.$onChanges = function onChanges(changes) {
            if (typeof vm.onChange === 'function' && changes.isOpen) {
                vm.onChange({isAccordionGroupOpen: changes.isOpen.currentValue});
            }

            if (changes.disabled && vm.disabledClass) {
                $element.toggleClass(vm.disabledClass, changes.disabled.currentValue);
            }
        };
    }];

    directive.link = function link(scope, element, attrs, accordionCtrl) {
        const vm = scope.vm;
        accordionCtrl.addSection(scope);

        if (attrs.openClass) {
            element.toggleClass(attrs.openClass, !!vm.isOpen);
        }
        
        if (attrs.disabledClass) {
            element.toggleClass(attrs.disabledClass, vm.disabled);
        }

        function toggleAccordion() {
            vm.isOpen = !vm.isOpen;

            if (attrs.openClass) {
                element.toggleClass(attrs.openClass, vm.isOpen);
            }

            if (typeof vm.onChange === 'function') {
                vm.onChange({isAccordionGroupOpen: vm.isOpen});
            }
        }

        vm.handleAccordionEvent = function handleAccordionEvent(event) {
            if (!vm.disabled) {
                if (!event || event.type === 'click' || event.keyCode === SPACEBAR_KEYCODE.Space) {
                    toggleAccordion();

                    if (event && vm.isOpen) {
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
                vm.handleAccordionEvent(event);
            });
        });
    };

    return directive;
};
