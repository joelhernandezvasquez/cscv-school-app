
import { fetchCourses } from '@/lib/actions/courses'
import EventCourseDropdown from './EventCourseDropdown';

const EventCourseDropdownWrapper = async() => {
  const courses = await fetchCourses();

  return (
    <EventCourseDropdown itemList={courses}/>
  )
}

export default EventCourseDropdownWrapper