import { NextRequest, NextResponse } from 'next/server';

// In-memory job tracking (in production, use Redis or database)
const jobs = new Map();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const jobId = url.searchParams.get('jobId');

    if (jobId && jobs.has(jobId)) {
      return NextResponse.json({
        success: true,
        job: jobs.get(jobId)
      });
    }

    // Return overall system status
    const systemStatus = {
      activeJobs: jobs.size,
      totalJobs: jobs.size,
      systemHealth: 'healthy',
      lastUpdate: new Date().toISOString(),
      infrastructure: {
        compute: 'available',
        storage: 'available',
        gpus: '4x A100 ready'
      }
    };

    return NextResponse.json({
      success: true,
      status: systemStatus,
      recentJobs: Array.from(jobs.values()).slice(-5)
    });

  } catch (error) {
    console.error('Error getting RL status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get status' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobId, status, progress, logs, metrics } = body;

    if (jobs.has(jobId)) {
      const job = jobs.get(jobId);
      jobs.set(jobId, {
        ...job,
        status,
        progress,
        logs: [...job.logs, ...logs],
        metrics: { ...job.metrics, ...metrics },
        lastUpdate: new Date().toISOString()
      });
    } else {
      jobs.set(jobId, {
        id: jobId,
        status,
        progress,
        logs,
        metrics,
        createdAt: new Date().toISOString(),
        lastUpdate: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Job status updated'
    });

  } catch (error) {
    console.error('Error updating RL status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update status' },
      { status: 500 }
    );
  }
}
