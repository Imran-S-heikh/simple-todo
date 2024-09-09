import { Schedule } from "./schedule";
import { Task } from "./types";

const scheduler = new Schedule();

interface NotificationInfo {
  id: string;
  title: string;
  message: string;
  time: Date;
}

function generateInfo(task: Task) {
  const info: [null | NotificationInfo, null | NotificationInfo] = [null, null];

  if (!task.endTime || task.completed) {
    return info;
  }
  // Check if the current time is between 50% and 75% of the time remaining
  const totalTime = task.endTime - task.createdAt; 
  const timeRemaining = task.endTime - Date.now(); 
  const timeElapsed = totalTime - timeRemaining; 
  const parcent = (100 / totalTime) * timeElapsed; 
  const halfwayTime = totalTime / 2; 
  const timeToHalf = halfwayTime - timeElapsed; 
  const timeNintyFive = (totalTime / 100) * 95; 
  const timeToNintyFive = timeNintyFive - timeElapsed; 

  if (parcent < 75) {
    info[0] = {
      id: `half-${task.id}`,
      title: "Task Reminder",
      message: `You are more than halfway through your ${task.name} task, hurry up!`,
      time: new Date(Date.now() + Math.max(0, timeToHalf)),
    };
  }

  if (parcent < 98) {
    info[1] = {
      id: `end-${task.id}`,
      title: "Task is Almost Over",
      message: `Your task ${task.name}, is about to end`,
      time: new Date(Date.now() + Math.max(0, timeToNintyFive)),
    };
  }

  return info;
}

export function createNotification(task: Task) {
  if (!task.endTime || task.completed) {
    return;
  }

  const diff = task.endTime - Date.now();
  if (diff <= 0) {
    return;
  }

  const notices = generateInfo(task);

  for (const notice of notices) {
    if (notice && !scheduler.exists(notice.id)) {
      scheduler.addJob(notice.id, notice.time, () => {
        new Notification(notice.title, {
          body: notice.message,
          icon: "/icons/android/android-launchericon-192-192.png",
        });
      });
    }
  }
}
