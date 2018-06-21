/**
 * @ngdoc component
 * @name bdAccordion
 * @module buildium.angular-elements.accordion
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
component.controllerAs = 'accordion';

component.bindings = {
    singleSectionOnly: '<?'
};

component.template = '<div class="accordion" ng-transclude></div>';

component.controller = function AccordionController() {
    const accordion = this;
    const sections = [];
    accordion.$sectionIndex = 0;
    
    accordion.addSection = function addSection(sectionScope) {
        sections.push(sectionScope);
        accordion.$sectionIndex += 1;

        // Remove from sections if child section directive is removed
        sectionScope.$on('$destroy', () => {
            accordion.deleteSection(sectionScope);
        });
    };

    accordion.closeAllBut = function closeAllBut(openSection) {
        if (accordion.singleSectionOnly) {
            sections.forEach((section) => {
                if (section !== openSection && section.toggle.isOpen) {
                    section.toggle.handleAccordionEvent();
                }
            });
        }
    };

    accordion.deleteSection = function deleteSection(section) {
        const index = sections.indexOf(section);
        if (index !== -1) {
            sections.splice(index, 1);
        }
    };
};

module.exports = component;
