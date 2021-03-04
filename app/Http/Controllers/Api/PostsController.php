<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostsController extends Controller
{
    public function index() {
        $posts = Post::all();

        return response()->json([
            'success' => true,
            'msg' => 'Posts',
            'data' => $posts
        ]);
    }

    public function store(Request $request){
        $post = new Post();
        $post->title = $request->title;
        $post->description = $request->description;
        $post->user_id = $request->user_id;
        $post->save();

        return response()->json([
            'success' => true,
            'msg' => 'Post Added',
            'data' => $post
        ]);

    }

    public function show($id){
        $post = Post::find($id);

        return response()->json([
            'success' => true,
            'msg' => 'Post Found',
            'data' => $post
        ]);
    }

    public function update($id, Request $request){
        $post = Post::find($id);
        $post->title = $request->title;
        $post->description = $request->description;
        $post->user_id = $request->user_id;
        $post->save();

        return response()->json([
            'success' => true,
            'msg' => 'Post Updated',
            'data' => $post
        ]);
    }

    public function destroy($id){
        $post = Post::find($id);
        $post->delete();
        
        return response()->json([
            'success' => true,
            'msg' => 'Post Deleted'
        ]);
    }
}
