import * as cron from 'node-cron';
import { dayPassService } from './dayPassService';
import { LoggingService } from './loggingService';

const loggingService = new LoggingService();

class CronService {
  private tasks: Map<string, cron.ScheduledTask> = new Map();

  /**
   * Initialize all cron jobs
   */
  initialize() {
    console.log('🕐 Initializing cron jobs...');
    
    // Schedule day pass expiration at midnight every day
    this.scheduleDayPassExpiration();
    
    console.log('✅ Cron jobs initialized successfully');
  }

  /**
   * Schedule day pass expiration at midnight
   */
  private scheduleDayPassExpiration() {
    // Run at 00:00:00 every day
    const task = cron.schedule('0 0 * * *', async () => {
      console.log('🕛 Running daily day pass expiration...');
      
      try {
        const result = await dayPassService.expireAllDayPasses();
        
        await loggingService.log('CRON_DAY_PASS_EXPIRATION', {
          expiredCount: result.expiredCount,
          timestamp: new Date().toISOString()
        });
        
        console.log(`✅ Day pass expiration completed. ${result.expiredCount} passes expired.`);
        
      } catch (error) {
        console.error('❌ Error during day pass expiration:', error);
        
        await loggingService.log('CRON_DAY_PASS_EXPIRATION_ERROR', {
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        });
      }
    }, {
      timezone: 'Africa/Tunis'
    });

    this.tasks.set('dayPassExpiration', task);
    task.start();
    
    console.log('📅 Day pass expiration scheduled for midnight (Africa/Tunis timezone)');
  }

  /**
   * Manually trigger day pass expiration (for testing)
   */
  async triggerDayPassExpiration() {
    console.log('🔄 Manually triggering day pass expiration...');
    
    try {
      const result = await dayPassService.expireAllDayPasses();
      
      await loggingService.log('MANUAL_DAY_PASS_EXPIRATION', {
        expiredCount: result.expiredCount,
        timestamp: new Date().toISOString()
      });
      
      console.log(`✅ Manual day pass expiration completed. ${result.expiredCount} passes expired.`);
      
      return result;
      
    } catch (error) {
      console.error('❌ Error during manual day pass expiration:', error);
      
      await loggingService.log('MANUAL_DAY_PASS_EXPIRATION_ERROR', {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      
      throw error;
    }
  }

  /**
   * Get status of all cron jobs
   */
  getStatus() {
    const status: { [key: string]: { running: boolean; nextRun?: Date | undefined } } = {};
    
    for (const [name, task] of this.tasks) {
      status[name] = {
        running: task.getStatus() === 'scheduled'
      };
    }
    
    return status;
  }

  /**
   * Stop all cron jobs
   */
  stop() {
    console.log('🛑 Stopping all cron jobs...');
    
    for (const [name, task] of this.tasks) {
      task.stop();
      console.log(`✅ Stopped cron job: ${name}`);
    }
    
    this.tasks.clear();
  }

  /**
   * Restart all cron jobs
   */
  restart() {
    console.log('🔄 Restarting all cron jobs...');
    
    this.stop();
    this.initialize();
  }
}

export const cronService = new CronService();