import { INestApplicationContext, Logger } from '@nestjs/common';

// import { TaskService } from '../../modules/taskModule/task.service';

// import { TaskType } from '../../modules/taskModule/task.entity';
// import { CreateTaskInput } from '../../modules/taskModule/dto/create-task-input.dto';

// const items: CreateTaskInput[] = [
//   {
//     description: 'Task 1',
//     type: TaskType.WORK,
//   },
//   {
//     description: 'Task 2',
//     type: TaskType.WORK,
//   },
//   {
//     description: 'Task 3',
//     type: TaskType.WORK,
//   },
// ];

export const SeedTasksFactory = {
  seed: async (application: INestApplicationContext) => {
    // Obtengo el servicio con el que voy a operar
    // const service = application.get(TaskService);
    // for (const item of items) {
    //   const existing = await service.getOneByOneFields({
    //     fields: { description: item.description, type: item.type },
    //   });
    //   if (!existing) {
    //     Logger.log({
    //       stt: 'undetermined',
    //       context: 'SeedTasksFactory',
    //       functionName: 'seed',
    //       message: 'creating...',
    //     });
    //     await service.create({
    //       ...item,
    //     });
    //     continue;
    //   }
    //   Logger.log({
    //     stt: 'undetermined',
    //     context: 'SeedTasksFactory',
    //     functionName: 'seed',
    //     message: 'updating...',
    //   });
    //   await service.update(
    //     {
    //       uid: existing.uid,
    //     },
    //     {
    //       ...item,
    //     },
    //   );
    // }
  },
};
