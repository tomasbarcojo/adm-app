import cluster from 'cluster';
import * as os from 'os';

import { Injectable } from '@nestjs/common';
import { Logger } from 'logging-chiper';

const numCPUs = os.cpus().length;

@Injectable()
export class ClusterService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static clusterize(callback: Function): void {
    const isDevEnvironment = process.env.NODE_ENV === 'development';

    if (cluster.isPrimary && isDevEnvironment) {
      Logger.getInstance().log({
        stt: 'undetermined',
        context: ClusterService.name,
        functionName: 'clusterize',
        message: `Master server is running on port ${process.env.PORT}`,
      });

      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        Logger.getInstance().log({
          stt: 'undetermined',
          context: ClusterService.name,
          functionName: 'clusterize',
          message: `worker (${worker.process.pid}) died.`,
        });
      });
    } else {
      callback();
    }

    Logger.getInstance().log({
      stt: 'undetermined',
      context: ClusterService.name,
      functionName: 'clusterize',
      message: `Number of workers: ${numCPUs}`,
    });
  }
}
