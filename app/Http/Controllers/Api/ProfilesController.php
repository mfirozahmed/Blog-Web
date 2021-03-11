<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Profile;
use App\Models\User;

class ProfilesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $id = $request->user()->id;
        $profile = Profile::where('user_id', $id)->get();

        return response()->json([
            'success' => true,
            'msg' => "User's profile",
            'data' => $profile
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    /* public function store(Request $request)
    {
        $profile = new Profile();
        $profile->name = $request->name;
        $profile->website = $request->website;
        $profile->save();

        return response()->json([            
            'success' => true,
            'msg' => 'Profile Added',
            'data' => $profile,
        ]);
    } */

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        $profile = Profile::where('user_id', $id)->first();
        $data = array (
            'username' => $user->username,
            'email' => $user->email,
            'name' => $profile->name,
            'website' => $profile->website
        );

        return response()->json([
            'success' => true,
            'msg' => 'The specified profile',
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $profile = Profile::where('user_id', $id)->first();
        $profile->name = $request->name;
        $profile->website = $request->website;
        $profile->save();

        return response()->json([
            'success' => true,
            'msg' => 'Profile Updated',
            'data' => $profile
        ]);
    }

    public function getAllProfile()
    {
        $profiles = Profile::all();

        return response()->json([
            'success' => true,
            'msg' => 'All the profile',
            'data' => $profiles
        ]);
    }
}
