export const ActivityFiltersData = {
    Filters: [{ DisplayName: 'Created Date', key: 'createddate' }, { DisplayName: 'Due Date', key: 'duedate' },
    { DisplayName: 'Status', key: 'status' }, { DisplayName: 'Types', key: 'types' },
    { DisplayName: 'Entry Type', key: 'entrytype' }, { DisplayName: 'Geography', key: 'geography' },
    { DisplayName: 'Scope', key: 'scope' }, { DisplayName: 'Priority', key: 'priority' },
    { DisplayName: 'Created BY', key: 'createdby' }, {
        DisplayName: 'Assigned To', key: 'assignedto'
    }],

    createddate: [{ DisplayName: 'AnyTime', key: 'Anytime' }, { DisplayName: 'PastHour', key: 'Pasthour' },
    { DisplayName: 'Past 24 hours', key: 'Past24hours' }, { DisplayName: 'Past Week', key: 'Pastweek' },
    { DisplayName: 'Past Month', key: 'Pastmonth' }, { DisplayName: 'Past Year', key: 'Pastyear' },
    { DisplayName: 'Custom Range', key: 'Customrange' },
    ],

    duedate: [{ DisplayName: 'Any Time', key: 'Anytime' }, { DisplayName: 'OverDue', key: 'Overdue' },
    { DisplayName: 'Today', key: 'Today' }, { DisplayName: 'Custom Range', key: 'Custom range' }
   
    ],

    status: [ { DisplayName: 'All', key: 'all' },{ DisplayName: 'Not Admissible', key: 'Not Admissible' }, { DisplayName: 'New', key: 'New' },
    { DisplayName: 'In Progress', key: 'In Progress' }, { DisplayName: 'Resolved', key: 'Resolved'},
   
    ],

    types: [{ DisplayName: 'Documentation/Procedure', key: 'Documentation/Procedure' }, { DisplayName: 'Policy/Rules/Regulation', key: 'Policy/Rules/Regulation' },
    { DisplayName: 'Schemes/Programmes', key: 'Schemes/Programmes' }, { DisplayName: 'Others', key: 'Others' }
    ],

    entrytype: [{ DisplayName: 'Issue', key: 'Issue' }, { DisplayName: 'Suggestion', key: 'Suggestion' },
    { DisplayName: 'Other', key: 'Other' }
    ],

    geography: [{ DisplayName: 'Exim', key: 'Exim' }, { DisplayName: 'Domestic', key: 'Domestic' },
    { DisplayName: 'Others', key: 'Others' }
    ],

    scope: [{ DisplayName: 'National', key: 'National' }, { DisplayName: 'InterState', key: 'InterState' },
    ],

    priority: [{ DisplayName: 'NONE', key: 'None' }, { DisplayName: 'LOW', key: 'Low' },
    { DisplayName: 'MEDIUM', key: 'Medium' }, { DisplayName: 'HIGH', key: 'High' }
    ],

    createdby: [],
    assignedto: [],

    groupby:[{DisplayName: 'Due Date', key: 'dueDate'},{DisplayName: 'Status', key: 'status'},
    {DisplayName: 'Priority', key: 'priority'},{DisplayName: 'Assigned to', key: 'assigned to'}
],

sortby:[{DisplayName: 'Tittle', key: 'tittle'},{DisplayName: 'Activity#', key: 'activity'},
{DisplayName: 'Due Date', key: 'due date'},{DisplayName: 'Assigned to', key: 'assigned to'}]


}