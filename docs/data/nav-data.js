angular.module('docApp').constant('DOCS_NAVIGATION', {
  "api": {
    "id": "api",
    "href": "api",
    "name": "API",
    "navGroups": [
      {
        "name": "popover",
        "type": "groups",
        "href": "api/popover",
        "navItems": [
          {
            "name": "directive",
            "type": "section",
            "href": "api/popover/directive",
            "navItems": [
              {
                "name": "bdPopover",
                "type": "directive",
                "href": "api/popover/directive/bdPopover"
              }
            ]
          }
        ]
      }
    ]
  }
});
