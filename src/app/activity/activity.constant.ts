export const Priority = ['NONE', 'LOW', 'MEDIUM', 'HIGH']
export const Visibility = ['INTERNAL', 'EVERYONE']
export const Status = ['NEW', 'INPROGRESS', 'REJECTED', 'REJECTED', 'RESOLVED'];

export const SuperAdminActivityRowActions = {
    "NEW": [
        {
            title: 'Start',
            icon: "play_circle_fill",
            action: "INPROGRESS"
        },
        {
            title: 'Resolve',
            icon: "assistant_photo",
            action: "RESOLVED"
        },
        {
            title: 'Reject',
            icon: "cancel",
            action: "REJECTED"
        },
        {
            title: 'Reply',
            icon: "reply",
            action: "REPLY"
        },
        {
            title: 'Edit',
            icon: "edit",
            action: "EDIT"
        },
        {
            title: 'Move to Organization',
            icon: "skip_next",
            action: "MOVE_TO_ORGANIZATION"
        },
        {
            title: 'Archive',
            icon: "archive",
            action: "ARCHIVE"
        },
        {
            title: 'Delete',
            icon: "delete_sweep",
            action: "DELETE"
        }
    ],
    "INPROGRESS": [

        {
            title: 'Resolve',
            icon: "assistant_photo",
            action: "RESOLVED"
        },
        {
            title: 'Reject',
            icon: "cancel",
            action: "REJECTED"
        },
        {
            title: 'Reply',
            icon: "reply",
            action: "REPLY"
        },

        {
            title: 'Move to Organisation',
            icon: "skip_next",
            action: "MOVE_TO_ORGANIZATION"
        },
        {
            title: 'Archive',
            icon: "archive",
            action: "ARCHIVE"
        },
        {
            title: 'Delete',
            icon: "delete_sweep",
            action: "DELETE"
        }
    ],

    "REJECTED": [

        {
            title: 'Reopen',
            icon: "reply",
            action: "NEW"
        },

        {
            title: 'Move to Organisation',
            icon: "skip_next",
            action: "MOVE_TO_ORGANIZATION"
        },
        {
            title: 'Archive',
            icon: "archive",
            action: "ARCHIVE"
        },
        {
            title: 'Delete',
            icon: "delete_sweep",
            action: "DELETE"
        }
    ],

    "RESOLVED": [

        {
            title: 'Reject',
            icon: "cancel",
            action: "REJECTED"
        },
        {
            title: 'Reply',
            icon: "reply",
            action: "REPLY"
        },

        {
            title: 'Move to Organisation',
            icon: "skip_next",
            action: "MOVE_TO_ORGANIZATION"
        },
        {
            title: 'Archive',
            icon: "archive",
            action: "ARCHIVE"
        },
        {
            title: 'Delete',
            icon: "delete_sweep",
            action: "DELETE"
        }
    ]
}


export const ActivityRowActions = [
    {
        title: 'Start',
        icon: "play_circle_fill",
        action: 'INPROGRESS',
        displayCondition: (activity: any, loggedInUserDetails: any) => {
            return (activity.status === 'NEW')
        }
    },
    {
        title: 'Resolve',
        icon: "assistant_photo",
        action: 'RESOLVE',
        displayCondition: (activity: any, loggedInUserDetails: any) => {
            return ((activity.status === 'INPROGRESS' || activity.status === 'NEW') && (activity.createdBy === loggedInUserDetails._id || loggedInUserDetails.organization.includes(activity.assignTo)))
        }
    },
    {
        title: 'Reject',
        icon: "cancel",
        action: 'REJECTED',
        displayCondition: (activity: any, loggedInUserDetails: any) => {
            return ((activity.status !== 'REJECTED') && ((activity.status === 'NEW' && activity.createdBy === loggedInUserDetails._id) ||
                (activity.status === 'INPROGRESS' && activity.createdBy === loggedInUserDetails._id || loggedInUserDetails.organization.includes(activity.assignTo)) ||
                (activity.status === 'RESOLVED' && activity.createdBy === loggedInUserDetails._id)))
        }
    },
    {
        title: 'Reply',
        icon: "reply",
        action: 'REPLY',
        displayCondition: (activity: any, loggedInUserDetails: any) => {
            return (activity.status !== 'REJECTED')
        }
    },
    {
        title: 'Edit',
        icon: "edit",
        action: 'EDIT',
        displayCondition: (activity: any, loggedInUserDetails: any) => {
            return (activity.status === 'NEW' && activity.createdBy === loggedInUserDetails._id)
        }
    },
    {
        title: 'Move to Organization',
        icon: "skip_next",
        action: "MOVE_TO_ORGANIZATION",
        displayCondition: (activity: any, loggedInUserDetails: any) => {
            return (activity.createdBy === loggedInUserDetails._id && (activity.status === 'NEW' || activity.status === 'INPROGRESS'))
        }
    },
    {
        title: 'Archive',
        icon: "archive",
        action: 'ARCHIVE',
        displayCondition: (activity: any, loggedInUserDetails: any) => {
            return (activity.createdBy === loggedInUserDetails._id && (activity.status === 'NEW' || activity.status === 'INPROGRESS'))
        }
    },
    {
        title: 'Delete',
        icon: "delete_sweep",
        action: 'DELETE',
        displayCondition: (activity: any, loggedInUserDetails: any) => {
            return ((activity.status === 'NEW' && activity.createdBy === loggedInUserDetails._id))
        }
    },
    {
        title: 'Reopen',
        icon: "reply",
        action: "NEW",
        displayCondition: (activity: any, loggedInUserDetails: any) => {
            return ((activity.status === 'REJECTED'))
        }
    },
]


export const ActivitiesDownloadHeaders = [
    {
        propertyName: 'reportedBy',
        displayName: 'Reported By'

    },
    {
        propertyName: 'activityId',
        displayName: 'Activity ID'

    },
    {
        propertyName: 'entryType',
        displayName: 'Entry Type'

    },
    {
        propertyName: 'type',
        displayName: 'Type of Issue'

    },
    {
        propertyName: 'ministry',
        displayName: 'Ministry/Department'

    },
    {
        propertyName: 'assignedTo',
        displayName: 'Assigned To'

    },
    {
        propertyName: 'createdAt',
        displayName: 'Created Date'

    },
    {
        propertyName: 'dueDate',
        displayName: 'Due Date'

    },
    {
        propertyName: 'title',
        displayName: 'Title'

    },
    {
        propertyName: 'description',
        displayName: 'Description'

    },
    {
        propertyName: 'status',
        displayName: 'Current Status'

    },
    
    // {
    // 	propertyName: 'attachments',
    // 	displayName: 'Attachments'

    // },
    // {
    // 	propertyName: 'priority',
    // 	displayName: 'Priority'

    // },
    // {
    // 	propertyName: 'type',
    // 	displayName: 'Type'

    // },
    // {
    // 	propertyName: 'sector',
    // 	displayName: 'Sector'

    // },
    
    // {
    // 	propertyName: 'scope',
    // 	displayName: 'Scope'

    // },
    // {
    // 	propertyName: 'relatedTo',
    // 	displayName: 'Related To'

    // },

]





