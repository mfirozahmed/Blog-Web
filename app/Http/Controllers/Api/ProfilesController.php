<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Profile;

class ProfilesController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
    
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
        $profile = Profile::find($id);

        return response()->json([
            'success' => true,
            'msg' => 'The specified profile',
            'data' => $profile
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
        $profile = Profile::find($id);
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
