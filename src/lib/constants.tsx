
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
    },
    {
        id:'event-filter-canceled',
        value:'Cancelled'
    }

];

export const courseTabs = [
    {
        id:'course-filter-all',
        value:'All'
    },
    {
        id:'course-filter-level1',
        value:'Level 1'
    },
    {
        id:'course-filter-level2',
        value:'Level 2'
    },
    {
        id:'course-filter-level3',
        value:'Level 3'
    },
    {
        id:'course-filter-renacer',
        value:'Renacer'
    }

];

export const sortStudentOptions = [
    'Name (A-Z)','Name (Z-A)','Recent','Oldest','Most Courses','Least Courses'
]

export const colorLevels = [{id:'001',color:'#a30f12'},{id:'002',color:'#12a9a6'},{id:'003',color:'#f5c544'},{id:'004',color:'#5655D7'},{id:'005',color:'#002d88ff'}];

export const eventStatus = ['upcoming','ongoing','cancelled'];

export const courseLevel = [
  'Nivel 1 Jesus Esta Vivo',
  'Nivel 2 Jesus Nos Capacita',
  'Nivel 3 Jesus Nos Envia',
  'Renacer'
]