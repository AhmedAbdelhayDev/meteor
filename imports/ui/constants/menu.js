const data = [{
    id: "dashboards",
    icon: "simple-icon-home",
    label: "menu.dashboards",
    to: "/app/dashboards"
  },
  {
    id: "newsite",
    icon: "iconsminds-digital-drawing",
    label: "menu.newsite",
    to: "/app/newsite"
  },  
  {
    id: "siteviewer",
    icon: "iconsminds-space-needle",
    label: "menu.siteviewer",
    to: "/app/siteviewer",
    subs: [
      {
        id: "northeast",
        label: "menu.northeast",
        to: "/app/siteviewer/northeast",
        subs: [
          {
            id: "california",
            label: "menu.state",
            to: "/app/siteviewer/northeast/california",            
            subs: [
              {
                id: "riverside",
                label: "menu.city",
                to: "/app/siteviewer/northeast/california/riverside",          
                subs: [
                  {
                    id: "topsite",
                    label: "menu.siteid",
                    to: "/app/siteviewer/northeast/california/riverside/topsite",
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "northwest",
        label: "menu.northwest",
        to: "/app/siteviewer/northwest",
        subs: [
          {
            id: "california",
            label: "menu.state",
            to: "/app/siteviewer/northwest/california",            
            subs: [
              {
                id: "riverside",
                label: "menu.city",
                to: "/app/siteviewer/northwest/california/riverside",          
                subs: [
                  {
                    id: "topsite",
                    label: "menu.siteid",
                    to: "/app/siteviewer/northwest/california/riverside/topsite",
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "southeast",
        label: "menu.southeast",
        to: "/app/siteviewer/southeast",
        subs: [
          {
            id: "california",
            label: "menu.state",
            to: "/app/siteviewer/southeast/california",            
            subs: [
              {
                id: "riverside",
                label: "menu.city",
                to: "/app/siteviewer/southeast/california/riverside",          
                subs: [
                  {
                    id: "topsite",
                    label: "menu.siteid",
                    to: "/app/siteviewer/southeast/california/riverside/topsite",
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "southwest",
        label: "menu.southwest",
        to: "/app/siteviewer/southwest",
        subs: [
          {
            id: "california",
            label: "menu.state",
            to: "/app/siteviewer/southwest/california",            
            subs: [
              {
                id: "riverside",
                label: "menu.city",
                to: "/app/siteviewer/southwest/california/riverside",          
                subs: [
                  {
                    id: "topsite",
                    label: "menu.siteid",
                    to: "/app/siteviewer/southwest/california/riverside/topsite",
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "south",
        label: "menu.south",
        to: "/app/siteviewer/south",
        subs: [
          {
            id: "california",
            label: "menu.state",
            to: "/app/siteviewer/south/california",            
            subs: [
              {
                id: "riverside",
                label: "menu.city",
                to: "/app/siteviewer/south/california/riverside",          
                subs: [
                  {
                    id: "topsite",
                    label: "menu.siteid",
                    to: "/app/siteviewer/south/california/riverside/topsite",
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "north",
        label: "menu.north",
        to: "/app/siteviewer/north",
        subs: [
          {
            id: "california",
            label: "menu.state",
            to: "/app/siteviewer/north/california",            
            subs: [
              {
                id: "riverside",
                label: "menu.city",
                to: "/app/siteviewer/north/california/riverside",          
                subs: [
                  {
                    id: "topsite",
                    label: "menu.siteid",
                    to: "/app/siteviewer/north/california/riverside/topsite",
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "island",
        label: "menu.island",
        to: "/app/siteviewer/island",
        subs: [
          {
            id: "california",
            label: "menu.state",
            to: "/app/siteviewer/island/california",            
            subs: [
              {
                id: "riverside",
                label: "menu.city",
                to: "/app/siteviewer/island/california/riverside",          
                subs: [
                  {
                    id: "topsite",
                    label: "menu.siteid",
                    to: "/app/siteviewer/island/california/riverside/topsite",
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "filemanager",
    icon: "simple-icon-cloud-upload",
    label: "menu.filemanager",
    to: "/app/filemanager"
  },
  {
    id: "notifications",
    icon: "simple-icon-feed",
    label: "menu.notifications",
    to: "/app/notifications"
  },
  {
    id: "reporting",
    icon: "simple-icon-printer",
    label: "menu.reporting",
    to: "/app/reporting"
  }
];
export default data;