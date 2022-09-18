import React, { useEffect } from "react";
import { fetchPosts, selectPost } from "./slice";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { TextField } from '@mui/material';

// import { useDispatch, useSelector } from "react-redux";

export const Post = () => {
    const { loading, post } = useAppSelector(selectPost)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchPosts())
    }, [])

    return (
        <div>
            {loading && <div>loading...</div>}
            {/* {posts &&
                <div>{posts.map((post) => (
                    <div key={post.id}>
                        <div>{post.id}</div>
                        <div>{post.userId}</div>
                        <div>{post.title}</div>
                        <div>{post.completed}</div>
                    </div>))}
                </div>} */}
            <div key={post.id}>
                <p>postid</p>
                <div role="postId">{post.id}</div>
                <TextField value={post.id} />

                <p>userid</p>
                <div role="userId">{post.userId}</div>
                <p>title</p>
                <div role="title">{post.title}</div>
                <p>complted</p>
                <div role="completed">{post.completed ? <div>true</div> : <div>false</div>}</div>
            </div>
        </div>
    )

};