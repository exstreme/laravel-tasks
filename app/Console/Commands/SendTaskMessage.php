<?php

namespace App\Console\Commands;

use App\Events\TaskCreated;
use App\Task;
use Illuminate\Console\Command;

class SendTaskMessage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'task:message {message}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send task message';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $task = Task::create([
            'description' => 'Test my task',
            'due_date' => '2019-12-27 16:21:55'
        ]);
        event(new TaskCreated($task));
    }
}
