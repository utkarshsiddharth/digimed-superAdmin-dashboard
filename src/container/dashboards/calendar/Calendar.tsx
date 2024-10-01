import { FC, Fragment } from "react";
import { Card, Row } from "react-bootstrap";
// import Pageheader from "../../../components/pageheader/pageheader";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

interface CalendarProps {}

const Calendar: FC<CalendarProps> = () => {
  let eventGuid = 0;
  const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
  const INITIAL_EVENTS = [
    {
      id: createEventId(),
      title: "Meeting",
      start: todayStr,
    },
    {
      id: createEventId(),
      title: "Meeting Time",
      start: todayStr + "T16:00:00",
    },
  ];

  function createEventId() {
    return String(eventGuid++);
  }
  // const initialstate1 = {
  //   calendarEvents: [
  //     {
  //       title: "Atlanta Monster",
  //       start: new Date("2019-04-04 00:00"),
  //       id: "1001",
  //     },
  //     {
  //       title: "My Favorite Murder",
  //       start: new Date("2019-04-05 00:00"),
  //       id: "1002",
  //     },
  //   ],

  //   events: [
  //     {
  //       title: "Calendar Events",
  //       id: "1",
  //       bg: "bg-primary",
  //     },
  //     {
  //       title: "Birthday Events",
  //       id: "2",
  //       bg: " bg-secondary",
  //     },
  //     {
  //       title: "Holiday Calendar",
  //       id: "3",
  //       bg: "bg-success",
  //     },
  //     {
  //       title: "Office Events",
  //       id: "4",
  //       bg: "bg-info",
  //       border: "border-info",
  //     },
  //     {
  //       title: "Other Events",
  //       id: "5",
  //       bg: "bg-warning",
  //     },
  //     {
  //       title: "Festival Events",
  //       id: "6",
  //       bg: "bg-danger",
  //     },
  //     {
  //       title: "Timeline Events",
  //       id: "7",
  //       bg: "bg-teal",
  //     },
  //   ],
  // };
  // const [state] = useState(initialstate1);

  // useEffect(() => {
  //   const draggableEl: any = document.getElementById("external-events");
  //   new Draggable(draggableEl, {
  //     itemSelector: ".fc-event",
  //     eventData: function (eventEl: any) {
  //       const title = eventEl.getAttribute("title");
  //       const id = eventEl.getAttribute("data");
  //       const classValue = eventEl.getAttribute("class");
  //       return {
  //         title: title,
  //         id: id,
  //         className: classValue,
  //       };
  //     },
  //   });
  // }, []);

  function renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
  const handleEventClick = (clickInfo: any) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };
  const handleEvents = () => {};

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };
  return (
    <Fragment>
      <Row>
        <div className="col-xl-9 mx-5">
          <Card className="custom-card mt-5">
            <div
              style={{
                backgroundColor: "#111C43",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                color: "white",
              }}
            >
              <Card.Header style={{ color: "red" }}>
                <Card.Title className="py-4 text-white text-w-20 h1">
                  Calendar
                </Card.Title>
              </Card.Header>
            </div>
            <Card.Body>
              <div id="calendar2">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  initialView="dayGridMonth"
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  initialEvents={INITIAL_EVENTS}
                  select={handleDateSelect}
                  eventContent={renderEventContent}
                  eventClick={handleEventClick}
                  eventsSet={handleEvents}
                />
              </div>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Fragment>
  );
};

export default Calendar;
