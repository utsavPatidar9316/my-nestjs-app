import { Injectable } from '@nestjs/common';

@Injectable()
export class CleanupTask {
  run() {
    console.log('Running database cleanup task');
    // Perform your cleanup logic here
  }
}
