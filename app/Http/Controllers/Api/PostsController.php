<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Profile;
use App\Models\Post;
use App\Models\User;

class PostsController extends Controller
{
    public function index() {
        $posts = Post::orderBy('created_at', 'desc')->get();

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
        $commentData = Comment::where('post_id', $id)->orderBy('created_at', 'desc')->get();

        $comments = [];
        foreach ($commentData as $comment) {
            $user = Profile::where('user_id', $comment->user_id)->first();

            $data = array(
                'name' => $user->name,
                'post_id' => $id,
                'comment_id' => $comment->id,
                'description' => $comment->description,
            );

            array_push($comments, $data);
        }
        return response()->json([
            'success' => true,
            'msg' => 'Post Found',
            'post' => $post, 
            'comments'=> $comments,
        ]);
    }

    public function update(Request $request, $id){
        $post = Post::find($id);
        $post->title = $request->title;
        $post->description = $request->description;
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

    public function myPost($id)
    {
        //return $id;
        $posts = Post::where('user_id', $id)->orderBy('created_at', 'desc')->get();
        return response()->json([
            'success' => true,
            'msg' => 'Posts',
            'data' => $posts
        ]);
    }
}
