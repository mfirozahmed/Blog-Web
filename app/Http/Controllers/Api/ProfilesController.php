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
    public function index()
    {
        $profiles = Profile::orderBy('name', 'asc')->get();
        $customizedProfile = [];
        foreach ($profiles as $profile) {
            $user = User::find($profile->user_id);
            $data = array(
                'user_id' => $user->id,
                'name' => $profile->name,
                'username' => $user->username,
                'email' => $user->email,
                'website' => $profile->website
            );
            array_push($customizedProfile, $data);
        }
        return response()->json([
            'success' => true,
            'msg' => 'All the profile',
            'data' => $customizedProfile
        ]);
    }

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

    public function allProfilePage(Request $request) {

        $column = $request->column;
        $order = $request->order;
        $customizedProfile = [];

        if ($column == 'name' || $column == 'website'){
            $profiles = Profile::orderBy($column, $order)->get();
            foreach ($profiles as $profile) {
                $user = User::find($profile->user_id);
                $data = array(
                    'user_id' => $user->id,
                    'name' => $profile->name,
                    'username' => $user->username,
                    'email' => $user->email,
                    'website' => $profile->website
                );
                array_push($customizedProfile, $data);
            }
        } else {
            $users = User::orderBy($column, $order)->get();
            foreach ($users as $user) {
                $profile = Profile::where('user_id',$user->id)->first();
                $data = array(
                    'user_id' => $user->id,
                    'name' => $profile->name,
                    'username' => $user->username,
                    'email' => $user->email,
                    'website' => $profile->website
                );
                array_push($customizedProfile, $data);
            }
        }
        return response()->json([
            'success' => true,
            'msg' => 'All the profile',
            'data' => $customizedProfile
        ]);
    }
}
