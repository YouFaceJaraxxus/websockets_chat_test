import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { respondToDeleteRequest } from '../deleteRequests/DeleteRequestService';
import { IEditTask } from '../editTask.model';
import { IEditTaskStatus } from '../editTaskStatus.model';
import { IDeleteRequestResponse } from '../deleteRequestResponse';
import { IDeleteRequest } from '../deleteRequests/deleteRequest';
import { ISaveTask } from '../saveTask.model';
import { ITask } from './task';
import { createTask, getTasks, editTask, archiveTask, editTaskStatus, assignTask, getTaskStats, updateTicketLastVisited } from './TaskService';
import { IAssignTask } from '../assignTask.model';
import { IGetTasksFilter } from '../getTasksFilter.model';
import { ITicketsResponse } from '../ticketsResponse';
import { ITaskStatsResponse } from '../taskStatsResponse';
import { ITicketVisit } from '../ticketVisits/ticketVisit';

const PENDING_STATUS_ID = 1;
const ACTIVE_STATUS_ID = 2;
const COMPLETED_STATUS_ID = 3;
interface ITaskProcesses {
  // when fetching tasks
  fetchingTasks: boolean;

  // when creating/editing task
  savingTask: boolean;

  // when creating/editing task
  archivingTask: boolean;

  /* when running actions like adding comments,
  responding to delete requests */
  fetchingAction: boolean;

  // when assigning a task
  assigningTask: boolean;

  // when completing a task
  completingTask: boolean;
}

interface TasksState {
  taskProcesses: ITaskProcesses
  tickets: ITask[];
  processMessage: string;
  count: number;
  stats: ITaskStatsResponse;
  selectedTask: ITask;
  taskOverviewModalOpen: boolean;
}

const initialState: TasksState = {
  taskProcesses: {
    fetchingTasks: false,
    savingTask: false,
    archivingTask: false,
    fetchingAction: false,
    assigningTask: false,
    completingTask: false,
  },
  tickets: [],
  processMessage: '',
  count: 0,
  stats: {
    closedTasks: 0,
    openTasks: 0,
    pendingTasks: 0,
  },
  selectedTask: null,
  taskOverviewModalOpen: false,
};
export const getTasksAsync = createAsyncThunk(
  'tasks/fetchTasks',
  async (queryFilter: IGetTasksFilter): Promise<ITicketsResponse> => {
    const response = await getTasks(queryFilter);
    return response;
  },
);
export const getTaskStatsAsync = createAsyncThunk(
  'tasks/stats',
  async (): Promise<ITaskStatsResponse> => getTaskStats({}),
);
export const createTaskAsync = createAsyncThunk(
  'tasks/createTask',
  async (task: ISaveTask): Promise<ITask> => {
    const response = await createTask(task);
    return response;
  },
);
export const editTaskAsync = createAsyncThunk(
  'tasks/editTask',
  async (task: IEditTask): Promise<ITask> => {
    const response = await editTask(task.id, task.data);
    return response;
  },
);
export const archiveTaskAsync = createAsyncThunk(
  'tasks/archiveTask',
  async (task: ITask): Promise<ITask> => {
    const response = await archiveTask(task.id);
    return response;
  },
);
export const completeTaskAsync = createAsyncThunk(
  'tasks/completeTask',
  async (task: IEditTaskStatus): Promise<ITask> => {
    const response = await editTaskStatus(task.id, task.statusId);
    return response;
  },
);
export const respondToDeleteRequestAsync = createAsyncThunk(
  'tasks/respondToDeleteRequest',
  async (deleteRequestResponse: IDeleteRequestResponse): Promise<IDeleteRequest> => {
    const response = await respondToDeleteRequest(
      deleteRequestResponse.id,
      deleteRequestResponse.accept,
    );
    return response;
  },
);
export const assignTaskAsync = createAsyncThunk(
  'tasks/assignTask',
  async (task: IAssignTask): Promise<ITask> => {
    const response = await assignTask(task.id, task.userId);
    return response;
  },
);
export const updateLastVisit = createAsyncThunk(
  'tasks/updateLastVisit',
  async (id: number): Promise<ITicketVisit> => {
    const response = await updateTicketLastVisited(id);
    return response;
  },
);

