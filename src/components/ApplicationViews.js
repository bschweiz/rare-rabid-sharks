import React from "react";
import { Route } from "react-router-dom";
import { PostProvider } from "./posts/PostProvider";
import { UserPostList } from "./posts/UserPostsList";
import { CommentProvider } from "./comments/CommentProvider";
import { CommentList } from "./comments/CommentList";
import { AllPostList } from "./posts/AllPostList";
import { PostDetail } from "./posts/PostDetail";
import {
    CategoryContext,
    CategoryProvider,
} from "./categories/CategoryProvider";
import { CategoryList } from "./categories/CategoryList";
import { CategoryForm } from "./categories/CategoryForm";
import { PostForm } from "./posts/PostForm";
import { TagProvider } from "./tags/TagProvider"
import { TagForm } from "./tags/TagForm";
import { TagList } from "./tags/TagList"
import { CommentForm } from "./comments/CommentForm";

export const ApplicationViews = () => {
    return (
        <>
            <main
                style={{
                    margin: "5rem 2rem",
                    lineHeight: "1.75rem",
                }}
            >
                <TagProvider>
                    <PostProvider>
                        <CategoryProvider>
                            <CommentProvider>
                                <Route
                                    path="/posts/edit/:postId(\d+)"
                                    render={(props) => <PostForm {...props} />}
                                />
                                <Route
                                    path="/posts/create"
                                    render={(props) => <PostForm {...props} />}
                                />
                                <Route
                                    exact
                                    path="/allposts"
                                    render={(props) => <AllPostList {...props} />}
                                />
                                <Route
                                    exact
                                    path="/posts"
                                    render={(props) => <UserPostList {...props} />}
                                />
                                <Route
                                    path="/posts/:postId(\d+)"
                                    render={(props) => <PostDetail {...props} />}
                                />
                                <Route
                                    path="/posts/addcomment"
                                    render={(props) => <CommentForm {...props} />}
                                />
                                <Route
                                    path="/comments/edit/:commentId(\d+)"
                                    render={(props) => <CommentForm {...props} />}
                                />

                                <Route
                                    exact
                                    path="/categories"
                                    render={(props) => <CategoryList {...props} />}
                                />

                                <Route
                                    exact
                                    path="/categories/create"
                                    render={(props) => <CategoryForm {...props} />}
                                />
                                <Route
                                    path="/categories/edit/:categoryId(\d+)"
                                    render={(props) => <CategoryForm {...props} />}
                                />
                                <Route
                                    exact
                                    path="/tags"
                                    render={(props) => <TagList {...props} />}
                                />
                                <Route
                                    exact
                                    path="/tags/create"
                                    render={(props) => <TagForm {...props} />}
                                />
                                <Route
                                    exact
                                    path="/tags/edit/:id(\d+)"
                                    render={(props) => <TagForm {...props} />}
                                />
                            </CommentProvider>
                        </CategoryProvider>
                    </PostProvider>
                </TagProvider>
            </main>
        </>
    );
};
