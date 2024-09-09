enum JobStatus {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

class Job {
  id: string;
  timerId: NodeJS.Timeout | undefined;
  status: JobStatus = JobStatus.ACTIVE;

  constructor(
    { id, future }: { id: string; future: Date },
    callback: () => void
  ) {
    this.id = id;

    const diff = future.getTime() - Date.now();
    // if (diff <= 0) {
    //   this.status = JobStatus.CANCELLED;
    //   return;
    // }

    this.timerId = setTimeout(() => {
      try {
        callback();
        this.status = JobStatus.COMPLETED;
      } catch (e) {
        this.status = JobStatus.CANCELLED;
      }
    }, Math.max(0, diff));
  }
}

export class Schedule {
  jobs: Record<string, Job> = {};
  constructor() {}

  addJob(id: string, time: Date, callback: () => void) {
    const job = this.getJob(id);
    if (job) {
      this.removeJob(id);
    }

    this.jobs[id] = new Job({ id, future: time }, callback);
  }

  getJob(id: string) {
    return this.jobs[id] as Job | undefined;
  }

  removeJob(id: string) {
    const job = this.getJob(id);

    if (!job) {
      return;
    }

    if (job?.status === JobStatus.ACTIVE) {
      clearTimeout(this.jobs[id].timerId);
    }
    delete this.jobs[id];
  }

  exists(id: string) {
    return !!this.jobs[id];
  }
}
