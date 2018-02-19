/**
 * @ngdoc directive
 * @name bdAccordion
 * @module buildium.angular-elements.accordion
 * @restrict E
 * 
 * @transclude true
 *
 * @description
 * 
 * Collapsible content panels with configurable headings and triggers
 * 
 * @param {Boolean} [singleSectionOnly=false] whether to restrict accordion to one section open at a time
 * 
 * @example
 *
    <example name="bd-accordion" module="buildium.angular-elements.accordion">
        <file name="index.html">
            <section class="page-content">
                <bd-accordion>
                    <bd-accordion-section heading="Panel 1">
                        Panel 1
                    </bd-accordion-section>
                    <bd-accordion-section heading="Panel 2">
                        Panel 2
                    </bd-accordion-section>
                </bd-accordion>

                <hr>
                <label class="form__label">single section only</label>
                <bd-accordion single-section-only="true">
                    <bd-accordion-section heading="Panel 1">
                        Panel 1
                    </bd-accordion-section>
                    <bd-accordion-section heading="Panel 2" is-open="false">
                        Panel 2
                    </bd-accordion-section>
                </bd-accordion>
            </section>
        </file>
    </example>
 *
 */
const component = {};

component.transclude = true;
component.controllerAs = 'vm';

component.bindings = {
    singleSectionOnly: '<?'
};

component.template = '<div class="accordion" ng-transclude></div>';

component.controller = function AccordionController() {
    const vm = this;
    const sections = [];
    vm.$sectionIndex = 0;
    
    vm.addSection = function addSection(sectionScope) {
        sections.push(sectionScope);
        vm.$sectionIndex += 1;

        // Remove from sections if child section directive is removed
        sectionScope.$on('$destroy', () => {
            vm.deleteSection(sectionScope);
        });
    };

    vm.closeAllBut = function closeAllBut(openSection) {
        if (vm.singleSectionOnly) {
            sections.forEach((section) => {
                if (section !== openSection && section.vm.isOpen) {
                    section.vm.handleAccordionEvent();
                }
            });
        }
    };

    vm.deleteSection = function deleteSection(section) {
        const index = sections.indexOf(section);
        if (index !== -1) {
            sections.splice(index, 1);
        }
    };
};

module.exports = component;
