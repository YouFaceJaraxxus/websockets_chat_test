interface ITicketVisit {
  id: number;
  dateVisited: Date;
  lastVisitTicketId: number;
  lastVisitUserId: number;
}

export type { ITicketVisit };
export default {};
