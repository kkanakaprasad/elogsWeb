export const ActivityFiltersData = {
    Filters: [{ DisplayName: 'Created Date', key: 'createddate' }, { DisplayName: 'Due Date', key: 'duedate' },
    { DisplayName: 'Status', key: 'status' }, { DisplayName: 'Types', key: 'types' },
    { DisplayName: 'Entry Type', key: 'entrytype' }, { DisplayName: 'Sectors', key: 'sector' },
    { DisplayName: 'Scope', key: 'scope' }, { DisplayName: 'Priority', key: 'priority' },
    { DisplayName: 'Created BY', key: 'createdby' }, {
        DisplayName: 'Assigned To', key: 'assignedto'
    }],

    createddate: [{ DisplayName: 'AnyTime', key: 'ALL' }, {
        DisplayName: 'PastHour', key: {
            unit: 'H',
            quantity: 1
        }
    },
    {
        DisplayName: 'Past 24 hours', key: {
            unit: 'H',
            quantity: 24
        }
    }, {
        DisplayName: 'Past Week', key: {
            unit: 'W',
            quantity: 1
        }
    },
    {
        DisplayName: 'Past Month', key: {
            unit: 'M',
            quantity: 1
        }
    }, {
        DisplayName: 'Past Year', key: {
            unit: 'Y',
            quantity: 1
        }
    },
    { DisplayName: 'Custom Range', key: {
        unit : 'R',
        range : {
            from :'',
            to : ''
        }
    } },
    ],

    duedate: [{ DisplayName: 'Any Time', key: 'ALL' }, { DisplayName: 'OverDue', key: 'OVERDUE' },
    { DisplayName: 'Today', key: 'TODAY' }, { DisplayName: 'Custom Range', key: 'R' }

    ],

    status: [{ DisplayName: 'All', key: 'ALL' }, { DisplayName: 'Not Admissible', key: 'REJECTED' }, { DisplayName: 'New', key: 'NEW' },
    { DisplayName: 'In Progress', key: 'INPROGRESS' }, { DisplayName: 'Resolved', key: 'RESOLVED' },

    ],

    priority: [{ DisplayName: 'None', key: 'NONE' }, { DisplayName: 'Low', key: 'LOW' },
    { DisplayName: 'Medium', key: 'MEDIUM' }, { DisplayName: 'High', key: 'HIGH' }
    ],

    createdby: [],
    assignedto: [],

    groupBy: [{ DisplayName: 'Due Date', key: 'dueDate' }, { DisplayName: 'Status', key: 'status' },
    { DisplayName: 'Priority', key: 'priority' }, { DisplayName: 'Assigned to', key: 'assignTo' }
    ],

    sortBy: [{ DisplayName: 'Tittle', key: 'title' }, { DisplayName: 'Activity#', key: 'activity' },
    { DisplayName: 'Due Date', key: 'dueDate' }, { DisplayName: 'Assigned to', key: 'assignTo' }]


}