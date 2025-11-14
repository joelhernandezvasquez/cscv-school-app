
import { fetchCourses } from '@/lib/actions/courses'
import EventCourseDropdown from './EventCourseDropdown'

const EventCourseDropdownWrapper = async() => {
  const courses = await fetchCourses();
  const itemList = courses.map((course)=> course.name);

  return (
    <EventCourseDropdown itemList={itemList}/>
  )
}

export default EventCourseDropdownWrapper