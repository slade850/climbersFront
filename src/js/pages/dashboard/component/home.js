import React from 'react';
import { useSelector } from 'react-redux';
import { servURL } from '../../../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faHeart } from '@fortawesome/free-solid-svg-icons';

const DashboardHome = () => {

    const posts = useSelector(state => state.post.posts);

    return (
        <div className="centralContainer">
            <h1>Bienvenue sur votre page fastblock</h1>
            {
                posts && posts.length > 0 ?
                posts.map(post => { 
                    return (<div key={post.id.split('-')[0]} className="card">
                        <div className="postHeader">
                            <h2>{post.title}</h2>
                            <div className="litleRoundedAvatar">
                                {post.avatar && <img src={`${servURL}${post.avatar}`} />}
                            </div>
                            <h3>{post.pseudo}</h3>
                        </div>
                        <div className="postBody">
                            {
                                post.medias && post.medias.length > 0 ? (<div className="mediasContainer">{
                                post.medias.map((media) => {
                                return (<div key={media.id.split('-')[0]} className="mediaBlock">
                                {    
                                media.type == 'doc' ? <a href={`${servURL}${media.path}`} target="_blank">{media.path.split('/')[1]}</a>
                                        :
                                media.type == 'image' ? <img src={`${servURL}${media.path}`} /> :  <video width="200" height="200" src={`${servURL}${media.path}`} controls> Your browser does not support the video tag.</video> 
                                }
                                </div>)
                                })}
                                </div>) : <div className="mediasContainer"></div>
                            }
                            <div className="textBlock">
                                    {post.text}
                            </div>
                        </div>
                        <div className="commentThisPost">
                            {
                                post.comments && post.comments.length > 0 && post.comments.map(comment => {
                                return (<div key={comment.id.split('-')[0]} className="commentCard">
                                            <div className="commentHeader">
                                                <div className="litleRoundedAvatar">
                                                    <img src={`${servURL}${comment.avatar}`} />
                                                </div>
                                                <h4>{comment.pseudo}</h4>
                                            </div>
                                            <div className="commentBody">{comment.comment}</div>
                                        </div>)})
                            }
                        </div>
                        <div className="likeThisPost">
                            {
                                post.likes && post.likes.length > 0 && post.likes.map(like => {
                                return (<div key={`${like.pseudo}${post.id.split('-')[0]}`} className="likeCard">
                                            <div className="likeIco">
                                                { like.type == 'like' ? <FontAwesomeIcon icon={faThumbsUp} size="2x" color="orange"/> : <FontAwesomeIcon icon={faHeart} size="2x" color="orange"/>}
                                            </div>
                                        </div>)})
                            }
                        </div>
                    </div>)
                })
                :
                <h2 className="noPosts">Aucun Post n'a été publié</h2>
            }
        </div>
            )
}
export default DashboardHome;