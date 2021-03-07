<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'email' => 'required',
            'password' => 'required',
        ], [
            'email.required' => 'Please give your username/email address',
            'password.required' => 'Please give your password',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $user = User::where('email', $request->email)->first();
        if (is_null($user)) {
            $user = User::where('username', $request->email)->first();
        }

        if (!is_null($user) && Hash::check($request->password, $user->password)) {
            
            $accessToken = $user->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'Logged in successully !!',
                'user' => $user,
                'access_token' => $accessToken,
            ]);
        }else {
            return response()->json([
                'success' => false,
                'message' => 'Sorry Invalid Username/Email or Password',
                'errors' => null,
            ]);
        }
    }

    public function register(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'username' => 'required|min:3|max:30|unique:users',
            'name' => 'required|min:3|max:30',
            'email' => 'required|email|max:100|unique:users',
            'password' => 'required|confirmed',
            'website' => 'required',
        ], [
            'username.unique' => 'Your username is already used, Please choose another',
            'name.required' => 'Please give your name',
            'email.required' => 'Please give your email address',
            'email.unique' => 'Your email address is already used, Please Login or use another',
            'password.required' => 'Please give your password',
            'website.required' => 'Website is required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
        $user = User::create([
            'username' => $request['username'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

        $profile = new Profile();
        $profile->name = $request->name;
        $profile->website = $request->website;
        $profile->user_id = $user->id;
        $profile->save();

        $accessToken = $user->createToken('authToken')->accessToken;
        return response()->json([
            'success' => true,
            'message' => 'Registered successully !!',
            'user' => $user,
            'access_token' => $accessToken,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
    }
}