const handleEditedTask = (state: TasksState, editedTask: ITask) => {
  if (editedTask) {
    const index = state.tickets.findIndex((task) => task.id === editedTask.id);
    if (index !== -1) {
      state.tickets[index] = editedTask;
    }
    state.processMessage = '';
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    resetTasks: (state) => {
      state.tickets = [];
      state.selectedTask = null;
      state.taskOverviewModalOpen = false;
    },
    selectTask: (state, action: PayloadAction<ITask>) => {
      state.selectedTask = action.payload;
      if (action.payload != null) state.taskOverviewModalOpen = true;
      else state.taskOverviewModalOpen = false;
    },
    toggleOverviewModal: (state, action: PayloadAction<boolean>) => {
      state.taskOverviewModalOpen = action.payload;
    },
    updateTask: (state, action:PayloadAction<ITask>) => {
      handleEditedTask(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasksAsync.pending, (state) => {
        state.taskProcesses.fetchingTasks = true;
        state.processMessage = 'Fetching tasks...';
      })
      .addCase(getTasksAsync.fulfilled, (state, action) => {
        state.tickets = action.payload.tickets;
        state.count = action.payload.count;
        state.taskProcesses.fetchingTasks = false;
        state.processMessage = '';
      })
      .addCase(getTasksAsync.rejected, (state) => {
        state.taskProcesses.fetchingTasks = false;
        state.processMessage = '';
        state.count = 0;
      })
      .addCase(getTaskStatsAsync.pending, (state) => {
        state.taskProcesses.fetchingTasks = true;
        state.processMessage = 'Fetching tasks...';
      })
      .addCase(getTaskStatsAsync.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.taskProcesses.fetchingTasks = false;
        state.processMessage = '';
      })
      .addCase(getTaskStatsAsync.rejected, (state) => {
        state.taskProcesses.fetchingTasks = false;
        state.processMessage = '';
      })
      .addCase(createTaskAsync.pending, (state) => {
        state.taskProcesses.savingTask = true;
        state.processMessage = 'Saving task...';
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        const createdTask = action.payload;
        if (createdTask)state.tickets.push(createdTask);
        state.taskProcesses.savingTask = false;
        state.processMessage = '';
      })
      .addCase(createTaskAsync.rejected, (state) => {
        state.taskProcesses.savingTask = false;
        state.processMessage = '';
      })
      .addCase(editTaskAsync.pending, (state) => {
        state.taskProcesses.savingTask = true;
        state.processMessage = 'Saving task...';
      })
      .addCase(editTaskAsync.fulfilled, (state, action) => {
        const editedTask = action.payload;
        handleEditedTask(state, editedTask);
        state.taskProcesses.savingTask = false;
      })
      .addCase(editTaskAsync.rejected, (state) => {
        state.taskProcesses.savingTask = false;
        state.processMessage = '';
      })
      .addCase(archiveTaskAsync.pending, (state) => {
        state.taskProcesses.archivingTask = true;
        state.processMessage = 'Archiving task...';
      })
      .addCase(archiveTaskAsync.fulfilled, (state, action) => {
        state.tickets = state.tickets.filter((task) => task.id !== action.payload.id);
        const previousStatus = action.meta.arg.statusId;
        switch (previousStatus) {
          case (PENDING_STATUS_ID): {
            state.stats.pendingTasks -= 1;
            break;
          }
          case (ACTIVE_STATUS_ID): {
            state.stats.openTasks -= 1;
            break;
          }
          case (COMPLETED_STATUS_ID): {
            state.stats.closedTasks -= 1;
            break;
          }
          default:
        }
        state.taskProcesses.archivingTask = false;
        state.processMessage = '';
      })
      .addCase(archiveTaskAsync.rejected, (state) => {
        state.taskProcesses.archivingTask = false;
        state.processMessage = '';
      })
      .addCase(completeTaskAsync.pending, (state) => {
        state.taskProcesses.completingTask = true;
        state.processMessage = 'Completing task...';
      })
      .addCase(completeTaskAsync.fulfilled, (state, action) => {
        const editedTask = action.payload;
        handleEditedTask(state, editedTask);
        state.taskProcesses.completingTask = false;
      })
      .addCase(completeTaskAsync.rejected, (state) => {
        state.taskProcesses.completingTask = false;
        state.processMessage = '';
      })
      .addCase(respondToDeleteRequestAsync.pending, (state) => {
        state.taskProcesses.fetchingAction = true;
        state.processMessage = 'Saving task...';
      })
      .addCase(respondToDeleteRequestAsync.fulfilled, (state, action) => {
        if (action.payload.approved) {
          const taskId = action.payload.ticketId;
          const editedTask = state.tickets.find((task) => task.id === taskId);
          if (editedTask) {
            editedTask.dateArchived = new Date().toJSON();
            handleEditedTask(state, editedTask);
            state.tickets = state.tickets.filter((task) => task.id !== action.payload.id);
          }
        } else {
          state.taskProcesses.fetchingAction = false;
          state.processMessage = '';
        }
      })
      .addCase(respondToDeleteRequestAsync.rejected, (state) => {
        state.taskProcesses.fetchingAction = false;
        state.processMessage = '';
      })
      .addCase(assignTaskAsync.pending, (state) => {
        state.taskProcesses.assigningTask = true;
        state.processMessage = 'Saving task...';
      })
      .addCase(assignTaskAsync.fulfilled, (state, action) => {
        if (action.payload) {
          const editedTask = action.payload;
          handleEditedTask(state, editedTask);
          state.taskProcesses.assigningTask = false;
        }
      })
      .addCase(assignTaskAsync.rejected, (state) => {
        state.taskProcesses.assigningTask = false;
        state.processMessage = '';
      })
      .addCase(updateLastVisit.fulfilled, (state, action) => {
        const affectedTaskId = action.payload.lastVisitTicketId;
        state.tickets = state.tickets
          .map((ticket) => {
            if (ticket.id === affectedTaskId) {
              ticket.ticketVisits[0] = action.payload;
            }
            return ticket;
          });
        state.taskProcesses.savingTask = false;
      });
  },
});

export const {
  resetTasks,
  selectTask,
  toggleOverviewModal,
  updateTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
