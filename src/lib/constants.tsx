
export const navigationItems = [
    {
        id:'001-dashboard',
        item:'Dashboard',
        url:'/dashboard'
    },
    {
        id:'002-students',
        item:'Students',
        url:'/students'
    },
    {
        id:'003-events',
        item:'Events',
        url:'/events'
    },
    {
        id:'004-enroll',
        item:'Enrollment',
        url:'/enrollment'
    },
    {
        id:'005-courses',
        item:'Courses',
        url:'/courses'
    }

]

export const filterStudentOptions = [
    'All','Active','Inactive'
]

export const eventTabs = [
    {
        id:'event-filter-all',
        value:'All'
    },
    {
        id:'event-filter-active',
        value:'Active'
    },
    {
        id:'event-filter-upcoming',
        value:'Upcoming'
    },
    {
        id:'event-filter-completed',
        value:'Completed'
    }

];

export const sortStudentOptions = [
    'Name (A-Z)','Name (Z-A)','Recent','Oldest','Most Courses','Least Courses'
]

export const colorLevels = [{id:'001',color:'#a30f12'},{id:'002',color:'#12a9a6'},{id:'003',color:'#f5c544'},{id:'004',color:'#5655D7'},{id:'005',color:'#002d88ff'}];

export const eventStatus = ['upcoming','ongoing','completed','cancelled'];