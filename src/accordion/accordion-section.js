/**
 * @ngdoc component
 * @name bdAccordionSection
 * @module buildium.angular-elements.accordion
 *
 * @description
 * 
 * Section to hold content in {@link buildium.angular-elements.accordion.component:bdAccordion bdAccordion}
 *
 * @param {String} heading - What will be shown in header
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
component.controllerAs = 'section';

component.bindings = {
    heading: '@',
    subHeading: '@',
    isOpen: '<?',
    disabled: '<?'
};

component.template = `
<div bd-accordion-toggle
    on-change="section.toggleClass(isAccordionGroupOpen)"
    is-open="section.isOpen"
    disabled="section.disabled"
    open-class="accordion__section--open"
    ng-class="{'accordion__section--first': section.$index === 0}">
    <div class="accordion__section-heading"
        ng-class="{'accordion__section-heading--disabled': section.disabled}">
        <h4 class="accordion__section-heading-title">
            <a role="button" href="#" class="accordion__toggle" ng-class="{'accordion__toggle--disabled': section.disabled}">
                <span ng-hide="section.isOpen" 
                    class="accordion__toggle-icon svgicon"
                    ng-class="{'svgicon--arrowhead-right': !section.disabled, 'svgicon--arrowhead-right-muted': section.disabled}">
                </span>
                <span ng-show="section.isOpen" class="accordion__toggle-icon svgicon svgicon--arrowhead-down"></span>
                <span>{{section.heading}}</span>
                <span class="accordion__section-sub-heading-title" ng-if="section.subHeading">{{section.subHeading}}</span>
            </a>
        </h4>
    </div>
    <div bd-accordion-group ng-if="!disabled" class="accordion__section-content" ng-transclude></div>
</div>
`;

component.controller = function AccordionSectionController() {
    const section = this;

    section.$onInit = function onInit() {
        section.$index = section.accordion.$sectionIndex;
    };

    section.toggleClass = function toggleClass(isAccordionGroupOpen) {
        section.isOpen = isAccordionGroupOpen;
    };

    section.$onChanges = function onChanges(changes) {
        if (changes.isOpen) {
            section.toggleClass(changes.isOpen.currentValue);
        }
    };
};

module.exports = component;
