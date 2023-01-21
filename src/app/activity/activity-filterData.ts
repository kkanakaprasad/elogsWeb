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
            unit: 'h',
            quantity: 1
        }
    },
    {
        DisplayName: 'Past 24 hours', key: {
            unit: 'h',
            quantity: 24
        }
    }, {
        DisplayName: 'Past Week', key: {
            unit: 'w',
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
            unit: 'y',
            quantity: 1
        }
    },
    {
        DisplayName: 'Custom Range', key: {
            unit: 'R',
            range: {
                from: '',
                to: ''
            }
        }
    },
    ],

    duedate: [{ DisplayName: 'Any Time', key: 'ALL' }, { DisplayName: 'OverDue', key: 'OVERDUE' },
    { DisplayName: 'Today', key: 'TODAY' }, { DisplayName: 'Custom Range', key: 'R' }

    ],

    status: [{ DisplayName: 'Not Admissible', key: 'REJECTED', selected: false }, { DisplayName: 'New', key: 'NEW', selected: false },
    { DisplayName: 'In Progress', key: 'INPROGRESS', selected: false }, { DisplayName: 'Resolved', key: 'RESOLVED', selected: false },

    ],

    priority: [{ DisplayName: 'None', key: 'NONE', selected: false }, { DisplayName: 'Low', key: 'LOW', selected: false },
    { DisplayName: 'Medium', key: 'MEDIUM', selected: false }, { DisplayName: 'High', key: 'HIGH', selected: false }
    ],

    createdby: [],
    assignedto: [],

    groupBy: [{ DisplayName: 'Due Date', key: 'dueDate' }, { DisplayName: 'Status', key: 'status' },
    { DisplayName: 'Priority', key: 'priority' }, { DisplayName: 'Assigned to', key: 'assignTo' }
    ],

    sortBy: [{ DisplayName: 'Tittle', key: 'title' }, { DisplayName: 'Activity#', key: 'activity' },
    { DisplayName: 'Due Date', key: 'dueDate' }, { DisplayName: 'Assigned to', key: 'assignTo' }]


}