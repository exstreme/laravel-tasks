<?php

namespace App\Http\Controllers;

use App\Jobs\SendTaskNotification;
use Illuminate\Http\Request;
use App\Task;
use Illuminate\Validation\ValidationException;

class TaskController extends Controller
{
    public function index()
    {
        return Task::all();
    }

    public function create(Request $request)
    {
        try {
            $this->validate($request, [
                'description' => 'required|max:4000',
                'due_date' => 'required|date_format:Y-m-d\TH:i'
            ]);
        } catch (ValidationException $e) {
            return response()->json('error',404);
        }

        $task = Task::create($request->all());
        $job = (new SendTaskNotification($task))
            ->delay($task->due_date);

        dispatch($job);
        return response()->json($task, 201);
    }

    public function show(Task $task)
    {
        return $task;
    }
}
