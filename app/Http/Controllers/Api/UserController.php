<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function search(Request $request) {

        $users = User::where('name', 'LIKE', "%$request->name%")->get();

        return response()->json($users);
    }
}
