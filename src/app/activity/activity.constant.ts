export const Priority =['NONE','LOW','MEDIUM','HIGH']
export const Visibility= ['INTERNAL','EVERYONE']
export const Status=['NEW','INPROGRESS','REJECTED','REJECTED','RESOLVED'];

export const ActivityRowActions = {
    "NEW" : [
        {
            title : 'Start',
            icon : "play_circle_fill",
        },
        {
            title : 'Resolve',
            icon : "assistant_photo",  
        },
        {
            title : 'Reject',
            icon : "cancel",  
        },
        {
            title : 'Reply',
            icon : "reply",  
        },
        {
            title : 'Edit',
            icon : "edit",  
        },
        {
            title : 'Move to Organisation',
            icon : "skip_next",  
        },
        {
            title : 'Archive',
            icon : "archive",  
        },
        {
            title : 'Delete',
            icon : "delete_sweep",  
        }
    ],
    "INPROGRESS" : [
    
        {
            title : 'Resolve',
            icon : "assistant_photo",  
        },
        {
            title : 'Reject',
            icon : "cancel",  
        },
        {
            title : 'Reply',
            icon : "reply",  
        },
       
        {
            title : 'Move to Organisation',
            icon : "skip_next",  
        },
        {
            title : 'Archive',
            icon : "archive",  
        },
        {
            title : 'Delete',
            icon : "delete_sweep",  
        }
    ],

    "REJECTED" : [
    
        {
            title : 'Reopen',
            icon : "reply",  
        },
       
        {
            title : 'Move to Organisation',
            icon : "skip_next",  
        },
        {
            title : 'Archive',
            icon : "archive",  
        },
        {
            title : 'Delete',
            icon : "delete_sweep",  
        }
    ],

    "RESOLVED" : [
    
        {
            title : 'Reject',
            icon : "cancel",  
        },
        {
            title : 'Reply',
            icon : "reply",  
        },
       
        {
            title : 'Move to Organisation',
            icon : "skip_next",  
        },
        {
            title : 'Archive',
            icon : "archive",  
        },
        {
            title : 'Delete',
            icon : "delete_sweep",  
        }
    ]
}