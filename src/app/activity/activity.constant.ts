export const Priority = ['NONE', 'LOW', 'MEDIUM', 'HIGH']
export const Visibility = ['INTERNAL', 'EVERYONE']
export const Status = ['NEW', 'INPROGRESS', 'REJECTED', 'REJECTED', 'RESOLVED'];

export const ActivityRowActions = {
    "NEW": [
        {
            title: 'Start',
            icon: "play_circle_fill",
            action:"INPROGRESS"
        },
        {
            title: 'Resolve',
            icon: "assistant_photo",
            action:"RESOLVE"
        },
        {
            title: 'Reject',
            icon: "cancel",
            action:"REJECT"
        },
        {
            title: 'Reply',
            icon: "reply",
            action:"REPLY"
        },
        {
            title: 'Edit',
            icon: "edit",
            action:"EDIT"
        },
        {
            title: 'Move to Organisation',
            icon: "skip_next",
            action:"MOVE TO ORGANISATION"
        },
        {
            title: 'Archive',
            icon: "archive",
            action:"ARCHIVE"
        },
        {
            title: 'Delete',
            icon: "delete_sweep",
            action:"DELETE"
        }
    ],
    "INPROGRESS": [

        {
            title: 'Resolve',
            icon: "assistant_photo",
        },
        {
            title: 'Reject',
            icon: "cancel",
        },
        {
            title: 'Reply',
            icon: "reply",
        },

        {
            title: 'Move to Organisation',
            icon: "skip_next",
        },
        {
            title: 'Archive',
            icon: "archive",
        },
        {
            title: 'Delete',
            icon: "delete_sweep",
        }
    ],

    "REJECTED": [

        {
            title: 'Reopen',
            icon: "reply",
        },

        {
            title: 'Move to Organisation',
            icon: "skip_next",
        },
        {
            title: 'Archive',
            icon: "archive",
        },
        {
            title: 'Delete',
            icon: "delete_sweep",
        }
    ],

    "RESOLVED": [

        {
            title: 'Reject',
            icon: "cancel",
        },
        {
            title: 'Reply',
            icon: "reply",
        },

        {
            title: 'Move to Organisation',
            icon: "skip_next",
        },
        {
            title: 'Archive',
            icon: "archive",
        },
        {
            title: 'Delete',
            icon: "delete_sweep",
        }
    ]
}

export const UserActivityRowActions = {
    "NEW": [
        {
            title: 'Satrt',
            icon: "play_circle_fill",
        },
        {
            title: 'Resolve',
            icon: "assistant_photo",
        },
        {
            title: 'Reply',
            icon: "reply",
        },
    ],
    "INPROGRESS": [

        {
            title: 'Resolve',
            icon: "assistant_photo",
        },
       
        {
            title: 'Reply',
            icon: "reply",
        },
      
    ],
    "RESOLVED": [
        {
            title: 'Reject',
            icon: "cancel",
        },
        {
            title: 'Reply',
            icon: "reply",
        },
    ],
    "REJECTED": [

        {
            title: 'Reply',
            icon: "reply",
        },
    ],
}

