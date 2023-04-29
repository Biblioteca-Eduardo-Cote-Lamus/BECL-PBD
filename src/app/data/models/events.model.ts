export interface Events {
    events_hours: EventsHour[];
}

export interface EventsHour {
    hours:    string;
    possible: number[];
}