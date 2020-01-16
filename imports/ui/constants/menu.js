const data = [
    {
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
        to: "/app/siteviewer"
    },
    {
        id: "fileviewer",
        icon: "iconsminds-files",
        label: "menu.fileviewer",
        to: "/app/fileviewer"
    },
    {
        id: "fileupload",
        icon: "simple-icon-cloud-upload",
        label: "menu.fileupload",
        to: "/app/fileupload",
        subs: [
            {
                id: "northeast",
                label: "menu.northeast",
                to: "/app/fileupload/northeast",
                subs: [
                    {
                        id: "california",
                        label: "menu.siteid",
                        to: "/app/fileupload/northeast/california"
                    }
                ]
            },
            {
                id: "northwest",
                label: "menu.northwest",
                to: "/app/fileupload/northwest",
                subs: [
                    {
                        id: "california",
                        label: "menu.siteid",
                        to: "/app/fileupload/northwest/california"
                    }
                ]
            },
            {
                id: "southeast",
                label: "menu.southeast",
                to: "/app/fileupload/southeast",
                subs: [
                    {
                        id: "california",
                        label: "menu.siteid",
                        to: "/app/fileupload/southeast/california"
                    }
                ]
            },
            {
                id: "southwest",
                label: "menu.southwest",
                to: "/app/fileupload/southwest",
                subs: [
                    {
                        id: "california",
                        label: "menu.siteid",
                        to: "/app/fileupload/southwest/california"
                    }
                ]
            },
            {
                id: "south",
                label: "menu.south",
                to: "/app/fileupload/south",
                subs: [
                    {
                        id: "california",
                        label: "menu.siteid",
                        to: "/app/fileupload/south/california"
                    }
                ]
            },
            {
                id: "north",
                label: "menu.north",
                to: "/app/fileupload/north",
                subs: [
                    {
                        id: "california",
                        label: "menu.siteid",
                        to: "/app/fileupload/north/california"
                    }
                ]
            },
            {
                id: "island",
                label: "menu.island",
                to: "/app/fileupload/island",
                subs: [
                    {
                        id: "california",
                        label: "menu.siteid",
                        to: "/app/fileupload/island/california"
                    }
                ]
            }
        ]
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
