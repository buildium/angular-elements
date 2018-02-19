/**
 * @ngdoc directive
 * @name bdAccordionSection
 * @module buildium.angular-elements.accordion
 * @restrict E
 * 
 * @transclude true
 *
 * @description
 * 
 * Section to hold content in {@link buildium.angular-elements.accordion.directive:bdAccordion bdAccordion}
 *
 * @param {String} header - What will be shown in header
 * @param {String} subHeading
 * @param {Boolean} [isOpen] - Set to be initally open
 * @param {Boolean} [disabled]
 * 
 * @example
 *
    <example name="bd-accordion-section" module="buildium.angular-elements.accordion">
        <file name="index.html">
            <section class="page-content">
                <bd-accordion>
                    <bd-accordion-section heading="Test">
                        Test content
                    </bd-accordion-section>
                    <bd-accordion-section heading="Test 2" sub-heading="With subheading">
                        Test content 2
                    </bd-accordion-section>
                </bd-accordion>
            </section>
        </file>
    </example>
 *
 */
const component = {};

component.require = {
    accordion: '^bdAccordion'
};
component.transclude = true;
component.controllerAs = 'vm';

component.bindings = {
    heading: '@',
    subHeading: '@',
    isOpen: '<?',
    disabled: '<?'
};

component.template = `
<div bd-accordion-toggle
    on-change="vm.toggleClass(isAccordionGroupOpen)"
    is-open="vm.isOpen"
    disabled="vm.disabled"
    open-class="accordion__section--open"
    ng-class="{'accordion__section--first': vm.$index === 0}">
    <div class="accordion__section-heading"
        ng-class="{'accordion__section-heading--disabled': vm.disabled}">
        <h4 class="accordion__section-heading-title">
            <a role="button" href="#" class="accordion__toggle" ng-class="{'accordion__toggle--disabled': vm.disabled}">
                <span ng-hide="vm.isOpen" 
                    class="accordion__toggle-icon svgicon"
                    ng-class="{'svgicon--arrowhead-right': !vm.disabled, 'svgicon--arrowhead-right-muted': vm.disabled}">
                </span>
                <span ng-show="vm.isOpen" class="accordion__toggle-icon svgicon svgicon--arrowhead-down"></span>
                <span>{{vm.heading}}</span>
                <span class="accordion__section-sub-heading-title" ng-if="vm.subHeading">{{vm.subHeading}}</span>
            </a>
        </h4>
    </div>
    <div bd-accordion-group ng-if="!disabled" class="accordion__section-content" ng-transclude></div>
</div>
`;

component.controller = function AccordionSectionController() {
    const vm = this;

    vm.$onInit = function onInit() {
        vm.$index = vm.accordion.$sectionIndex;
    };

    vm.toggleClass = function toggleClass(isAccordionGroupOpen) {
        vm.isOpen = isAccordionGroupOpen;
    };

    vm.$onChanges = function onChanges(changes) {
        if (changes.isOpen) {
            vm.toggleClass(changes.isOpen.currentValue);
        }
    };
};

module.exports = component;
